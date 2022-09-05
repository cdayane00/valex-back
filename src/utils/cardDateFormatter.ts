import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(customParseFormat);

export const getFormattedDate = (date: Date | string) => {
	return dayjs(date).format("MM/YY");
};

export const getCardExperationDate = (date: Date, year: number) => {
	return dayjs(date).add(year, "year").format("MM/YY");
};

export const compareDates = (
	date: Date | string,
	dateToCompare: Date | string
) => {
	return (
		(dayjs(new Date(date)).isBefore(dayjs(dateToCompare, "MM/YY")) &&
			"before") ||
		(dayjs(new Date(date)).isAfter(dayjs(dateToCompare, "MM/YY")) &&
			"after")
	);
};