import { Request, Response } from "express";

import * as paymentService from "../services/paymentService.js";

import AppError from "../config/error.js";

export const paymentAtPointOfSale = async (req: Request, res: Response) => {
	const businessId = Number(req.params.businessId);
	if (!businessId) {
		throw new AppError(
			"Invalid request. Please provide a valid businessId.",
			400,
			"Invalid request. Please provide a valid businessId",
			"Ensure that the businessId is provided in the URL."
		);
	}
	const { number, cardholderName, expirationDate, password, amount } =
		res.locals.body;
	const { cardId } = await paymentService.validatePayment(
		number,
		cardholderName,
		expirationDate,
		password,
		businessId,
		amount
	);
	await paymentService.paymentAtPointOfSalePersistence(
		cardId,
		businessId,
		amount
	);
	res.sendStatus(200);
};