import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import RawHtmlViewer from "../../components/RawHtmlViewer/RawHtmlViewer";
import CoursePreview from "../../components/CoursePreview/CoursePreview";
import Course from "../course/Course";

const Courses = () => {
  const [courses, setCourses] = useState<string[]>([]);
  interface ResType {
    courses: string[];
  }
  useEffect(() => {
    fetch("/api/all-courses")
      .then((res) => {
        console.log("GOt back: " + res.text());
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

  return <>{listItems}</>;
};

export default Courses;
