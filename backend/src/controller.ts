import { Response, Request } from "express";

export const getState = (req: Request, res: Response) => {
  res.json({
    message: "Server should have no state!",
  });
};
