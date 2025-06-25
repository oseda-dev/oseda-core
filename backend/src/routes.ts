import { Router, Response, Request } from "express";
import {
  getAllCourses,
  getCourseConfig,
  getState,
  loadAuthorCourses,
} from "./controller";

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

// this is annoying because these will effectly map to pages in the react router
getAllPresentationNames().forEach((course) => {
  const route = `/courses/${course}`;
  console.log("adding route " + route);
  router.get(route, (req: Request, res: Response) => {
    res.json({
      page: loadPresentation(`${COURSES_ROOT}/${course}`),
    });
  });
});

export default router;
