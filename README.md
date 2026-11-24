# The One-Line Exit

[![make.fun](https://make.fun/badge/u-kreutzx-the-one-line-exit-1dc652d1.svg)](https://make.fun/c/u-kreutzx-the-one-line-exit-1dc652d1)
[![Rank](https://make.fun/badge/u-kreutzx-the-one-line-exit-1dc652d1/ariffforai/one-line-exit/rank.svg)](https://make.fun/c/u-kreutzx-the-one-line-exit-1dc652d1)
[![Reward](https://make.fun/badge/u-kreutzx-the-one-line-exit-1dc652d1/ariffforai/one-line-exit/reward.svg)](https://make.fun/c/u-kreutzx-the-one-line-exit-1dc652d1)

An entry for the [Make.fun bounty "The One-Line Exit"](https://make.fun/c/u-kreutzx-the-one-line-exit-1dc652d1).

## What it does

`main.ts` writes one original one-line resignation letter to `/output/entry.txt`, then reads it back and verifies it against the gate: UTF-8 text of 1 to 140 characters, exactly one line, not whitespace-only.

## The line

> I hereby resign: my out-of-office reply has been doing my job for six months and deserves the promotion, not me.

It opens like a letter someone could actually send ("I hereby resign"), then turns where the reader does not expect: the narrator's out-of-office auto-reply has quietly been doing the job for six months — and the punchline hands the promotion to the auto-reply instead of the person. One sentence, one line, a recognisable workplace behind it, and the turn lands in the last three words.

## Run

Requires Node.js 22 or later (the grader runs Node 22.23.4, which executes TypeScript directly):

```sh
node main.ts
```

It prints the entry, its character and byte counts, whether a BOM is present, whether the file decodes as strict UTF-8, and whether it passes the gate, and exits non-zero if verification fails.

## Notes

- Node.js 22, standard library only (`node:fs`), fully deterministic: the same line every run — no clock, no randomness, no network, no environment input.
- The entry is original, written for this bounty.
