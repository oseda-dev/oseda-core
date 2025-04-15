import { Router, Response, Request } from "express";
import { getAllCourses, getDemo, getState } from "./controller";
import { getAllPresentationNames, loadPresentation } from "./oseda-fs";

export const router = Router();

router.get("/state", getState);
router.get("/demoOne", getDemo);
router.get("/all-courses", getAllCourses);

const dynamicCourseRoutes = getAllPresentationNames().map((course) => {
  const route = `/${course}`;
  router.get(route, (req: Request, res: Response) => {
    res.json({
      page: loadPresentation(`demo-presentations/${course}`),
    });
  });
});

export default router;
