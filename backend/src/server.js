const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const COURSES_ROOT = path.join(__dirname, "..", "..", "..", "oseda-lib", "courses");

const app = express();
const port = 3001;

app.use(cors());

// serve main frontend build
app.use(express.static(path.join(__dirname, "../../frontend/build")));

// list all courses
app.get("/api/courses", (req, res) => {
  try {
    const projects = fs.readdirSync(COURSES_ROOT).filter((name) =>
      fs.statSync(path.join(COURSES_ROOT, name)).isDirectory()
    );
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load courses" });
  }
});

// load oseda-config.json for a particular course via query params
app.get("/api/info", (req, res) => {
  const title = req.query.title;
  if (!title) return res.status(400).json({ error: "No title provided" });

  const configPath = path.join(COURSES_ROOT, title, "oseda-config.json");

  if (!fs.existsSync(configPath)) {
    return res.status(404).json({ error: "Course not found" });
  }

  try {
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    res.json(config);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read config" });
  }
});

// precompute and serve courses 
try {
  const courses = fs.readdirSync(COURSES_ROOT).filter((name) =>
    fs.statSync(path.join(COURSES_ROOT, name)).isDirectory()
  );

  courses.forEach((courseName) => {
    const distPath = path.join(COURSES_ROOT, courseName, "dist");
    if (!fs.existsSync(distPath)) {
      console.log("dist path did not exist for " + courseName);
      return;
    }

    app.use(
      `/api/courses/${courseName}`,
      express.static(distPath, { index: "index.html" })
    );

    console.log(`Serving course ${courseName} at /api/courses/${courseName}`);
  });
} catch (err) {
  console.error("Failed to precompute course static routes:", err);
}

// disgusting regex fallback for main frontend -> iterally any /api/ routes
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
});

// start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Backend running at http://localhost:${port}`);
});
