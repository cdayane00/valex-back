import { Router } from "express";
import cardRouter from "./cardRouter.js";
import rechargeRouter from "./rechargeRouter.js";


const router = Router();

router.use("/card", cardRouter);
router.use("/card", rechargeRouter);


export default router;