import JoiBase from "joi";
import JoiDate from "@joi/date";

const joi = JoiBase.extend(JoiDate);

const passwordRegex = /^\d{4}$/;
const numberRegex = /^\d{4} \d{4} \d{4} \d{4}$/;

const activationCardSchema = joi.object({
	number: joi.string().pattern(numberRegex).required(),
	cardholderName: joi.string().required(),
	expirationDate: joi.date().format("MM/YY").required(),
	securityCode: joi.string().length(3).required(),
	password: joi.string().length(4).pattern(passwordRegex).required(),
});

export default activationCardSchema;