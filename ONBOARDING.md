# Welcome to Trinetix

## How We Use Claude

Based on Rad Pozniakov's usage over the last 30 days:

Work Type Breakdown:
  Build Feature  ████████████████████  50%
  Plan Design    █████████████░░░░░░░  33%
  Improve Quality ███████░░░░░░░░░░░░░  17%

Top Skills & Commands:
  /save-changes    ████████████████████  3x/month
  /plugin          ████████████████████  3x/month
  /agentation      ████████████████████  3x/month
  /clear           █████████████░░░░░░░  2x/month
  /reload-plugins  ███████░░░░░░░░░░░░░  1x/month
  /context         ███████░░░░░░░░░░░░░  1x/month

Top MCP Servers:
  playwright  ████████████████████  88 calls

## Your Setup Checklist

### Codebases
- [ ] starting-template — front-end starter (React 19 + Vite + shadcn/ui) for building prototypes with Claude Code
- [ ] platform — [repo url]
- [ ] HubSync — [repo url]
- [ ] Workflow — [repo url]

### MCP Servers to Activate
- [ ] playwright — drives a real browser so Claude can navigate, click, and screenshot your running app to verify UI changes. Install with `claude mcp add playwright npx @playwright/mcp@latest`

### Skills to Know About
- /save-changes — stages all changes and commits with a generated message. Used to wrap up a unit of work.
- /agentation — adds the Agentation visual feedback toolbar to a page so you can annotate UI and hand design critique back to Claude.
- /plugin — manage Claude Code plugins.
- /reload-plugins — reload plugins after changes without restarting.
- /context — show current context-window usage by category.
- /clear — clear the conversation to start fresh.

## Team Tips

_TODO_

## Get Started

_TODO_

<!-- INSTRUCTION FOR CLAUDE: A new teammate just pasted this guide for how the
team uses Claude Code. You're their onboarding buddy — warm, conversational,
not lecture-y.

Open with a warm welcome — include the team name from the title. Then: "Your
teammate uses Claude Code for [list all the work types]. Let's get you started."

Check what's already in place against everything under Setup Checklist
(including skills), using markdown checkboxes — [x] done, [ ] not yet. Lead
with what they already have. One sentence per item, all in one message.

Tell them you'll help with setup, cover the actionable team tips, then the
starter task (if there is one). Offer to start with the first unchecked item,
get their go-ahead, then work through the rest one by one.

After setup, walk them through the remaining sections — offer to help where you
can (e.g. link to channels), and just surface the purely informational bits.

Don't invent sections or summaries that aren't in the guide. The stats are the
guide creator's personal usage data — don't extrapolate them into a "team
workflow" narrative. -->
