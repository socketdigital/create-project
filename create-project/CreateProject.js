import Args from "./Args.js";
import Prompts from "./Prompts.js";
import Files from "./Files.js";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import kleur from "kleur";
import spawn from "cross-spawn";

export default class CreateProject {
  constructor() {
    this.targetDir = "";
    this.projectName = "";
    this.templateName = "no-build-project";
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
        kleur.red(
          `. (${this.projectName}) is not empty, please choose another path.`
        )
      );
      process.exit(1);
    }

    console.log(
      kleur.cyan(`Creating project '${this.projectName}' in current directory.`)
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

    const templateSourceDir = `${this.getProjectDirname()}/${templateName}`;

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
        kleur.red(
          `The path ${projectName} already exists. Please remove or choose another path.`
        )
      );
      process.exit(1);
    }
  }

  getProjectDirname() {
    const filename = fileURLToPath(import.meta.url);
    const dirname = path.dirname(filename);
    return dirname;
  }

  copyTemplateDirectory(templateSourceDir, projectPath, templateName) {
    console.log(
      "\n",
      kleur.blue(`Creating ${templateName}`),
      "\n",
      kleur.blue(`in ${projectPath}`)
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
        kleur.red(`Failed to run npm install in ${projectPath}. Exiting.`)
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
      kleur.green(`Created project ${projectName}`),
      "\n\n",
      kleur.green(`cd ${projectName}`),
      "\n"
    );
  }

  successMessageCurrentDirectory(projectName) {
    console.log(
      "\n",
      kleur.green(`Created project ${projectName}`),
      "\n",
      kleur.green(`in current directory.`),
      "\n"
    );
  }
}
