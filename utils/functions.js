import fs from "fs/promises";

async function getLineCount(fileString) {
  const dataLines = fileString.split("\n").filter((line, index, array) => {
    return line.length > 0 || index !== array.length - 1;
  });

  return dataLines.length;
}

function getWordCount(fileString) {
  const fileWordsArrayLength = fileString
    .split(/\s+/)
    .filter((word) => word != "").length;

  return fileWordsArrayLength;
}

function getCharCount(fileString) {
  const fileCharsArrayLength = [...fileString].filter(
    (char) => char != "\n" || char != "\r"
  ).length;

  return fileCharsArrayLength;
}

export async function handleOptions(options, file, isStandardInput) {
  let fileBuffer;
  let fileString;
  let output = "";

  const fileName = isStandardInput ? "" : file;

  if (!isStandardInput) {
    fileBuffer = await fs.readFile(file);
    fileString = fileBuffer.toString();
  } else {
    fileBuffer = file;
    fileString = file.toString();
  }

  if (options && Object.keys(options).length > 0) {
    const bytesOption = options.bytes;
    const linesOption = options.lines;
    const wordsOption = options.words;
    const charsOption = options.chars;

    if (bytesOption) {
      output += `${fileBuffer.length} `;
    }

    if (linesOption) {
      const lines = await getLineCount(fileString);
      output += `${lines} `;
    }

    if (wordsOption) {
      const words = getWordCount(fileString);
      output += `${words} `;
    }

    if (charsOption) {
      const chars = getCharCount(fileBuffer);
      output += `${chars} `;
    }

    console.log(`${output}${fileName}`);
  } else {
    const lines = await getLineCount(fileString);
    const words = getWordCount(fileString);
    const chars = getCharCount(fileString);

    console.log(`${lines} ${words} ${chars} ${fileName}`);
  }
}
