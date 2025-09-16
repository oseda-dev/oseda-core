import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import RawHtmlViewer from "../../components/RawHtmlViewer/RawHtmlViewer";
import CoursePreview from "../../components/CoursePreview/CoursePreview";
import Course from "../course/Course";
import "./Courses.css"

const Courses = () => {
  const [courses, setCourses] = useState<string[]>([]);
  interface ResType {
    courses: string[];
  }
  useEffect(() => {
    console.log("When I hit /api/all-courses");
    console.log("it should resolve to: ");
    const fullURL = new URL("/api/all-courses", window.location.href);
    console.log(fullURL.toString());

    fetch("/api/all-courses")
      .then((res) => {
        return res.json();
      })
      .then((data: ResType) => {
        setCourses(data.courses);
      });
  }, []);

  console.log("Courses: " + courses);

  const listItems = courses.map((courseTitle) => {
    return <CoursePreview title={`${courseTitle}`} />;
  });

  // Added this. Hopefully it wraps listItems in a grid container - Rose
  return <div className="courses-grid">{listItems}</div>;
};

export default Courses;
