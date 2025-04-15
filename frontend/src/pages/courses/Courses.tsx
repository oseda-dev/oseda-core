import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import RawHtmlViewer from "../../components/RawHtmlViewer/RawHtmlViewer";
import CoursePreview from "../../components/CoursePreview/CoursePreview";
import Course from "../course-page/Course";

const Courses = () => {
  // interface ResType {
  //   page: string;
  // }

  // const [data, setData] = useState("");
  // useEffect(() => {
  //   fetch("http://localhost:3001/api/demoOne")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data: ResType) => {
  //       setData(data.page);
  //     });
  // }, []);

  // console.log(data);
  //
  //

  const [courses, setCourses] = useState<string[]>([]);
  interface ResType {
    courses: string[];
  }
  useEffect(() => {
    fetch("http://localhost:3001/api/all-courses")
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

  return <>{listItems}</>;
};

export default Courses;
