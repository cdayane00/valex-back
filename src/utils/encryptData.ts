import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);

export const encryptData = (data: string) => {
	return cryptr.encrypt(data);
};

export const decryptData = (data: string) => {
	return cryptr.decrypt(data);
}