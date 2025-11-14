import { Router, Response, Request, Express } from "express";
import express from 'express';
import {
  getAllCourses,
  getCourseConfig,
  getState,
  loadAuthorCourses,
} from "./controller";
import { join } from "path";
import { existsSync, readdirSync } from "fs";

import {
  COURSES_ROOT,
  getAllPresentationNames,
  loadPresentation,
} from "./oseda-fs";

export const router = Router();

router.get("/state", getState); // testing endpoint
router.get("/all-courses", getAllCourses);
router.get("/info", getCourseConfig);

router.get("/author/:name", loadAuthorCourses);

// this is annoying because these will effectively map to pages in the react router
getAllPresentationNames().forEach((course) => {
  const route = `/courses/${course}`;
  console.log("adding route " + route);
  router.get(route, (req: Request, res: Response) => {
    res.json({
      page: loadPresentation(`${COURSES_ROOT}/${course}`),
    });
  });
});


export const serveStaticPublicRoutes = (app: Express) => {
    const courses = getAllPresentationNames();

    courses.forEach((course) => {
        const publicDir = join(COURSES_ROOT, course, "public");
        if (!existsSync(publicDir)) return;

        console.log(readdirSync(publicDir));

        // mount static files at /courses/course-name/
        app.use(`/courses/`, express.static(publicDir));

        console.log(`Serving static files for /courses/${course} from ${publicDir}`);
    });
};


export default router;
