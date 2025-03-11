#!/usr/bin/env node

import inquirer from "inquirer";
import { execSync } from "child_process";
import chalk from "chalk";
import analyzeFileChanges from "./analyzeFileChanges.js";

const priorityOrder = ['fix', 'feat', 'perf', 'refactor', 'style', 'docs', 'test', 'chore'];

async function getChangedFiles() {
  try {
    const output = execSync("git diff --name-only --cached").toString().trim();
    return output ? output.split("\n") : [];
  } catch (error) {
    console.error(chalk.red("Error fetching changed files:"), error);
    process.exit(1);
  }
}

async function generateCommitMessage() {
  const changedFiles = await getChangedFiles();
  if (changedFiles.length === 0) {
    console.log(
      chalk.yellow(
        "No staged changes detected. Please stage your changes first."
      )
    );
    process.exit(1);
  }

  const messages = new Set();
  for (const file of changedFiles) {
    const message = await analyzeFileChanges(file);
    if (message) messages.add(message);
  }

  const messageList = Array.from(messages);
  const categorizedMessages = {};

  messageList.forEach((msg) => {
    const type = msg.split(":")[0];
    if (!categorizedMessages[type]) categorizedMessages[type] = [];
    categorizedMessages[type].push(msg);
  });

  const primaryType =
    priorityOrder.find((type) => categorizedMessages[type]?.length > 0) ||
    "chore";
  const suggestedMessage =
    categorizedMessages[primaryType]?.[0] || "chore: updates";
  console.log(`📌 Suggested commit message: ${chalk.yellow(suggestedMessage)}`);
  const { selectedMessage } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedMessage",
      message: `${chalk.white(
        "Select a commit message or write a custom one:"
      )}`,
      choices: [
        suggestedMessage,
        ...messageList.filter((msg) => msg !== suggestedMessage),
        "Write a custom message",
      ],
      loop: false,
    },
  ]);

  let finalMessage = selectedMessage;
  if (selectedMessage === "Write a custom message") {
    const { customMessage } = await inquirer.prompt([
      {
        type: "input",
        name: "customMessage",
        message: "Enter your custom commit message:",
      },
    ]);
    finalMessage = customMessage;
  }

  return finalMessage;
}

async function commit() {
  const commitMessage = await generateCommitMessage();
  try {
    console.log(
      `⚙️ Executing command ${chalk.yellow.italic(
        `git commit -m ${chalk.blueBright(`"${commitMessage}"`)}`
      )}`
    );
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    console.log(chalk.green.bold("✔ Commit successful!"));
  } catch (error) {
    console.error(chalk.red("❌ Error committing changes:"), error);
    process.exit(1);
  }
}

export default commit;
