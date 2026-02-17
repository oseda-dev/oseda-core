import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/home/Landing";
import Courses from "./pages/courses/Courses";
import Course from "./pages/course/Course";
import Author from "./pages/author/Author";
import Docs from "./pages/docs/Docs";
import { ProSidebarProvider } from "react-pro-sidebar"
import OverviewDoc from "./pages/docs/Overview/Overview";
import GettingStarted from "./pages/docs/GettingStarted/GettingStarted";
import Guidelines from "./pages/docs/Guidelines/Guidelines";
import Cargo from "./pages/docs/Cargo/Cargo";
import Commands from "./pages/docs/Commands/Commands";
import CLI from "./pages/docs/CLI/CLI";
import Backend from "./pages/docs/Backend/Backend";
import Frontend from "./pages/docs/Frontend/Frontend";
import AboutUs from "./pages/about/AboutUs";
import CoreDevelopment from "./pages/docs/CoreDevelopment/CoreDevelopment";
import Library from "./pages/docs/Library/Library";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="about" element={<AboutUs />} />

        {/* All this doc stuff is a little annoying, but I really want the docs to be link-safe */}
        {/* Docs added here must also be added to Docs.tsx */}
        <Route
          path="/docs"
          element={
            <ProSidebarProvider>
              <Docs />
            </ProSidebarProvider>
          }
        >
          {/* index = "default" route when docs selected */}
          <Route index element={<OverviewDoc />} />
          <Route path="overview" element={<OverviewDoc />} />

          <Route path="contributing">
            <Route path="getting-started" element={<GettingStarted />} />
            <Route path="guidelines" element={<Guidelines />} />
          </Route>

          <Route path="cli">
            <Route path="overview" element={<CLI />} />
            <Route path="cargo" element={<Cargo />} />
            <Route path="commands" element={<Commands />} />
          </Route>

          <Route path="core">
            <Route path="development" element={<CoreDevelopment />}/>
            <Route path="frontend" element={<Frontend />} />
            <Route path="backend" element={<Backend />} />
          </Route>

          <Route path="lib">
            <Route path="library" element={<Library />} />
          </Route>
        </Route>

        <Route path="/courses/:title" element={<Course />} />
        <Route path="/author/:name" element={<Author />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
