import JoiBase from "joi";
import JoiDate from "@joi/date";

const joi = JoiBase.extend(JoiDate);

const passwordRegex = /^\d{4}$/;
const numberRegex = /^\d{4} \d{4} \d{4} \d{4}$/;

const blockAndUnblockCardSchema = joi.object({
	number: joi.string().pattern(numberRegex).required(),
	cardholderName: joi.string().required(),
	expirationDate: joi.date().format("MM/YY").required(),
	password: joi.string().length(4).pattern(passwordRegex).required(),
});

export default blockAndUnblockCardSchema;