# Drive Loom (1.3.0+)

Loom is a local-first control plane for coding agents: one daemon, shared memory,
and a repository write baton. Run project commands from the intended folder.
This repository teaches Loom operation. When maintaining these docs, read upstream
CLI source; do not run Loom against a user's live daemon just to verify examples.

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

Send concrete tasks with acceptance criteria and tests:

```sh
loom send --wait --json "Fix the parser regression and run the affected tests."
loom send -a codex --handoff --wait --json "Continue from the shared context."
```

The main chat follows the baton holder. Handoff changes the write lock, projects
memory, and can interrupt its current turn. Check active work first; use --handoff
only for an intended transfer. `loom handoff codex` transfers separately; --yes
skips confirmation. Parallel writers belong in orchestra worktrees.

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

For a parallel goal, inspect agents/limits, then start an orchestra using actual IDs:

```sh
loom orchestrate "Implement the feature and tests" -o codex -w opencode,grok-code -p 2 --solo --no-watch
loom orchestra RUN_ID --wait --json --progress
loom orchestra:reply RUN_ID "Keep the public API unchanged."
```

Inspect task counts and diffs. Wait exits 0 completed, 2 waiting_human, 124 timeout,
1 failure/other terminal state. Reviewing is not done. Apply/push only within scope.
Always run `loom chain plan.txt --check` before a long chain; read warnings too.
Use `loom config auto-restart off` for long unattended runs; record the prior setting.

Never run `loom up --restart --force` while someone's turns run.
Bypass means no sandbox: never enable it silently to fix a permission error.
Never paste tokens/secrets into prompts or commit `.loom/`.
Report the agent/run, result, test evidence, and reported cost; missing cost is not zero.

Read skills/loom-orchestrate/SKILL.md for parallel work, loom-chain for cross-project
runs, loom-agents for setup/access, loom-automation for triggers/bridges,
loom-collaborate for sharing/teams, and loom-ops for health/restarts/cleanup.
