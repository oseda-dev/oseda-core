// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const COURSES_ROOT = path.join(__dirname, "..", "..", "..", "oseda-lib", "courses");

const MODE = process.argv[2];
if (!MODE) {
  console.error("You must pass a mode (dev or prod)");
  process.exit(1);
}

const HOST = MODE === "prod" ? "0.0.0.0" : "localhost";

console.log("Backend starting in mode:", MODE, "host:", HOST);

const PORT = 3001

const app = express();

app.use(express.static(path.join(__dirname, "../../frontend/build")));

app.use(cors());

// list all courses
app.get("/api/courses", (req, res) => {
  try {
    const projects = fs
      .readdirSync(COURSES_ROOT)
      .filter((name) =>
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

/*
  serve course dist dynamically:
  requests to /api/courses/:courseName/* will try to serve files from
  <COURSES_ROOT>/<courseName>/dist/<requested path>
*/
app.use("/api/courses/:courseName", (req, res, next) => {
  const courseName = req.params.courseName;
  const distDir = path.join(COURSES_ROOT, courseName, "dist");

  if (!fs.existsSync(distDir) || !fs.statSync(distDir).isDirectory()) {
    return res.status(404).send("course not found");
  }

  // strip the prefix /api/courses/:courseName and serve the rest from dist
  const requestSubPath = req.path === "/" ? "/index.html" : req.path;
  const fullPath = path.join(distDir, requestSubPath);

  // if file exists, send it, otherwise fall back to index.html for SPA
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    return res.sendFile(fullPath);
  } else {
    return res.sendFile(path.join(distDir, "index.html"));
  }
});


// catch-all for frontend routes (anything not /api/)
// technically, is just a reroute for everything.
// works fine without it, but a link directly to a course breaks
app.get(/^\/(?!api\/).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
});





app.listen(PORT, HOST, () => {
  console.log(`Backend listening on http://${HOST}:${PORT} (mode=${MODE})`);
  console.log(`COURSES_ROOT=${COURSES_ROOT}`);
});
