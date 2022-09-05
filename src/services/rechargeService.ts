import * as validationService from "../services/validationService.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

import AppError from "../config/error.js";

import { RechargeInsertData } from "../types/rechargeTypes";

export const validateCardRecharge = async (
	number: string,
	cardholderName: string,
	expirationDate: string,
	apiKey: string
) => {
	const { id } = await validationService.validateAPIKeyCompany(apiKey);
	const {
		id: cardId,
		expirationDate: expirationCardDate,
		password,
		employeeId,
	} = await validationService.validateCardIsRegistered(
		number,
		cardholderName,
		expirationDate
	);
	const { companyId } = await validationService.validateEmployee(employeeId);
	if (companyId !== id) {
		throw new AppError(
			"Recharge unauthorized",
			403,
			"Employee does not belong to this company",
			"Ensure to provide the correct card ID"
		);
	}
	await validationService.validateCardExpirationDate(expirationCardDate);
	if (!password) {
		throw new AppError(
			"Card not activated",
			409,
			"This card is not activated",
			"Ensure to provide a valid card ID"
		);
	}
	return { cardId };
};

export const rechargeCardDataPersistence = async (
	cardId: number,
	amount: number
) => {
	const rechargeData: RechargeInsertData = {
		cardId,
		amount,
	};
	await rechargeRepository.insert(rechargeData);
};