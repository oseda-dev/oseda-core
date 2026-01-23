import { NavigateFunction, useNavigate } from "react-router-dom";
import "./NavButton.css";

interface ButtonProps {
  text: string;
  url: string;
}

const NavButton = ({ text, url }: ButtonProps) => {
  const nav = useNavigate();

  return (
    <button
      className="nav-button glass"
      onClick={() => nav(url)}
    >
      <span className="glass-content">{text}</span>
    </button>
  );
};

export default NavButton;
