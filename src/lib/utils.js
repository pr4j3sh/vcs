const { readFileSync, writeFileSync, existsSync } = require("node:fs");
const crypto = require("crypto");
const zlib = require("zlib");

function getHash(data) {
  try {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    const file = hash.digest("hex");

    return file;
  } catch (error) {
    console.error("failed to hash\n", error);
    return null;
  }
}

function compress(data, path) {
  try {
    const compressed = zlib.deflateSync(data);
    writeFileSync(path, compressed);
  } catch (error) {
    console.error("failed to compress\n", error);
  }
}

function stage(path, meta) {
  try {
    let index = [];
    if (existsSync(path)) {
      const data = readFileSync(path, "utf-8");
      index = data ? JSON.parse(data) : [];
    }
    const isHashPresent = index.some((entry) => entry.hash === meta.hash);
    if (isHashPresent) {
      return;
    }
    index.push(meta);

    writeFileSync(path, JSON.stringify(index, null, 2));
  } catch (error) {
    console.error("failed to stage\n", error);
  }
}

module.exports = {
  getHash,
  compress,
  stage,
};
