import { Router } from "express";
import cardRouter from "./cardRouter.js";
import rechargeRouter from "./rechargeRouter.js";
import paymentRouter from "./paymentRouter.js";

const router = Router();

router.use("/card", cardRouter);
router.use("/card", rechargeRouter);
router.use("/card", paymentRouter);

export default router;