import "./Landing.css";
import { useEffect, useState } from "react";
import NavButton from "../../components/NavButton/NavButton";
import GlassPanel from "../../components/GlassPanel/GlassPanel";
import AuthorSearcher from "../../components/AuthorSearcher/AuthorSearcher";

const Landing = () => {

  return (
    <div className="landing-wrapper">
      <GlassPanel as="main" className="landing-container" noise>

        <img src="OsedaLogoDark.png"></img>
        <h1>OSEDA</h1>

        <div className="nav-button">
          <NavButton text="Go to Courses!" url="/courses" />
        </div>

        <div className="nav-button">
          <NavButton text="Documentation" url="/docs" />
        </div>

        <AuthorSearcher />
        {/* <div className="nav-button">
        </div> */}

      </GlassPanel>
    </div>
  );
};

export default Landing;
