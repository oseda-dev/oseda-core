import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";
import NavButton from "../NavButton/NavButton";

// buttons should have a consistent styling in theory lol, so component here.
// also good example for like. How to do this stuff in general
interface CoursePreviewProps {
  title: string;
}

const CoursePreview = ({ title }: CoursePreviewProps) => {
  return (
    <div>
      <h1> {title}</h1>
      <NavButton text="Go To Course" url={`/${title}`}></NavButton>
    </div>
  );
};

export default CoursePreview;
