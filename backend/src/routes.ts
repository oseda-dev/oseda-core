import { Router, Response, Request } from "express";
import { getAllCourses, getDemo, getState } from "./controller";
import { getAllPresentationNames, loadPresentation } from "./oseda-fs";

export const router = Router();

router.get("/state", getState);
router.get("/demoOne", getDemo);
router.get("/all-courses", getAllCourses);

getAllPresentationNames().forEach((course) => {
  const route = `/courses/${course}`;
  console.log("adding route " + route);
  router.get(route, (req: Request, res: Response) => {
    res.json({
      page: loadPresentation(`demo-presentations/${course}`),
    });
  });
});

export default router;
