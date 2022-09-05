import { Card } from "../interfaces/cardInterface"

export type CardInsertData = Omit<Card, "id">;
export type CardUpdateData = Partial<Card>;