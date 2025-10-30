import { readFileSync } from "fs";
import path from "path";

export interface OsedaConfig {
  title: string;
  author: string;
  // header: string; // now will be base64 data URL
  category: string[];
  last_updated: string;
  color: string;
}

// rolling this function myself bc importing the library is causing too many problems
const getImageMimeType = (filePath: string): string => {
  const extname = path.extname(filePath).toLowerCase();
  const imageMimeTypes: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".bmp": "image/bmp",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".tiff": "image/tiff",
    ".ico": "image/x-icon",
  };

  return imageMimeTypes[extname] || "application/octet-stream"; // get the thingy or grab this as default
};

export const loadConfigForCourse = (coursePath: string): OsedaConfig => {
  const content = readFileSync(
    path.join(coursePath, "oseda-config.json"),
    "utf8",
  );

  const conf: OsedaConfig = JSON.parse(content);

  if(!conf.color) {
    console.log("Found config without color, needs migration")
    conf.color = "#000000"
  }

  // const headerPath = path.join(coursePath, conf.header);
  // const headerBuffer = readFileSync(headerPath);
  // const mimeType = getImageMimeType(headerPath);
  // const base64Header = `data:${mimeType};base64,${headerBuffer.toString("base64")}`;

  return conf;
};
