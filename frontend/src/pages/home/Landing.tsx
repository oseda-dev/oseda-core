import "./Landing.css";
import { useEffect, useState } from "react";
import NavButton from "../../components/NavButton/NavButton";
import GlassPanel from "../../components/GlassPanel/GlassPanel";
import AuthorSearcher from "../../components/AuthorSearcher/AuthorSearcher";

const Landing = () => {

  return (
    <div className="landing-wrapper">
      <GlassPanel as="main" className="landing-container" noise>

        {/* <img src="OsedaLogoDark.png" className="home"></img>
        <h1>OSEDA</h1>
        <p>Open Source Education Association</p>

        <p>A comprehensive open-source platform for creating, distributing, and hosting educational presentations.</p> */}

        <header>
          <img src="OsedaLogoDark.png" alt="OSEDA logo" className="home" />

          <h1>OSEDA</h1>
          <p><strong>Open Source Education Association</strong></p>
        </header>
				<br></br>
        <main>
          <p>
            A comprehensive open-source platform for creating, distributing,
            and hosting educational presentations.
          </p>
        </main>


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
