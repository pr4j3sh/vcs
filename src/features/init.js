const { mkdirSync } = require("node:fs");

function init(path) {
  try {
    mkdirSync(path, { recursive: true });
  } catch (error) {
    console.log("failed to initialize\n", error);
  }
}

module.exports = init;
