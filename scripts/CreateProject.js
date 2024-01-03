import Args from "./Args.js";
import Prompts from "./Prompts.js";
import Files from "./Files.js";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

import { red, green, yellow, blue, cyan } from "kleur/colors";
import spawn from "cross-spawn";

export default class CreateProject {
  constructor() {
    this.targetDir = "";
    this.projectName = "";
    this.templateName = "basic-project";
  }

  async create() {
    this.args = new Args();

    if (this.args.args.targetDir === ".") {
      this._createProjectFromCurrentDirectory();
      return;
    }

    this.targetDir = this.toValidPackageName(this.args.args.targetDir);
    this.projectName = Files.getProjectName(this.args.args.targetDir);

    const prompts = new Prompts();
    const answers = await prompts.prompt(
      this.toValidPackageName(this.projectName)
    );
    this.projectName = this.toValidPackageName(answers.projectName);
    this.templateName = answers.template;
    this.projectDescription = answers.projectDescription;
    this.projectPath = Files.getFullDirPath(this.projectName);
    this._createProject(
      this.projectName,
      this.templateName,
      this.projectDescription,
      this.projectPath
    );
    this.successMessage(this.projectName);
  }

  async _createProjectFromCurrentDirectory() {
    this.projectName = Files.getProjectName(".");
    this.targetDir = this.toValidPackageName(this.projectName);

    if (Files.isNonEmptyDirectory(process.cwd())) {
      console.log(
        red(`. (${this.projectName}) is not empty, please choose another path.`)
      );
      process.exit(1);
    }

    console.log(
      cyan(`Creating project '${this.projectName}' in current directory.`)
    );
    console.log(this.targetDir);

    const prompts = new Prompts();
    const answers = await prompts.promptForCurrentDirectory();
    this.templateName = answers.template;
    this.projectDescription = answers.projectDescription;
    this.projectPath = Files.getFullDirPath("");

    this._createProject(
      this.projectName,
      this.templateName,
      this.projectDescription,
      this.projectPath
    );

    this.successMessageCurrentDirectory(this.projectName);
  }

  _createProject(projectName, templateName, projectDescription, projectPath) {
    this.exitIfProjectExists(projectName);

    console.log(
      "\n",
      yellow(`Creating ${templateName}`),
      "\n",
      yellow(`Project name: ${projectName}`),
      "\n",
      yellow(`Directory:    ${projectName}`)
    );

    const templateSourceDir = `${this.getParentDirname()}/${templateName}`;

    Files.makeDir(projectPath);
    this.copyTemplateDirectory(templateSourceDir, projectPath, templateName);
    this.writePackageJson(
      templateSourceDir,
      projectName,
      projectPath,
      projectDescription
    );
    this.installPackageJson(projectPath);
  }

  exitIfProjectExists(projectName) {
    if (Files.pathExists(projectName)) {
      console.error(
        red(
          `The path ${projectName} already exists. Please remove or choose another path.`
        )
      );
      process.exit(1);
    }
  }

  getParentDirname() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const __parentDir = path.resolve(__dirname, "..");
    return __parentDir;
  }

  copyTemplateDirectory(templateSourceDir, projectPath, templateName) {
    console.log(
      "\n",
      blue(`Copying ${templateName}`),
      "\n",
      blue(`to ${projectPath}`)
    );
    fs.cpSync(templateSourceDir, projectPath, { recursive: true });

    fs.renameSync(
      path.join(projectPath, "gitignore"),
      path.join(projectPath, ".gitignore")
    );
  }

  writePackageJson(
    templateSourceDir,
    projectName,
    projectPath,
    projectDescription
  ) {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(templateSourceDir, `package.json`), "utf-8")
    );

    packageJson.name = projectName;
    packageJson.description = projectDescription;

    fs.writeFileSync(
      path.join(projectPath, "package.json"),
      JSON.stringify(packageJson, null, 2)
    );
  }

  installPackageJson(projectPath) {
    const npm = spawn.sync("npm", ["install"], {
      cwd: projectPath,
      stdio: "inherit",
    });
    if (npm.status !== 0) {
      console.error(
        red(`Failed to run npm install in ${projectPath}. Exiting.`)
      );
      process.exit(1);
    }
  }

  toValidPackageName(projectName) {
    return projectName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/^[._]/, "")
      .replace(/[^a-z\d\-~]+/g, "-");
  }

  successMessage(projectName) {
    console.log(
      "\n",
      green(`Created project ${projectName}`),
      "\n\n",
      green(`cd ${projectName}`),
      "\n"
    );
  }

  successMessageCurrentDirectory(projectName) {
    console.log(
      "\n",
      green(`Created project ${projectName}`),
      "\n",
      green(`in current directory.`)
    );
  }
}