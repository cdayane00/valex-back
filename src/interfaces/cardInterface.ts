import { TransactionTypes } from "../types/transactionTypes.js";

export interface Card {
	id: number;
	employeeId: number;
	number: string;
	cardholderName: string;
	securityCode: string;
	expirationDate: string;
	password?: string;
	isVirtual: boolean;
	originalCardId?: number;
	isBlocked: boolean;
	type: TransactionTypes;
}