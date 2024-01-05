import prompts from "prompts";

export default class Prompts {
  questions = [];

  projectNamePrompt = {
    type: "text",
    name: "projectName",
    message: "Project name?",
    onRender(kleur) {
      this.msg = kleur.cyan("Project name?");
    },
  };

  projectDescriptionPrompt = {
    type: "text",
    name: "projectDescription",
    message: "Project description?",
    initial: "",
    onRender(kleur) {
      this.msg = kleur.cyan("Project description?");
    },
  };

  buildToolsPrompt = {
    type: "multiselect",
    name: "buildTools",
    message: "Build tools",
    choices: [
      { title: "CSS (postCSS cli)", value: "postcss", selected: true },
      { title: "Javascript (Vite)", value: "vite", selected: true },
    ],
    onRender(kleur) {
      this.msg = kleur.cyan("Build tools");
    },
    max: 2,
    hint: "- Space to select. Return to submit",
  };

  constructor() {}

  async promptForCurrentDirectory() {
    this.questions.push(this.projectDescriptionPrompt);
    this.questions.push(this.buildToolsPrompt);

    await this.handlePrompts();
    return this.prompts;
  }

  async prompt(defaultProjectName) {
    this.projectNamePrompt.initial = defaultProjectName;

    this.questions.push(this.projectNamePrompt);
    this.questions.push(this.projectDescriptionPrompt);
    this.questions.push(this.buildToolsPrompt);

    await this.handlePrompts();
    return this.prompts;
  }

  async handlePrompts() {
    let wasCancelled = false;

    const onCancel = (prompt) => {
      console.log("cancelled ...");
      wasCancelled = true;
      process.exit(1);
      return true;
    };

    this.prompts = await prompts(this.questions, { onCancel });
    if (wasCancelled) {
      process.exit(1);
    }
  }
}
