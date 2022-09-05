import * as validationService from "./validationService.js";
import * as businessRepository from "../repositories/businessRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";

import AppError from "../config/error.js";

import { decryptData } from "../utils/encryptData.js";

// import { PaymentInsertData } from "../types/paymentTypes.js";

export const validatePayment = async (
	number: string,
	cardholderName: string,
	expirationDate: string,
	password: string,
	businessId: number,
	amount: number
) => {
	const {
		id: cardId,
		expirationDate: expirationCardDate,
		password: encryptedCardPassword,
		isBlocked,
		type: cardType,
	} = await validationService.validateCardIsRegistered(
		number,
		cardholderName,
		expirationDate
	);
	await validationService.validateCardExpirationDate(expirationCardDate);
	if (!encryptedCardPassword || isBlocked) {
		throw new AppError(
			"Card not activated or blocked",
			409,
			"This card is not activated or is blocked",
			"Ensure to provide a valid card details"
		);
	}
	await validateCardPassword(encryptedCardPassword, password);
	await validateBusinessById(businessId);
	await validateBusinessTypeIsEqualCardType(businessId, cardType);
	await validateBalanceCardForAmountPayment(amount, cardId);

	return { cardId };
};

export const paymentAtPointOfSalePersistence = async (
	cardId: number,
	businessId: number,
	amount: number
) => {
	const paymentData = {
		cardId,
		businessId,
		amount,
	};
	await paymentRepository.insert(paymentData);
};

const validateCardPassword = async (
	encryptedCardPassword: string,
	passowrd: string
) => {
	const descryptedCardPassword = decryptData(encryptedCardPassword);
	if (descryptedCardPassword !== passowrd) {
		throw new AppError(
			"Invalid card password",
			409,
			"Invalid card password",
			"Ensure to provide the correct card password"
		);
	}
};

const validateBusinessById = async (businessId: number) => {
	const business = businessRepository.findById(businessId);
	if (!business) {
		throw new AppError(
			"Business not found",
			404,
			"Business not found",
			"Ensure to provide a valid business ID"
		);
	}
};

const validateBusinessTypeIsEqualCardType = async (
	businessId: number,
	cardType: string
) => {
	const { type: businessType } = await businessRepository.findById(
		businessId
	);
	if (businessType !== cardType) {
		throw new AppError(
			"Invalid card type for this type business. The card type must be the same as the business type",
			409,
			"Invalid card type for this type business. The card type must be the same as the business type",
			"Ensure to provide the correct card type for this business"
		);
	}
};

const validateBalanceCardForAmountPayment = async (
	amount: number,
	cardId: number
) => {
	const { balance } = await cardRepository.getStatementBalanceByCardId(
		cardId
	);
	if (balance < amount) {
		throw new AppError(
			"Insufficient balance",
			409,
			"Insufficient balance",
			"Ensure to provide a valid amount"
		);
	}
};