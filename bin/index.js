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
  .option("-w, --words", "print the word counts")
  .option("-m, --chars", "print the character counts")
  .action(async (file, options) => {
    if (options && Object.keys(options).length > 0) {
      const bytesOption = options.bytes;
      const linesOption = options.lines;
      const wordsOption = options.words;
      const charsOption = options.chars;

      if (file) {
        const fileBuffer = await fs.readFile(file);
        const fileString = fileBuffer.toString();

        if (bytesOption) {
          console.log(`${fileBuffer.length} ${file}`);
        }

        if (linesOption) {
          const fileHandle = await fs.open(file);
          let lines = 0;

          for await (const _line of fileHandle.readLines()) {
            lines++;
          }

          console.log(`${lines} ${file}`);
        }

        if (wordsOption) {
          const fileWordsArrayLength = fileString
            .split(/\s+/)
            .filter((word) => word != "").length;
          console.log(`${fileWordsArrayLength} ${file}`);
        }

        if (charsOption) {
          const fileCharsArrayLength = [...fileString].filter(
            (char) => char != "\n" || char != "\r"
          ).length;
          console.log(`${fileCharsArrayLength} ${file}`);
        }

        return;
      } else {
        console.error("file: argument not found");
      }
    }

    const fileBuffer = await fs.readFile(file);
    const fileString = fileBuffer.toString();

    const fileHandle = await fs.open(file);
    let lines = 0;

    for await (const _line of fileHandle.readLines()) {
      lines++;
    }

    const fileWordsArrayLength = fileString
      .split(/\s+/)
      .filter((word) => word != "").length;

    const fileCharsArrayLength = [...fileString].filter(
      (char) => char != "\n" || char != "\r"
    ).length;

    console.log(
      `${lines} ${fileWordsArrayLength} ${fileCharsArrayLength} ${file}`
    );
  });

program.parse();
