#!/usr/bin/env node

const add = require("./src/features/add");
const init = require("./src/features/init");
const { PATHS } = require("./src/lib/consts");

const args = process.argv.slice(2);

if (args[0] === "init") {
  init(PATHS.dirPath);
} else if (args[0] === "add") {
  if (args[1]) {
    add(args[1]);
  } else {
    console.error("path not found");
  }
} else {
  console.log("usage:");
  console.log("\tnpm start [init] [add <patih/to/file>]");
}
