import { Response, Request } from "express";
import { getAllPresentationNames, loadPresentation } from "./oseda-fs";

export const getState = (req: Request, res: Response) => {
  res.json({
    message: "Server should have no state!",
  });
};

export const getDemo = (req: Request, res: Response) => {
  res.json({
    page: loadPresentation("demo-presentations/demo-1"),
  });
};

export const getAllCourses = (req: Request, res: Response) => {
  res.json({
    courses: getAllPresentationNames(),
  });
};
