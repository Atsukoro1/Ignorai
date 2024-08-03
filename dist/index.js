#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const dotenv_1 = require("dotenv");
// Commands
const generate_1 = require("./generate");
const setup_1 = require("./setup");
const program = new commander_1.Command();
program
    .name("Ignorai")
    .description("An AI utility to generate custom .gitignore files")
    .version("1.0.0");
program
    .command("generate")
    .description("Generates custom .gitignore file")
    .action(generate_1.entry);
program
    .command("setup")
    .description("Sets up everything to work with this cli utility")
    .argument("<token>", "Your OpenAI API token")
    .option("-m", "--model", "gpt4o")
    .action(setup_1.entry);
program.parse(process.argv);
(0, dotenv_1.configDotenv)({
    path: "./.env",
});
