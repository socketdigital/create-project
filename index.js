#! /usr/bin/env node
import CreateProject from "./scripts/CreateProject.js";

const project = new CreateProject();

project.create().catch((e) => {
  console.error(e);
});
