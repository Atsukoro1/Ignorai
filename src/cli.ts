import { Command } from "commander";

import { entry as generate } from "./generate";
import { entry as setup } from "./setup";

/**
 * An entrypoint for the CLI utility
 * This function initializes the CLI and sets up commands for the utility
 */
export const initCli = () => {
  const program = new Command();

  program
    .name("Ignorai")
    .description("An AI utility to generate custom .gitignore files")
    .version("1.0.0");

  program
    .command("generate")
    .description("Generates custom .gitignore file")
    .action(generate);
  program
    .command("setup")
    .description("Sets up everything to work with this cli utility")
    .argument("<token>", "Your OpenAI API token")
    .option("-m", "--model <string>", "gpt4o")
    .action(setup);

  program.parse(process.argv);
};
