import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/home/Landing";
import Courses from "./pages/courses/Courses";
import Course from "./pages/course/Course";
import Author from "./pages/author/Author";

function App() {
  const [courses, setCourses] = useState<string[]>([]);
  interface ResType {
    courses: string[];
  }

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => {
        return res.json();
      })
      .then((data: ResType) => {
        setCourses(data.courses);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:title" element={<Course />} />
        <Route path="/author/:name" element={<Author />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
