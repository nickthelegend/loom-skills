# Drive Loom (Loom ≥ 2.0.0)

Loom is a local-first control plane for coding agents: one daemon, shared memory,
and a repository write baton. Run project commands from the intended folder.
This repository teaches Loom operation. When maintaining these docs, read upstream
CLI source; do not run Loom against a user's live daemon just to verify examples.
Verify command flags and output against src/cli/index.ts and its help strings;
for native tools also read docs/mcp-server.md and src/core/mcp-server.ts.

Inspect before acting:

```sh
loom --version
loom status --json
loom doctor --json
loom version
loom projects --json
loom agents --json
```

Status and doctor do not start the daemon. Version and most project commands can
start it or replace an idle older build. Status JSON is a project array when up,
or {daemon:null,projects:[]} when down. Agents JSON is a roster in a project;
outside one it describes the machine. Use actual IDs, not guessed kind names.
Use `loom init --gitignore` when setting up the intended project is in scope.
Use `loom up` to start a stopped daemon when needed.

Use `loom try --no-open` for the offline scripted demo (real edits, simulated usage).
`loom setup --json` shows Get started progress; `loom setup install codex` installs
a supported CLI on the daemon's machine, with sign-in separate. Inspect bundled
skills with `loom skills agents --json`; preview installation with
`loom skills install loom --agent codex --dry-run` before omitting `--dry-run`.
`loom connect codex --dry-run`, then `loom connect codex`, registers Loom MCP;
`loom connect --list` inspects connections. The server does not start the daemon.
Use skills/loom-mcp/SKILL.md when native loom_* tools are attached. Project
`loomTools: true` enables them next turn; MCP-capable workers receive them automatically.

Send concrete tasks with acceptance criteria and tests:

```sh
loom send --wait --json "Fix the parser regression and run the affected tests."
loom send -a codex --handoff --wait --json "Continue from the shared context."
```

The main chat follows the baton holder. Handoff changes the write lock, projects
memory, and can interrupt its current turn. Check active work first; use --handoff
only for an intended transfer. `loom handoff codex` transfers separately; --yes
skips confirmation. Parallel writers belong in orchestra worktrees.
`loom steer "Keep the public API unchanged" --chat main` steers an active turn or
queues input with a reason. Do not resend a queued correction.
`loom btw "Explain the approach" --chat main` asks a private read-only side question.

Send --wait exits: 0 done; 1 failed; 2 needs input; 75 daemon interruption;
124 wait timeout. Parse the outcome JSON on stdout; keep stderr separate.
Read questions/errors. After interruption inspect partial work before continuing.
A timeout leaves the agent working: follow logs instead of duplicating the task.
`--timeout 3600` extends the wait; `--fresh` deliberately resets the chat session.

```sh
loom log -n 40
loom digest --since 12
loom memory
loom find "parser regression"
loom find --all --json "parser regression"
```

`loom chat` is the interactive shared thread; use its /help. There is no send
--chat option here. Other chats can pin agents without taking the write baton.
`loom decision "Keep the API backward compatible."` records an agreed decision.
Local find prints text; JSON is implemented on its --all path.
Use loom-agents for accounts, chat bindings, and per-message model/effort overrides;
use loom-collaborate for presence, moves, and branches. History switching does not
restore files unless --rewind-files is explicitly requested and its diff reviewed.

For a parallel goal, inspect agents/limits, then start an orchestra using actual IDs:

```sh
loom orchestrate "Implement the feature and tests" -o codex -w opencode,grok-code -p 2 --solo --no-watch
loom orchestra RUN_ID --wait --json --progress
loom orchestra:reply RUN_ID "Keep the public API unchanged."
```

Inspect task counts and diffs. Wait exits 0 completed, 2 waiting_human, 124 timeout,
1 failure/other terminal state. Reviewing is not done. Apply/push only within scope.
Fleet specs accept agent@model:effort xN; quote spaces. Use `loom fleets --json`
and `loom scoreboard --window 30d --json` before reusing a saved fleet or selecting
`-w best:2`. `loom compare "Fix the parser and test it" -w codex,opencode --wait`
starts real work in separate worktrees; --keep applies one and discards the others.
Confirm large fleets unless their size is already authorized.
Worker `loom report --checkpoint "Tests passed"` records progress without completing its task.
Always run `loom chain plan.txt --check` before a long chain; read warnings too.
Use `loom config auto-restart off` for long unattended runs; record the prior setting.

Never run `loom up --restart --force` while someone's turns run.
Bypass means no sandbox: never enable it silently to fix a permission error.
Never paste tokens/secrets into prompts or commit `.loom/`.
Report the agent/run, result, test evidence, and reported cost; missing cost is not zero.

Read skills/loom-orchestrate/SKILL.md for parallel work, loom-chain for cross-project
runs, loom-agents for accounts/models/access, loom-automation for intake/triggers/bridges,
loom-collaborate for presence/branches/moves/teams, loom-ops for setup/triage/health,
and loom-mcp for native tools and per-turn credentials.
