import { Request, Response } from "express";

import * as rechargeService from "../services/rechargeService.js";

export const rechargeCard = async (req: Request, res: Response) => {
	const companyAPIKey = res.locals.header;
	const { number, cardholderName, expirationDate, amount } = res.locals.body;
	const { cardId } = await rechargeService.validateCardRecharge(
		number,
		cardholderName,
		expirationDate,
		companyAPIKey
	);
	await rechargeService.rechargeCardDataPersistence(cardId, amount);
	res.sendStatus(200);
};