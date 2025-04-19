import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";
import NavButton from "../NavButton/NavButton";
import "./CoursePreview.css";
import { useEffect, useState } from "react";

// buttons should have a consistent styling in theory lol, so component here.
// also good example for like. How to do this stuff in general
interface CoursePreviewProps {
  title: string;
}

interface OsedaConfig {
  title: string;
  author: string;
  header: string;
}

const CoursePreview = ({ title }: CoursePreviewProps) => {
  const [config, setConfig] = useState<null | OsedaConfig>(null);

  useEffect(() => {
    fetch("/api/info", {
      method: "GET",
      headers: {
        title: title,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setConfig(data))
      .catch((err) => console.error(err));
  }, [title]);

  if (!config) return <div>Loading... (skeleton screen stuff here)</div>;

  return (
    <div className="course-preview">
      <h1>{config.title}</h1>
      <img
        src={config.header}
        alt={`${config.title} header`}
        className="course-header-img"
      />
      <h2>{config.author}</h2>
      <NavButton text="Go To Course" url={`/courses/${title}`} />
    </div>
  );
};

export default CoursePreview;
