# WC CLI Tool

A Node.js command-line tool that replicates the functionality of the Unix `wc` command. It provides newline, word, byte, and character counts for a specified file.

## Features

- Count the number of **bytes** in a file.
- Count the number of **lines** in a file.
- Count the number of **words** in a file.
- Count the number of **characters** in a file.
- Handles whitespace effectively when counting words and characters.

## Installation

To use this tool, you need to have [Node.js](https://nodejs.org) installed.

1. Clone the repository

```bash
git clone https://github.com/0xRadioAc7iv/codingchallenges-wc
```

2. `cd` into the repo

```bash
cd codingchallenges-wc
```

3. Install the package globally

```bash
npm install -g
```

## Usage

Run the tool using the following syntax:

```bash
wc [options] [file]
```

Example:

```bash
wc -l -w file.txt
```

### Options

Option

Description

`-c`, `--bytes`

Print the byte counts.

`-l`, `--lines`

Print the line counts.

`-w`, `--words`

Print the word counts.

`-m`, `--chars`

Print the character counts.

## Examples

To count the number of lines in a file:

```
wc -l file.txt
```

To count the number of words and bytes in a file:

```
wc -w -c file.txt
```

To display all counts for a file:

```
wc file.txt
```

## Contributing

Feel free to contribute to the project by opening issues or submitting pull requests on the [GitHub repository](https://github.com/0xRadioAc7iv/codingchallenges-wc).
