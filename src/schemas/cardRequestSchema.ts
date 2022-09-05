import joi from "joi";

const cardRequestSchema = joi.object({
	employeeId: joi.number().positive().integer().strict().required(),
	cardType: joi
		.string()
		.valid("groceries", "restaurants", "transport", "education", "health")
		.required(),
});

export default cardRequestSchema;