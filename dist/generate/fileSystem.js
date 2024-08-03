"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveIgnoreFile = exports.getBaseFolderStructure = exports.readImportantFiles = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * Function to crawl through folders and files and read their contents and names
 * @param {string[]} paths Array of file paths to crawl
 * @param {number} maxDepth Max files to recursively crawl through
 * @returns {AnalyzedContent[]}
 */
const readImportantFiles = (paths, maxDepth = 2) => {
    const contents = [];
    const crawl = (currentPath, depth) => {
        if (depth > maxDepth || !fs.existsSync(currentPath))
            return;
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
        }
        else if (stats.isDirectory()) {
            const children = [];
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
exports.readImportantFiles = readImportantFiles;
/**
 * Function to get all files and folders in base directory which will be used to determine specific ones
 * that will be useful to crawl
 *
 * @returns {string} Stringified array of folders & files
 */
const getBaseFolderStructure = () => {
    const folders = fs.readdirSync("./");
    return JSON.stringify(folders);
};
exports.getBaseFolderStructure = getBaseFolderStructure;
/**
 * Function to save the generated .gitignore file
 * @param {string} contents Contents of the .gitignore file
 */
const saveIgnoreFile = (contents) => {
    fs.writeFileSync(".gitignore", contents);
};
exports.saveIgnoreFile = saveIgnoreFile;
