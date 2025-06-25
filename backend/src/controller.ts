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

export const loadAuthorCourses = (req: Request, res: Response): void => {
  const { name } = req.params;
  // this is gonna take a lot of file system reading, so this might be really slow for now lol

  console.log("name was: ", name);

  const courses = getAllPresentationNames();

  console.log("all presentation names was, ", courses);
  const configs: OsedaConfig[] = [];

  courses.forEach((title) => {
    const conf: OsedaConfig = loadConfigForCourse(
      path.join(COURSES_ROOT, title),
    );
    configs.push(conf);
  });

  const coursesByAuthor: string[] = configs
    .filter((conf) => {
      return conf.author === name;
    })
    .map((conf) => {
      return conf.title;
    });

  console.log(`courses by ${name} was `, coursesByAuthor);

  res.json(coursesByAuthor);
};
