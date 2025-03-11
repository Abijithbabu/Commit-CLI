#!/usr/bin/env node

import { Command } from "commander";
import commit from "./commit.js";

const program = new Command();

// Define CLI commands
program
  .command("commit")
  .description("Generate a conventional commit message based on added files (git add) and commit changes")
  .action(commit);

program.parse(process.argv);
