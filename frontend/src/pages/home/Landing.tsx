import "./Landing.css";
import { useEffect, useState } from "react";
import NavButton from "../../components/NavButton/NavButton";
import GlassPanel from "../../components/GlassPanel/GlassPanel";

const Landing = () => {
  interface ResType {
    message: string;
  }

  const [data, setData] = useState<ResType>();

  useEffect(() => {
    fetch("/api/state")
      .then((res) => res.json())
      .then((tmpData) => setData(tmpData));
  }, []);

  return (
    <div className="landing-wrapper">
      <GlassPanel as="main" className="landing-container" noise>
        <h1>Landing Page</h1>
        <div>Deploy test 1</div>
        <div>Data: {data?.message}</div>

        <div className="nav-button">
          <NavButton text="Go to Courses!" url="/courses" />
        </div>
      </GlassPanel>
    </div>
  );
};

export default Landing;
