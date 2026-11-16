# loom-skills

Practical [Agent Skills](https://agentskills.io) for driving
[Loom](https://github.com/nickthelegend/loom) from a coding agent.
Tell Claude Code, Codex, Grok, or another agent what you want done; these skills
teach it the Loom commands, output formats, recovery steps, and safety boundaries.

Loom is a local-first control plane for agent CLIs, ACP agents, and model endpoints.
Its daemon connects shared memory, baton handoffs, parallel orchestras, chains,
triggers, bridges, live chats, teams, and a phone app. This repository contains
instructions for operating Loom, not the Loom runtime.

## Skills

| Skill | Purpose |
| --- | --- |
| [loom](skills/loom/SKILL.md) | Start here: projects, agents, messages, baton, chats, and search. |
| [loom-orchestrate](skills/loom-orchestrate/SKILL.md) | Plan parallel work, follow runs, race implementations, and apply results. |
| [loom-chain](skills/loom-chain/SKILL.md) | Check and run goals across projects in order. |
| [loom-agents](skills/loom-agents/SKILL.md) | Add sessions, ACP/model agents, permissions, defaults, and instructions. |
| [loom-automation](skills/loom-automation/SKILL.md) | Set schedules, signed webhooks, and Slack/Discord bridges. |
| [loom-collaborate](skills/loom-collaborate/SKILL.md) | Share chats, work with teams, search sessions, and inspect audit records. |
| [loom-ops](skills/loom-ops/SKILL.md) | Diagnose health, limit resource usage, restart safely, and clean worktrees. |

## Requirements

- Loom **≥ 1.3.0**, npm package `@loompad/cli`, executable `loom`.
- Node **≥ 22.5** for Loom; Node 22 or newer for this repository's validator.
- Git for orchestra worktrees and chains; installed/authenticated agents or a
  configured model provider for the work you delegate.
- A POSIX shell for the installer. Skills are plain Markdown and require no npm dependencies.

Install Loom separately using its upstream instructions. Installing these skills
does not install Loom, start its daemon, or configure credentials.

## Install

Clone or download this repository, then run from its root:

```sh
sh install.sh --dry-run
sh install.sh
```

By default the installer copies all seven skill folders into each destination
that already exists:

| Agent | Destination |
| --- | --- |
| Claude Code | `~/.claude/skills/` |
| Codex | `~/.agents/skills/` |
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

Never put tokens/secrets in examples or commit `.loom/`. Preserve the restart,
bypass-mode, and chain-preflight safety guidance when editing.

## License

[MIT](LICENSE).
