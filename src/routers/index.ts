import { Router } from "express";
import cardRouter from "./cardRouter.js";


const router = Router();

router.use("/card", cardRouter);

export default router;