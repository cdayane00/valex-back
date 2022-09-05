import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import router from "./routers/index.js";
import errorHandler from "./middlewares/errorHandlerMiddleware.js";

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler);

const port = +process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});