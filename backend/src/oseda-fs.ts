import { json } from "express";
import { readdirSync, readFileSync } from "fs";
import path from "path";

export const COURSES_ROOT = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "oseda-lib",
  "courses",
);

// also this should absolutely be done asynchronesly eventually
export const loadPresentation = (directory: string) => {
  // I think we'll need to enforce vite defaults to make this not horribly painful
  const expectedFilePath = path.join(directory, "dist", "index.html");


  // should server the 

  const content = readFileSync(path.join(expectedFilePath), "utf8");

  return content;
};

export const getAllPresentationNames = (): string[] => {
  const files = readdirSync(COURSES_ROOT);

  return files;
};
