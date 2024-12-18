const TOKENS = new Map();

TOKENS.set("LBRACE", "{");
TOKENS.set("RBRACE", "}");

export function lexer(string) {
  const token_entries = TOKENS.entries();
  const tokens = [];

  for (let i = 0; i < TOKENS.size; i++) {
    const char = string.charAt(i);
    const entry = token_entries.next().value;

    if (char === entry[1]) {
      tokens.push(entry);
    }
  }

  return tokens;
}
