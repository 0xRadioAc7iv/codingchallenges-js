#!/usr/bin/env node

import { Command } from "commander";
import fs from "node:fs/promises";

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
  .action(async (file, options) => {
    if (options && Object.keys(options).length > 0) {
      const bytesOption = options.bytes;
      const linesOption = options.lines;

      if (file) {
        if (bytesOption) {
          const fileBuffer = await fs.readFile(file);
          console.log(`${fileBuffer.length} ${file}`);
        }

        if (linesOption) {
          const fileHandle = await fs.open(file);
          let lines = 0;

          for await (const line of fileHandle.readLines()) {
            lines++;
          }

          console.log(`${lines} ${file}`);
        }
      } else {
        console.error("file: argument not found");
      }
    }
  });

program.parse();
