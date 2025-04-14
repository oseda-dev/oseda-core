import { Router, Response, Request } from "express";
import { getDemo, getState } from "./controller";

export const router = Router();

router.get("/state", getState);
router.get("/demoOne", getDemo);

export default router;
