---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git diff:*), Bash(git commit:*)
description: Stage all changes and commit with a generated message
---

## Current state
!`git status --short`

## Changes
!`git diff HEAD`

## Task
1. Run `git add -A` to stage all changes.
2. Analyze the diff above and write a concise, descriptive commit message
   (imperative mood, e.g. "Add status filter to documents panel").
3. Commit with that message.
4. Show the final `git status` to confirm.