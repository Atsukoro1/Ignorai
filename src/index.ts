#!/usr/bin/env node

import { Command } from "commander";
import { configDotenv } from "dotenv";

// Commands
import { entry as generate } from "./generate";
import { entry as setup } from "./setup";

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
  .option("-m", "--model", "gpt4o")
  .action(setup);

program.parse(process.argv);

configDotenv({
  path: "./.env",
});
