import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export default class Files {
  static formatTargetDir(targetDir) {
    return targetDir?.trim().replace(/\/+$/g, "");
  }

  static getProjectName(targetDir) {
    return targetDir === "." ? path.basename(path.resolve()) : targetDir;
  }

  static pathExists(path) {
    return fs.existsSync(path);
  }

  static pathIsEmptyOrOnlyHasDotGit(path) {
    const files = fs.readdirSync(path);
    return files.length === 0 || (files.length === 1 && files[0] === ".git");
  }

  static isNonEmptyDirectory(directory) {
    if (!Files.pathIsEmptyOrOnlyHasDotGit(directory)) {
      return true;
    }
    return false;
  }

  static getFullDirPath(dirName) {
    const currentDir = process.cwd();
    return path.resolve(currentDir, dirName);
  }
  static makeDir(fullDirPath) {
    fs.mkdirSync(fullDirPath, { recursive: true });
  }
}
