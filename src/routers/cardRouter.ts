import { Router } from "express";
import * as cardController from "../controllers/cardController.js";
import headerMiddleware from "../middlewares/headerMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import cardRequestSchema from "../schemas/cardRequestSchema.js";
import activationCardSchema from "../schemas/activationCardSchema.js";
import blockAndUnblockCardSchema from "../schemas/blockAndUnblockCardSchema.js";
import statementCardSchema from "../schemas/statementCardSchema.js";

const cardRouter = Router();

const endpoint = "/card";
const header = "x-api-key";

cardRouter.post(
	"/create",
	headerMiddleware(header, endpoint),
	validateSchemaMiddleware(cardRequestSchema, `${endpoint}/create`),
	cardController.createCard
);

cardRouter.put(
	"/activate",
	validateSchemaMiddleware(activationCardSchema, `${endpoint}/activate`),
	cardController.activateCard
);

cardRouter.put(
	"/block",
	validateSchemaMiddleware(blockAndUnblockCardSchema, `${endpoint}/block`),
	cardController.blockCard
);

cardRouter.put(
	"/unblock",
	validateSchemaMiddleware(blockAndUnblockCardSchema, `${endpoint}/unblock`),
	cardController.unblockCard
);

cardRouter.get(
	"/statement",
	validateSchemaMiddleware(statementCardSchema, `${endpoint}/statement`),
	cardController.getStatementCard
);

export default cardRouter;