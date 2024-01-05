#! /usr/bin/env node
import CreateProject from "./CreateProject.js";

const project = new CreateProject();

project.create().catch((e) => {
  console.error(e);
});
