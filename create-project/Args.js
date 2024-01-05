import minimist from "minimist";
import Files from "./Files.js";

export default class Args {
  constructor(defaultTargetDir) {
    this.args = {};
    this.defaultTargetDir = defaultTargetDir;
    this.options = {};

    this.parse();
  }

  parse() {
    const args = minimist(process.argv.slice(2), this.options);
    const argTargetDir = Files.formatTargetDir(args._[0]);

    this.args.targetDir = argTargetDir || this.defaultTargetDir;
    this.args.argTemplate = args.template || args.t;
  }
}
