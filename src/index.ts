#!/usr/bin/env node

import { configDotenv } from "dotenv";
import { initCli } from "./cli";

initCli();
configDotenv({
  path: "./.env",
});
