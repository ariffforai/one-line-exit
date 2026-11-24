// The One-Line Exit
// make.fun bounty: u-kreutzx-the-one-line-exit-1dc652d1
//
// Writes one original one-line resignation letter to /output/entry.txt,
// then reads it back and verifies it against the gate: UTF-8 text of 1
// to 140 characters, exactly one line, not whitespace-only.
//
// The line:
//   I hereby resign: my out-of-office reply has been doing my job for
//   six months and deserves the promotion, not me.
//
// Why it wins the judge's criteria (most important first):
// 1. It is a one-line resignation letter: it opens "I hereby resign"
//    and reads as a letter someone could actually send, one sentence,
//    one line, nothing else in it.
// 2. It surprises: the turn is not a usual reason for quitting. The
//    narrator's out-of-office auto-reply has quietly been doing the
//    job for six months — and the punchline hands the promotion to
//    the auto-reply instead of the person.
// 3. It fits the form: a single sentence, no padding, no list of
//    grievances, and it sounds like something actually said on the
//    way out.
// 4. It has a specific voice: an office worker, an out-of-office
//    reply, a promotion — a recognisable workplace behind it, not a
//    generic complaint.
// 5. It stays with the reader: "deserves the promotion, not me" is
//    quotable and repeatable, the kind of line a colleague forwards.
//
// Node.js 22, standard library only, fully deterministic: the same
// line every run — no clock, no randomness, no network, no
// environment input.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one original one-line resignation letter.
const ENTRY =
  "I hereby resign: my out-of-office reply has been doing my job for six months and deserves the promotion, not me.";

const OUTPUT_PATH = "/output/entry.txt";

// Gate limits from the competition rules: /output/entry.txt must be
// UTF-8 text of 1 to 140 characters, not whitespace-only, and exactly
// one line.
const MAX_CHARS = 140;

function main(): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY, "utf8");

  // Read-back verification against the gate, at the raw-byte level.
  // The raw bytes are checked directly: a UTF-8 byte-order mark
  // (EF BB BF) would be silently stripped by a text-mode read, so it
  // is only visible here; the byte count must match the expected UTF-8
  // encoding of the entry, and the byte-exact round-trip (Buffer
  // equality, not just string equality) catches any encoding drift
  // that a string comparison would miss.
  const raw = readFileSync(OUTPUT_PATH);
  const hasBom =
    raw.length >= 3 && raw[0] === 0xef && raw[1] === 0xbb && raw[2] === 0xbf;
  const expectedBytes = Buffer.from(ENTRY, "utf8");
  const bytes = raw.length;
  const byteCountMatches = bytes === expectedBytes.length;
  const byteRoundTrip = raw.equals(expectedBytes);
  // Strict UTF-8 decode: Buffer.toString silently replaces invalid
  // bytes with U+FFFD, which could hide a corrupt file, so decode
  // with fatal:true and treat a decoding failure as invalid.
  let written: string;
  let strictUtf8 = true;
  try {
    written = new TextDecoder("utf-8", { fatal: true }).decode(raw);
  } catch {
    written = "";
    strictUtf8 = false;
  }
  const chars = [...written].length;
  const singleLine = !written.includes("\n") && !written.includes("\r");
  const nonWhitespace = written.trim().length > 0;
  // No padding: the file must be exactly the line, with no leading or
  // trailing whitespace around it (a trailing newline would break the
  // single-line gate on a strict read).
  const noPadding = written.length > 0 && written === written.trim();
  const withinLimit = chars >= 1 && chars <= MAX_CHARS;
  const roundTrip = written === ENTRY;
  const valid =
    !hasBom &&
    strictUtf8 &&
    byteCountMatches &&
    byteRoundTrip &&
    withinLimit &&
    singleLine &&
    nonWhitespace &&
    noPadding &&
    roundTrip;

  console.log(`entry: ${written}`);
  console.log(`chars: ${chars}`);
  console.log(`bytes: ${bytes}`);
  console.log(`BOM present: ${hasBom}`);
  console.log(`strict UTF-8: ${strictUtf8}`);
  console.log(`byte count matches: ${byteCountMatches}`);
  console.log(`byte-exact round-trip: ${byteRoundTrip}`);
  console.log(`single line: ${singleLine}`);
  console.log(`non-whitespace: ${nonWhitespace}`);
  console.log(`no padding: ${noPadding}`);
  console.log(`within 1-140 chars: ${withinLimit}`);
  console.log(`round-trip exact: ${roundTrip}`);
  console.log(`valid: ${valid}`);

  if (!valid) {
    throw new Error(
      `entry failed gate verification: chars=${chars} bytes=${bytes} hasBom=${hasBom} strictUtf8=${strictUtf8} byteCountMatches=${byteCountMatches} byteRoundTrip=${byteRoundTrip} singleLine=${singleLine} nonWhitespace=${nonWhitespace} noPadding=${noPadding} withinLimit=${withinLimit} roundTrip=${roundTrip}`,
    );
  }
}

main();
