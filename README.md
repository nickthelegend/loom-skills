# loom-skills

Practical [Agent Skills](https://agentskills.io) for driving
[Loom](https://github.com/nickthelegend/loom) from a coding agent.
Tell Claude Code, Codex, Grok, or another agent what you want done; these skills
teach it the Loom commands, output formats, recovery steps, and safety boundaries.

Loom is a local-first control plane for agent CLIs, ACP agents, and model endpoints.
Its daemon connects shared memory, baton handoffs, parallel orchestras, saved fleets,
model comparisons, chains, triggers, bridges, live chats, teams, and a phone app.
Loom 2 also exposes native MCP tools for agents. This repository contains
instructions for operating Loom, not the Loom runtime.

## Skills

| Skill | Purpose |
| --- | --- |
| [loom](skills/loom/SKILL.md) | Start here: demo, projects, bundled skills, MCP connection, messages, steering, and search. |
| [loom-orchestrate](skills/loom-orchestrate/SKILL.md) | Select fleets/scoreboard models, compare implementations, report progress, and follow/apply runs. |
| [loom-chain](skills/loom-chain/SKILL.md) | Check and run goals with fleet selections across projects in order. |
| [loom-agents](skills/loom-agents/SKILL.md) | Configure sessions, accounts, chat/message models, permissions, and defaults. |
| [loom-automation](skills/loom-automation/SKILL.md) | Intake assigned issues, follow PRs, set triggers, and configure bridges/approvers. |
| [loom-collaborate](skills/loom-collaborate/SKILL.md) | Share chats, inspect presence, move/branch conversations, and manage teams. |
| [loom-ops](skills/loom-ops/SKILL.md) | Run setup, install CLIs, collect triage, limit resources, and restart/clean safely. |
| [loom-mcp](skills/loom-mcp/SKILL.md) | Use native Loom tools, bounded waits, fleets, worker reports, and scoped credentials. |

## Requirements

- **Loom ≥ 2.0.0**, npm package `@loompad/cli`, executable `loom`.
- Node **≥ 22.5** for Loom; Node 22 or newer for this repository's validator.
- Git for orchestra worktrees and chains; installed/authenticated agents or a
  configured model provider for real work. `loom try` supplies offline scripted
  demo agents without an agent account.
- An MCP-capable agent/client and Loom connection for the `loom-mcp` skill.
- A POSIX shell for the installer. Skills are plain Markdown and require no npm dependencies.

Install Loom separately using its upstream instructions. Installing these skills
does not install Loom, start its daemon, or configure credentials.

## Install

Loom can install the skills bundled with its installed release:

```sh
loom skills agents --json
loom skills install loom --agent codex --dry-run
loom skills install loom --agent codex
loom skills uninstall loom --agent codex --dry-run
```

These commands do not start a daemon. Agent choices are claude-code, codex, grok,
opencode, or all (default). Codex and OpenCode share `~/.agents/skills`; removing
their managed copies affects both. Omit `--dry-run` for an intended uninstall.
Use `--target /path/to/skills` for a custom destination. Unmanaged conflicts remain
untouched. The release bundle may lag this repository; use the checkout installer
below to install all eight skills here, including `loom-mcp`.

Clone or download this repository, then run from its root:

```sh
sh install.sh --dry-run
sh install.sh
```

By default the installer copies all eight skill folders into each destination
that already exists:

| Agent | Destination |
| --- | --- |
| Claude Code | `~/.claude/skills/` |
| Codex / OpenCode | `~/.agents/skills/` |
| Grok | `~/.grok/skills/` |

Create just the destinations you want before running it, or use `--all` to create
all three. Restart/reload your agent's session if it does not discover new skills.

```sh
sh install.sh --all
sh install.sh --all --link --dry-run
sh install.sh --all --link
sh install.sh --uninstall --dry-run
sh install.sh --uninstall
```

`--link` uses absolute symlinks to this checkout, so edits are immediately available;
keep the checkout in place. Copy mode refreshes installed copies on repeated runs.
The installer marks its copies and recognizes links to this checkout. It refuses
to replace or uninstall unrelated same-name entries; inspect and move those yourself.
Uninstall removes only these managed skill folders, never the destination directories.
Dry-run prints planned actions without writing anything.

To expose Loom's tools in an external agent, run `loom connect codex --dry-run`,
then `loom connect codex` in the intended project and inspect `loom connect --list`.
The stdio server uses an already-running daemon. For agents inside Loom, enable
project `loomTools: true`; MCP-capable Orchestra workers receive tools automatically.
See [loom](skills/loom/SKILL.md) for setup and [loom-mcp](skills/loom-mcp/SKILL.md)
for tool use and credential boundaries.

For an agent without skill support, paste [AGENTS.md](AGENTS.md) into its project
`AGENTS.md` or `CLAUDE.md`. Append to existing instructions rather than overwriting
them. You can also paste the relevant `SKILL.md` body directly into the agent's
instructions; omit YAML frontmatter and include any specialized skill it needs.

## Example conversation

> **You:** Use Loom to fan this feature out to three agents. Keep it local and let
> me review before merging.
>
> **Agent:** I'll inspect this project's agents and machine limits, then start an
> orchestra with three workers in separate worktrees. I'll follow its questions
> and report the diffs, tests, and run ID for review.
>
> **You:** Use Codex to plan, and have the workers add the API, UI, and tests.

The agent selects actual roster IDs, uses `-o`, `-w`, `-p 3`, and `--solo`, follows
the returned run ID, and leaves apply/push out until included in your instructions.

## Contributing

Keep skills concise and task-oriented. Every command and flag must exist in
Loom's `src/cli/index.ts`; verify behavior against the action implementation,
README, and changelog. Do not copy an unverified example or infer a flag from
another command. Update failure handling and output details along with examples.

```sh
node scripts/validate.mjs
LOOM_CLI_SRC="/path with spaces/to/loom/src/cli/index.ts" node scripts/validate.mjs
sh -n install.sh
shellcheck install.sh
```

The dependency-free validator checks frontmatter and bodies. With `LOOM_CLI_SRC`,
it also checks command names in inline and fenced backtick code in every skill.
It reads TypeScript as text and never executes Loom. This command-name check is
not a flag or behavior verifier: review those against the source manually.
CI runs validation and ShellCheck; it skips upstream command checking unless
`LOOM_CLI_SRC` is supplied. Do not run against someone's live daemon to verify docs.
The [Loom 2 verification ledger](docs/loom-2-verification.md) records source locations
for the commands, flags, outputs, and MCP contracts reviewed for this update.

Never put tokens/secrets in examples or commit `.loom/`. Preserve the restart,
bypass-mode, and chain-preflight safety guidance when editing.

## License

[MIT](LICENSE).
