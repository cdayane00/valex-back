import { faker } from "@faker-js/faker";

import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentsRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

import * as validationService from "../services/validationService.js";

import { TransactionTypes } from "../types/transactionTypes.js";
import { CardInsertData, CardUpdateData } from "../types/cardTypes.js";

import { getCardExperationDate } from "../utils/cardDateFormatter.js";
import { encryptData, decryptData } from "../utils/encryptData.js";

import AppError from "../config/error.js";

export const createCard = async (
	employeeId: number,
	type: TransactionTypes,
	apiKey: string
) => {
	const { id } = await validationService.validateAPIKeyCompany(apiKey);
	const { companyId, fullName } = await validationService.validateEmployee(
		employeeId
	);
	if (companyId !== id) {
		throw new AppError(
			"Employee unauthorized",
			403,
			"Employee does not belong to this company",
			"Ensure to provide the correct employee ID"
		);
	}
	await validationService.validateUniqueCardByTypeAndEmployee(
		type,
		employeeId
	);
	const cardData = generateCardData(employeeId, fullName, type);
	await cardRepository.insert(cardData);
	const { number, cardholderName, securityCode, expirationDate } = cardData;
	const decryptedSecurityCode = decryptData(securityCode);
	return {
		number,
		cardholderName,
		expirationDate,
		securityCode: decryptedSecurityCode,
	};
};

export const activateCard = async (
	number: string,
	cardholderName: string,
	expirationDate: string,
	securityCode: string,
	password: string
) => {
	const { cardId } = await validationService.validateCardForActivation(
		number,
		cardholderName,
		expirationDate,
		securityCode
	);
	const cardDataUpdate: CardUpdateData = {
		isBlocked: false,
		password: encryptData(password),
	};
	await cardRepository.update(cardId, cardDataUpdate);
};

export const blockCard = async (
	number: string,
	cardholderName: string,
	expirationDate: string,
	password: string
) => {
	const { cardId } = await validationService.validateCardForBlockOrUnblock(
		number,
		cardholderName,
		expirationDate,
		password,
		"blocking"
	);
	const cardDataUpdate: CardUpdateData = {
		isBlocked: true,
	};
	await cardRepository.update(cardId, cardDataUpdate);
};

export const unblockCard = async (
	number: string,
	cardholderName: string,
	expirationDate: string,
	password: string
) => {
	const { cardId } = await validationService.validateCardForBlockOrUnblock(
		number,
		cardholderName,
		expirationDate,
		password,
		"unblocking"
	);
	const cardDataUpdate: CardUpdateData = {
		isBlocked: false,
	};
	await cardRepository.update(cardId, cardDataUpdate);
};

export const getStatementCard = async (
	number: string,
	cardholderName: string,
	expirationDate: string
) => {
	const { id } = await validationService.validateCardIsRegistered(
		number,
		cardholderName,
		expirationDate
	);
	const transactions = await paymentsRepository.findByCardId(id);
	const recharges = await rechargeRepository.findByCardId(id);
	const { balance } = await cardRepository.getStatementBalanceByCardId(id);
	return { balance, transactions, recharges };
};

const createCardNumber = () => {
	return faker.finance.creditCardNumber("#### #### #### ####");
};

const createCardSecurityCode = () => {
	return faker.finance.creditCardCVV();
};

const createCardExpirationDate = () => {
	const EXPIRATION_CARD_DATE_YEARS = 5;
	return getCardExperationDate(new Date(), EXPIRATION_CARD_DATE_YEARS);
};

const employeeNameFormatter = (fullName: string) => {
	const regex = /^(d[a,e,o,i])$/;
	const names = fullName.split(" ");
	let formattedName = "";

	if (names.length === 1) {
		formattedName = names[0];
	} else if (names.length === 2) {
		formattedName = `${names[0]} ${names[1]}`;
	} else {
		const half = Math.floor(names.length / 2);
		const firstName = names[0];
		const lastName = names[names.length - 1];
		const middleName = regex.test(names[half])
			? names[half + 1] === lastName
				? names[half - 1]
				: names[half + 1]
			: names[half];

		formattedName = `${firstName} ${middleName[0]} ${lastName}`;
	}

	return formattedName.toUpperCase();
};

const generateCardData = (
	employeeId: number,
	fullName: string,
	type: TransactionTypes
): CardInsertData => {
	const cardNumber = createCardNumber();
	const cardholderName = employeeNameFormatter(fullName);
	const expirationDate = createCardExpirationDate();
	const encryptedSecurityCode = encryptData(createCardSecurityCode());
	return {
		number: cardNumber,
		employeeId,
		cardholderName,
		securityCode: encryptedSecurityCode,
		expirationDate,
		isVirtual: false,
		isBlocked: true,
		type,
	};
};