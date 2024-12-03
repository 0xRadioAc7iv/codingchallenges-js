#!/usr/bin/env node

import { Command } from "commander";
import fs from "node:fs/promises";

const program = new Command();

program
  .name("wc")
  .description(
    `Print newline, word, and byte counts for each FILE, and a total line if
more than one FILE is specified.  A word is a non-zero-length sequence of
printable characters delimited by white space.
    
With no FILE, or when FILE is -, read standard input.`
  )
  .version("1.0.0");

program
  .option("-c, --bytes <file_path>", "print the byte counts")
  .action(async (option) => {
    const fileBuffer = await fs.readFile(option.bytes);
    console.log(`${fileBuffer.length} ${option.bytes}`);
  });

program.parse();
