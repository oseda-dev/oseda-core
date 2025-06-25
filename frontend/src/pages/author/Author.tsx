import { useEffect, useState } from "react";
import CoursePreview from "../../components/CoursePreview/CoursePreview";
import { useParams } from "react-router-dom";

const Author = () => {
  const { name } = useParams<{ name: string }>();

  const [courses, setCourses] = useState<string[]>([]);
  interface ResType {
    courses: string[];
  }
  useEffect(() => {
    console.log("When I hit /api/author/", name);
    console.log("it should resolve to: ");
    const fullURL = new URL(`/api/author/${name}`, window.location.href);
    console.log(fullURL.toString());

    fetch(`/api/author/${name}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("response was ", data);
        setCourses(data);
      });
  }, [name]);

  console.log("Courses: " + courses);

  const listItems = courses.map((courseTitle) => {
    return <CoursePreview title={`${courseTitle}`} />;
  });

  return <>{listItems}</>;
};

export default Author;
