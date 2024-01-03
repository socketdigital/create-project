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

  whichTemplatePrompt = {
    type: "select",
    name: "template",
    message: "Pick a project template",
    onRender(kleur) {
      this.msg = kleur.cyan("Pick a project template");
    },
    choices: [
      {
        title: "Basic Project",
        description: "A basic project template",
        value: "basic-project",
      },
      {
        title: "Vite Project",
        description: "An project template with Vite",
        value: "vite-project",
      },
    ],
    initial: 0,
  };
  constructor() {}

  async promptForCurrentDirectory() {
    this.questions.push(this.projectDescriptionPrompt);
    this.questions.push(this.whichTemplatePrompt);

    await this.handlePrompts();
    return this.prompts;
  }

  async prompt(defaultProjectName) {
    this.projectNamePrompt.initial = defaultProjectName;

    this.questions.push(this.projectNamePrompt);
    this.questions.push(this.projectDescriptionPrompt);
    this.questions.push(this.whichTemplatePrompt);

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
