import { Router } from "express";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import headerMiddleware from "../middlewares/headerMiddleware.js";
import rechargeCardSchema from "../schemas/rechargeCardSchema.js";
import * as rechargeController from "../controllers/rechargeController.js";

const rechargeRouter = Router();
const header = "x-api-key";
const endpoint = "/card";

rechargeRouter.post(
	"/recharge",
	headerMiddleware(header, `${endpoint}/recharge`),
	validateSchema(rechargeCardSchema, `${endpoint}/recharge`),
	rechargeController.rechargeCard
);

export default rechargeRouter;