import { Router, Response, Request } from "express";
import { getState } from "./controller";

export const router = Router();

router.get("/state", getState);

export default router;
