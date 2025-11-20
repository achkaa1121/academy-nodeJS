import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const history = (req, res) => {
  const dataPath = path.join(__dirname, "../../data/history.json");
  const history = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  res;
};
export const deposit = () => {};
