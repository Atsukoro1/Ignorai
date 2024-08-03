import cliProgress from "cli-progress";
import {
  getBaseFolderStructure,
  readImportantFiles,
  saveIgnoreFile,
} from "./fileSystem";
import { analyzeRelevantFiles, determineIgnoreFile } from "./ai";

export const entry = async () => {
  const progressBar = new cliProgress.SingleBar(
    {
      hideCursor: true,
      format: "Generating ignore file | {bar} | {percentage}% | ETA: {eta}s",
    },
    cliProgress.Presets.legacy,
  );
  progressBar.start(6, 1);

  const folderBase = getBaseFolderStructure();
  progressBar.increment();

  const relevantFiles = await analyzeRelevantFiles(folderBase);
  progressBar.increment();

  const fileContents = readImportantFiles(relevantFiles);
  progressBar.increment();

  const ignoreFile = await determineIgnoreFile(fileContents);
  progressBar.increment();

  saveIgnoreFile(ignoreFile);
  progressBar.increment();

  progressBar.stop();
};
