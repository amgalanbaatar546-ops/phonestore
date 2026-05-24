import { Router, type IRouter } from "express";
import healthRouter from "./health";
import phonesRouter from "./phones";
import categoriesRouter from "./categories";
import cartRouter from "./cart";

const router: IRouter = Router();

router.use(healthRouter);
router.use(phonesRouter);
router.use(categoriesRouter);
router.use(cartRouter);

export default router;
