"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiToken = exports.saveApiToken = exports.createStoreDirectories = void 0;
const node_os_1 = __importDefault(require("node:os"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
/**
 * Gets the correct system directory path to store data for this app based on the current OS
 * @param {string} appName The name of the application
 * @returns {string} The path to store the data
 */
const getSystemDirectoryPath = (appName = "ignorai") => {
    const homeDir = node_os_1.default.homedir();
    switch (node_os_1.default.platform()) {
        case "win32":
            return node_path_1.default.join(homeDir, "AppData", "Local", appName);
        case "linux":
            return node_path_1.default.join(homeDir, ".config", appName);
        case "darwin":
            return node_path_1.default.join(homeDir, "Library", "Application Support", appName);
        default:
            throw new Error("This operating system is not supported!");
    }
};
/**
 * Creates the necessary directories for the application to run properly
 */
const createStoreDirectories = () => {
    const targetPath = getSystemDirectoryPath();
    if (node_fs_1.default.existsSync(targetPath))
        return;
    node_fs_1.default.mkdirSync(targetPath, {
        recursive: true,
    });
};
exports.createStoreDirectories = createStoreDirectories;
/**
 * Saves the OpenAI API token to the file system for future use
 * @param {string} token The API token to save
 */
const saveApiToken = (token) => {
    const targetPath = getSystemDirectoryPath().concat("/ignorai_config.json");
    node_fs_1.default.writeFileSync(targetPath, JSON.stringify({
        token,
    }), {
        encoding: "utf-8",
    });
};
exports.saveApiToken = saveApiToken;
/**
 * Get the saved OpenAI api token
 * @returns {string} The OpenAI API token
 */
const getApiToken = () => {
    const targetPath = getSystemDirectoryPath().concat("/ignorai_config.json");
    const contents = node_fs_1.default.readFileSync(targetPath, {
        encoding: "utf-8",
    });
    return JSON.parse(contents).token;
};
exports.getApiToken = getApiToken;
