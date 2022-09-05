import JoiBase from "joi";
import JoiDate from "@joi/date";

const joi = JoiBase.extend(JoiDate);

const numberRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
const passwordRegex = /^\d{4}$/;

const paymentSchema = joi.object({
	number: joi.string().pattern(numberRegex).required(),
	cardholderName: joi.string().required(),
	expirationDate: joi.date().format("MM/YY").required(),
	password: joi.string().length(4).pattern(passwordRegex).required(),
	amount: joi.number().positive().greater(0).required(),
});

export default paymentSchema;