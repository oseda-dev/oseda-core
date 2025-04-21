import { Response, Request } from "express";
import {
  COURSES_ROOT,
  getAllPresentationNames,
  loadPresentation,
} from "./oseda-fs";
import { loadConfigForCourse, OsedaConfig } from "./config";
import path from "path";

export const getState = (req: Request, res: Response) => {
  res.json({
    message: "Server should have no state!",
  });
};

export const getAllCourses = (req: Request, res: Response) => {
  res.json({
    courses: getAllPresentationNames(),
  });
};

export const getCourseConfig = (req: Request, res: Response) => {
  const rawTitle = req.headers["title"];
  console.log("hit conf endpoint");

  if (typeof rawTitle !== "string") {
    // TODO check this exists
    throw new Error("type was wrong");

    return;
  }
  const title: string = rawTitle;

  // const thing = path.resolve(path.join("demo-presentations", title));
  const conf: OsedaConfig = loadConfigForCourse(path.join(COURSES_ROOT, title));

  res.json(conf);
};
