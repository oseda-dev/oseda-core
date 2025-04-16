import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RawHtmlViewer from "../../components/RawHtmlViewer/RawHtmlViewer";

const Course = () => {
  const { title } = useParams<{ title: string }>();

  const [data, setData] = useState("");

  useEffect(() => {
    if (!title) return;

    console.log(
      "I am about to fetch " + `http://localhost:3001/api/course/${title}`,
    );

    fetch(`http://localhost:3001/api/courses/${title}`)
      .then((res) => res.json())
      .then((data: { page: string }) => {
        console.log(data);
        setData(data.page);
      });
  }, [title]);

  return (
    <>
      <h1>{title}</h1>
      <RawHtmlViewer htmlContent={data} />
    </>
  );
};

export default Course;
