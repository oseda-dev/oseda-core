import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import RawHtmlViewer from "../../components/RawHtmlViewer/RawHtmlViewer";

const Courses = () => {
  interface ResType {
    page: string;
  }

  const [data, setData] = useState("");
  useEffect(() => {
    fetch("http://localhost:3001/api/demoOne")
      .then((res) => {
        return res.json();
      })
      .then((data: ResType) => {
        setData(data.page);
      });
  }, []);

  console.log(data);

  return (
    <>
      <h1>Courses Page</h1>
      <RawHtmlViewer htmlContent={data} />
    </>
  );
};

export default Courses;
