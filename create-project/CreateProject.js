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
    this.templateName = "project-template";
    this.buildTools = [];
    this.buildToolsSettings = {
      vite: {
        version: "^5.0.8",
        scripts: {
          dev: "vite",
          build: "vite build",
          preview: "vite preview",
        },
      },
      postcss: { version: "^8.4.33" },
      "postcss-cli": {
        version: "^11.0.0",
        scripts: { "build:css": "postcss" },
      },
    };
    this.sourceFolders = ["components", "public", "assets"];
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
    this.projectDescription = answers.projectDescription;
    this.buildTools = answers.buildTools;
    this.projectPath = Files.getFullDirPath(this.projectName);
    this._createProject(
      this.projectName,
      this.templateName,
      this.projectDescription,
      this.projectPath,
      this.buildTools,
      this.buildToolsSettings,
      this.sourceFolders
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

    const prompts = new Prompts();
    const answers = await prompts.promptForCurrentDirectory();
    this.projectDescription = answers.projectDescription;
    this.buildTools = answers.buildTools;
    this.projectPath = Files.getFullDirPath("");

    this._createProject(
      this.projectName,
      this.templateName,
      this.projectDescription,
      this.projectPath,
      this.buildTools,
      this.buildToolsSettings,
      this.sourceFolders
    );

    this.successMessageCurrentDirectory(this.projectName);
  }

  _createProject(
    projectName,
    templateName,
    projectDescription,
    projectPath,
    buildTools,
    buildToolsSettings
  ) {
    this.exitIfProjectExists(projectName);

    const sourceDir = this.getProjectDirname();

    const templateSourceDir = path.join(
      this.getProjectDirname(),
      "create-project",
      templateName
    );

    Files.makeDir(projectPath);
    this.copyTemplateDirectory(templateSourceDir, projectPath, templateName);
    this.copySourceFolders(sourceDir, this.sourceFolders, projectPath);
    this.writePackageJson(
      templateSourceDir,
      projectName,
      projectPath,
      projectDescription,
      buildTools,
      buildToolsSettings
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
    const parentDir = path.resolve(dirname, "..");
    return parentDir;
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

  copySourceFolders(sourceDir, sourceFolders, projectPath) {
    sourceFolders.forEach((folder) => {
      const sourceFolder = path.join(sourceDir, folder);
      const destinationFolder = path.join(projectPath, folder);
      fs.cpSync(sourceFolder, destinationFolder, { recursive: true });
    });
  }

  writePackageJson(
    templateSourceDir,
    projectName,
    projectPath,
    projectDescription,
    buildTools,
    buildToolsSettings
  ) {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(templateSourceDir, `package.json`), "utf-8")
    );

    packageJson.name = projectName;
    packageJson.description = projectDescription;

    this.addBuildToolsToPackageJson(
      packageJson,
      buildTools,
      buildToolsSettings
    );

    fs.writeFileSync(
      path.join(projectPath, "package.json"),
      JSON.stringify(packageJson, null, 2)
    );
  }

  addBuildToolsToPackageJson(packageJson, buildTools, buildToolsSettings) {
    if (buildTools.includes("vite")) {
      packageJson.devDependencies.vite = buildToolsSettings.vite.version;
      packageJson.scripts = {
        ...packageJson.scripts,
        ...buildToolsSettings.vite.scripts,
      };
    }

    if (buildTools.includes("postcss")) {
      packageJson.devDependencies["postcss-cli"] =
        buildToolsSettings["postcss-cli"].version;

      packageJson.scripts = {
        ...packageJson.scripts,
        ...buildToolsSettings["postcss-cli"].scripts,
      };

      if (!buildTools.includes("vite")) {
        packageJson.devDependencies.postcss =
          buildToolsSettings.postcss.version;
      }
    }
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
