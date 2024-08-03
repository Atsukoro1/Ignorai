"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.entry = void 0;
const cli_progress_1 = __importDefault(require("cli-progress"));
const fileSystem_1 = require("./fileSystem");
const ai_1 = require("./ai");
const entry = async () => {
    const progressBar = new cli_progress_1.default.SingleBar({
        hideCursor: true,
        format: "Generating ignore file | {bar} | {percentage}% | ETA: {eta}s",
    }, cli_progress_1.default.Presets.legacy);
    progressBar.start(6, 1);
    const folderBase = (0, fileSystem_1.getBaseFolderStructure)();
    progressBar.increment();
    const relevantFiles = await (0, ai_1.analyzeRelevantFiles)(folderBase);
    progressBar.increment();
    const fileContents = (0, fileSystem_1.readImportantFiles)(relevantFiles);
    progressBar.increment();
    const ignoreFile = await (0, ai_1.determineIgnoreFile)(fileContents);
    progressBar.increment();
    (0, fileSystem_1.saveIgnoreFile)(ignoreFile);
    progressBar.increment();
    progressBar.stop();
};
exports.entry = entry;
