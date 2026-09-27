import fs from "fs/promises";
import path from "path";

const dataDirectory = path.join(process.cwd(), "src/data");

/**
 * Read a JSON file from src/data
 * @param {string} fileName e.g. "teams.json"
 */
export async function readJsonFile(fileName) {
  try {
    const filePath = path.join(dataDirectory, fileName);
    const data = await fs.readFile(filePath, "utf8");

    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    throw error;
  }
}

/**
 * Write data to a JSON file in src/data
 * @param {string} fileName e.g. "teams.json"
 * @param {Array|Object} data
 */
export async function writeJsonFile(fileName, data) {
  try {
    const filePath = path.join(dataDirectory, fileName);

    await fs.writeFile(
      filePath,
      JSON.stringify(data, null, 2),
      "utf8"
    );
  } catch (error) {
    console.error(`Error writing ${fileName}:`, error);
    throw error;
  }
}