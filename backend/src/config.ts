import { readFileSync } from "fs";
import path from "path";
import mime from "mime";

export interface OsedaConfig {
  title: string;
  author: string;
  header: string; // now will be base64 data URL
}

export const loadConfigForCourse = (coursePath: string): OsedaConfig => {
  const content = readFileSync(
    path.join(coursePath, "oseda-config.json"),
    "utf8",
  );

  const conf: OsedaConfig = JSON.parse(content);

  // weird base 64 stuff i stole from the internet
  const headerPath = path.join(coursePath, conf.header);
  const headerBuffer = readFileSync(headerPath);
  const mimeType = mime.getType(headerPath) || "application/octet-stream";
  const base64Header = `data:${mimeType};base64,${headerBuffer.toString("base64")}`;

  return {
    ...conf,
    header: base64Header,
  };
};
