const { mkdirSync, readFileSync } = require("node:fs");
const { getHash, compress, stage } = require("../lib/utils.js");
const { PATHS } = require("../lib/consts.js");

function add(path) {
  try {
    const data = readFileSync(path);
    const hash = getHash(data);
    const objectDirPath = PATHS.dirPath + hash.substring(0, 2);
    const objectFilePath = objectDirPath + "/" + hash;
    mkdirSync(objectDirPath, { recursive: true });
    compress(data, objectFilePath);
    stage(PATHS.indexPath, { hash, path });
  } catch (error) {
    console.log("failed to add\n", error);
  }
}

module.exports = add;
