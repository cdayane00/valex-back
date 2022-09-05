import { Router } from "express";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import paymentSchema from "../schemas/paymentSchema.js";
import * as paymentController from "../controllers/paymentController.js";

const paymentRouter = Router();
const endpoint = "/card";

paymentRouter.post(
	"/payment/:businessId",
	validateSchema(paymentSchema, `${endpoint}/payment/:businessId`),
	paymentController.paymentAtPointOfSale
);

export default paymentRouter;