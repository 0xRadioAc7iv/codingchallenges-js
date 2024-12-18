#!/usr/bin/env node

import { Command } from "commander";
import { lexer } from "../lib/lexer.js";

const program = new Command();

program
  .name("json-parser")
  .description(`A Node.js command-line tool to parse and stringify JSON.`)
  .version("1.0.0");

program.argument("[string]", "String to be parsed").action((string) => {
  if (!string) return;

  const tokens = lexer(string);
  console.log(tokens);
});

program.parse();
