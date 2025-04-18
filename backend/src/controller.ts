import { Response, Request } from "express";
import { getAllPresentationNames, loadPresentation } from "./oseda-fs";
import { loadConfigForCourse, OsedaConfig } from "./config";
import path from "path";

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

export const getCourseConfig = (req: Request, res: Response) => {
  const rawTitle = req.headers["title"];

  if (typeof rawTitle !== "string") {
    // TODO check this exists

    return;
  }
  const title: string = rawTitle;

  // const thing = path.resolve(path.join("demo-presentations", title));
  const conf: OsedaConfig = loadConfigForCourse(
    path.join("demo-presentations", title),
  );

  res.json(conf);
};
