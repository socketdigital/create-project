import minimist from "minimist";
import Files from "./Files.js";

export default class Args {
  constructor() {
    this.args = {};
    this.defaultTargetDir = "new-project";
    this.options = {
      string: ["template"],
      alias: {
        template: "t",
      },
    };

    this.parse();
  }

  parse() {
    const args = minimist(process.argv.slice(2), this.options);
    const argTargetDir = Files.formatTargetDir(args._[0]);

    this.args.targetDir = argTargetDir || this.defaultTargetDir;
    this.args.argTemplate = args.template || args.t;
  }
}
