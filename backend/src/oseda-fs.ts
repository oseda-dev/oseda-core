import { json } from "express";
import { readdirSync, readFileSync } from "fs";
import path from "path";

// also this should absolutely be done asynchronesly eventually
export const loadPresentation = (directory: string) => {
  // I think we'll need to enforce vite defaults to make this not horribly painful
  const expectedFilePath = path.join(directory, "dist", "index.html");
  const backendRoot = path.join(__dirname, "..");

  const content = readFileSync(
    path.join(backendRoot, expectedFilePath),
    "utf8",
  );

  return content;
};

export const getAllPresentationNames = (): string[] => {
  const presentationDirectory = path.join(
    __dirname,
    "..",
    "demo-presentations",
  );

  const files = readdirSync(presentationDirectory);

  return files;
};
