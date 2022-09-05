import JoiBase from "joi";
import JoiDate from "@joi/date";

const joi = JoiBase.extend(JoiDate);

const numberRegex = /^\d{4} \d{4} \d{4} \d{4}$/;

const statementCardSchema = joi.object({
	number: joi.string().pattern(numberRegex).required(),
	cardholderName: joi.string().required(),
	expirationDate: joi.date().format("MM/YY").required(),
});

export default statementCardSchema;