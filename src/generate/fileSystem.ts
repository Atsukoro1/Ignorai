import * as fs from "fs";
import * as path from "path";

type AnalyzedContent = {
  type: "FOLDER" | "FILE";
  contents: string;
  children: string[];
  name: string;
};

/**
 * Function to crawl through folders and files and read their contents and names
 * @param {string[]} paths Array of file paths to crawl
 * @param {number} maxDepth Max files to recursively crawl through
 * @returns {AnalyzedContent[]}
 */
export const readImportantFiles = (
  paths: string[],
  maxDepth: number = 2,
): string => {
  const contents: AnalyzedContent[] = [];

  const crawl = (currentPath: string, depth: number) => {
    if (depth > maxDepth || !fs.existsSync(currentPath)) return;

    const stats = fs.statSync(currentPath);
    const baseName = path.basename(currentPath);

    if (stats.isFile()) {
      const fileContents = fs.readFileSync(currentPath, "utf8");
      contents.push({
        type: "FILE",
        contents: fileContents,
        children: [],
        name: baseName,
      });
    } else if (stats.isDirectory()) {
      const children: string[] = [];
      const childPaths = fs.readdirSync(currentPath);

      childPaths.forEach((childName) => {
        const childPath = path.join(currentPath, childName);
        children.push(childPath);
        crawl(childPath, depth + 1);
      });

      contents.push({
        type: "FOLDER",
        contents: "",
        children: children,
        name: baseName,
      });
    }
  };

  paths.forEach((p) => crawl(p, 0));

  return JSON.stringify(contents);
};

/**
 * Function to get all files and folders in base directory which will be used to determine specific ones
 * that will be useful to crawl
 *
 * @returns {string} Stringified array of folders & files
 */
export const getBaseFolderStructure = (): string => {
  const folders = fs.readdirSync("./");

  return JSON.stringify(folders);
};

/**
 * Function to save the generated .gitignore file
 * @param {string} contents Contents of the .gitignore file
 */
export const saveIgnoreFile = (contents: string) => {
  fs.writeFileSync(".gitignore", contents);
};
