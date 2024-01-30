const fs = require("fs").promises;
const path = require("path");

const rootDir = require("../helpers/path");

exports.deleteImage = async (filePath) => {
  try {
    const absolutePath = path.join(rootDir, filePath);
    await fs.unlink(absolutePath);

    return true;
  } catch (error) {
    console.error(">>> deleteImage", error);
    throw error;
  }
};
