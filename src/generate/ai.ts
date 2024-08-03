import OpenAI from "openai";
import { getApiToken } from "../setup/fileSystem";

/**
 * Creates an AI client to prompt with using key fetched from configuration file
 * @returns {OpenAI} Fully functional OpenAI client
 */
const getAiClient = (): OpenAI => {
  const client = new OpenAI({
    apiKey: getApiToken(),
  });

  return client;
};

/**
 * Tells what files/folders are relevant to check of crawl
 * - For example source code file is not and package.json is
 *
 * @param {string} folderString
 * @returns {Promise<string[]>} Array of files/folders
 */
export const analyzeRelevantFiles = async (
  folderString: string,
): Promise<string[]> => {
  const client = getAiClient();

  const response = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Analyze this array of folders and files. Return only the names of files and folders that are typically useful for determining .gitignore contents in a software project. Examples include '.gitignore', 'package.json', 'tsconfig.json', 'webpack.config.js', etc. Provide the names as a comma-separated list without explanations.",
      },
      { role: "user", content: folderString },
    ],
    model: "gpt-3.5-turbo",
  });

  const content = response.choices[0].message.content;

  if (!content) throw new Error("Failed to analyze content");

  return content.split(",").map((item) => item.trim());
};

/**
 * Generates the final .gitignore file based on contents of files and
 * names of folders
 *
 * @param {string} fileContents Stringified array of file/folder names and contents
 * @returns {Promise<string>}
 */
export const determineIgnoreFile = async (
  fileContents: string,
): Promise<string> => {
  const client = getAiClient();

  const response = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Create a .gitignore file based on the provided file/folder structure. Group multiple related files/folders together and then comment the group. Only return the contents of the .gitignore file, don't comment it in any way, don't include the backtick codeblock.",
      },
      { role: "user", content: fileContents },
    ],
    model: "gpt-4o",
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error("Failed to generate .gitignore file");

  return content;
};
