import "./Landing.css";
import { useEffect, useState } from "react";
import NavButton from "../../components/NavButton/NavButton";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  interface ResType {
    message: string;
  }

  const [data, setData] = useState<ResType>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/state")
      .then((res) => res.json())
      .then((tmpData) => setData(tmpData));
  }, []);

  return (
    <div className="landing-container">
      <h1>Landing Page</h1>
      <div>Deploy test 1</div>
      <div>Data: {data?.message}</div>
      <div className="nav-button">
        <NavButton text="Go to Courses!" url="/courses" />
      </div>
    </div>
  );
};

export default Landing;
