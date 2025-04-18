import { readFileSync } from "fs";
import path from "path";
import { isContext } from "vm";

export interface OsedaConfig {
  title: string;
  author: string;
  header: string;
}

export const loadConfigForCourse = (coursePath: string): OsedaConfig => {
  const content = readFileSync(
    path.join(coursePath, "oseda-config.json"),
    "utf8",
  );

  const conf: OsedaConfig = JSON.parse(content);

  return conf;
};
