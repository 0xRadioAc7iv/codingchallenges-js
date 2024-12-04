#!/usr/bin/env node

import { Command } from "commander";
import { handleOptions } from "../utils/functions.js";

const program = new Command();

program
  .name("wc")
  .description(
    `Print newline, word, and byte counts for each FILE, and a total line if
more than one FILE is specified.  A word is a non-zero-length sequence of
printable characters delimited by white space.`
  )
  .version("1.0.0");

program
  .argument("[file]", "Path to the file")
  .option("-c, --bytes", "print the byte counts")
  .option("-l, --lines", "print the newline counts")
  .option("-w, --words", "print the word counts")
  .option("-m, --chars", "print the character counts")
  .action(async (file, options) => {
    if (file) {
      handleOptions(options, file, false);
    } else {
      if (!process.stdin.isTTY) {
        let data = "";

        process.stdin.setEncoding("utf8");
        process.stdin.on("data", (chunk) => {
          data += chunk;
        });
        process.stdin.on("end", () => {
          handleOptions(options, data, true);
        });

        return;
      }
      console.error("file: argument not found");
    }
  });

program.parse();
