import { TransactionTypes } from "../types/transactionTypes.js";

export interface Business {
	id: number;
	name: string;
	type: TransactionTypes;
}