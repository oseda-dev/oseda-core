import { NavigateFunction, useNavigate } from "react-router-dom";
import "./NavButton.css";

// buttons should have a consistent styling in theory lol, so component here.
// also good example for like. How to do this stuff in general
interface ButtonProps {
  text: string;
  url: string;
}

const NavButton = ({ text, url }: ButtonProps) => {
  const nav = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          nav(url);
        }}
      >
        {text}
      </button>
    </>
  );
};

export default NavButton;
