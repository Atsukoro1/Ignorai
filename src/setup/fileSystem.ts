import os from "node:os";
import fs from "node:fs";
import path from "node:path";

/**
 * Gets the correct system directory path to store data for this app based on the current OS
 * @param {string} appName The name of the application
 * @returns {string} The path to store the data
 */
const getSystemDirectoryPath = (appName: string = "ignorai"): string => {
  const homeDir = os.homedir();

  switch (os.platform()) {
    case "win32":
      return path.join(homeDir, "AppData", "Local", appName);
    case "linux":
      return path.join(homeDir, ".config", appName);
    case "darwin":
      return path.join(homeDir, "Library", "Application Support", appName);
    default:
      throw new Error("This operating system is not supported!");
  }
};

/**
 * Creates the necessary directories for the application to run properly
 */
export const createStoreDirectories = () => {
  const targetPath = getSystemDirectoryPath();
  if (fs.existsSync(targetPath)) return;

  fs.mkdirSync(targetPath, {
    recursive: true,
  });
};

/**
 * Saves the OpenAI API token to the file system for future use
 * @param {string} token The API token to save
 */
export const saveApiToken = (token: string) => {
  const targetPath = getSystemDirectoryPath().concat("/ignorai_config.json");

  fs.writeFileSync(
    targetPath,
    JSON.stringify({
      token,
    }),
    {
      encoding: "utf-8",
    },
  );
};

/**
 * Get the saved OpenAI api token
 * @returns {string} The OpenAI API token
 */
export const getApiToken = (): string => {
  const targetPath = getSystemDirectoryPath().concat("/ignorai_config.json");

  const contents = fs.readFileSync(targetPath, {
    encoding: "utf-8",
  });

  return JSON.parse(contents).token;
};
