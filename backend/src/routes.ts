import { Router, Response, Request } from "express";

export const router = Router();

router.get("/state", (req: Request, res: Response) => {
  res.json({
    message: "Server should have no state!",
  });
});

export default router;
