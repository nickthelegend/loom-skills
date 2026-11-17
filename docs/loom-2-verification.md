# Loom 2 source verification

Reviewed against `/Volumes/Extreme SSD/Projects/loom-wt/v2int`, source HEAD
`1372d947fa65d25ecb828131566a7d237c317a01`. Read the CLI registrations, help strings,
and actions; no Loom command was executed against a live daemon. These are source
checks, not runtime integration tests. Local links identify the supplied checkout;
line numbers are a snapshot of this revision.

The table covers every Loom command documented in the skills, README, and AGENTS,
including retained commands. Each citation starts its registration/action block;
the adjoining option declarations and implementation were reviewed too. Names in
this table are prefixed with `loom` when used at the shell.

| Command(s) | Source | Verified flags/output or behavior |
| --- | --- | --- |
| `--version` | [src/cli/index.ts:91](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:91>) | Installed version; no daemon call. |
| `mcp-server` | [src/cli/index.ts:93](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:93>) | Stdio MCP entry point; transport implementation is cited below. |
| `connect` | [src/cli/index.ts:97](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:97>) | Agent argument; --dry-run and --list. |
| `up` | [src/cli/index.ts:243](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:243>) | Start/restart; --restart and --force busy/Desktop boundaries. |
| `status` | [src/cli/index.ts:310](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:310>) | --json: project array, or {daemon:null,projects:[]} when stopped. |
| `setup` | [src/cli/index.ts:349](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:349>) | --json checklist; calls the daemon helper. |
| `setup install` | [src/cli/index.ts:356](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:356>) | Positional kind; installs on the daemon machine and prints the version. |
| `try` | [src/cli/index.ts:364](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:364>) | --dir, --no-open, --agents; scripted demo and printed URL/project/agents. |
| `new` | [src/cli/index.ts:386](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:386>) | Name and --agent specs; Git initialization enabled by default. |
| `clone` | [src/cli/index.ts:399](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:399>) | URL and --name; waits for clone job, prints project ID. |
| `init` | [src/cli/index.ts:417](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:417>) | --gitignore; project registration and defaults. |
| `projects` | [src/cli/index.ts:441](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:441>) | --json project array. |
| `agents` | [src/cli/index.ts:470](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:470>) | --json project roster; machine view outside a project. |
| `accounts` | [src/cli/index.ts:488](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:488>) | --json returns {accounts}; metadata and sign-in status. |
| `accounts add` | [src/cli/index.ts:497](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:497>) | Kind, required --label, optional --dir; supports codex/claude-code. |
| `accounts login` | [src/cli/index.ts:507](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:507>) | Account ID; delegates interactive sign-in to the CLI. |
| `providers` | [src/cli/index.ts:522](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:522>) | Masked configuration and shell/daemon differences; no --json. |
| `btw` | [src/cli/index.ts:592](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:592>) | Question, --chat ID; side reply, six-minute wait, close in finally. |
| `config` | [src/cli/index.ts:708](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:708>) | auto-restart on/off, or inspect without a value. |
| `version` | [src/cli/index.ts:723](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:723>) | CLI/daemon build comparison; invokes ensureDaemon. |
| `open` | [src/cli/index.ts:758](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:758>) | Optional file[:line], --in editor/last; app when neither supplied. |
| `find` | [src/cli/index.ts:796](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:796>) | Local text; --all --json returns {hits,truncated}. |
| `intake` | [src/cli/index.ts:824](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:824>) | --github, --linear, --label, --start, --orchestra, --agent, --json issue array. |
| `prs` | [src/cli/index.ts:848](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:848>) | --json tracked PR array. |
| `prs:watch` | [src/cli/index.ts:861](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:861>) | PR number/URL, --chat ID/title. |
| `chat:title` | [src/cli/index.ts:875](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:875>) | Chat ID/title; explicit title or --auto, prints title. |
| `chat:create` | [src/cli/index.ts:891](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:891>) | --agent, --model, --effort, --json chat object. |
| `chat:move` | [src/cli/index.ts:905](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:905>) | Required --to, --no-wait, --json source chat/job result. |
| `chat:agent` | [src/cli/index.ts:921](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:921>) | Replacement binding, --model, --effort, --clear, --json. |
| `chat:branches` | [src/cli/index.ts:947](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:947>) | --chat, --json branches and sibling metadata. |
| `chat:edit`, `chat:retry` | [src/cli/index.ts:960](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:960>) | Conditional registrations; --chat; JSON printed without a --json flag. |
| `chat:branch` | [src/cli/index.ts:973](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:973>) | --chat, --preview, --rewind-files, --yes; explicit file-restore confirmation. |
| `chat:instructions` | [src/cli/index.ts:995](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:995>) | --chat and --clear; show without text. |
| `top` | [src/cli/index.ts:1018](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:1018>) | --watch, --json; JSON is a single resource snapshot. |
| `audit` | [src/cli/index.ts:1044](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:1044>) | --since duration and --json array. |
| `skills agents`, `skills install loom`, `skills uninstall loom` | [src/cli/index.ts:1283](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:1283>) | --agent, --target, --dry-run, --json; local branches return before ensureDaemon. |
| `mcp` | [src/cli/index.ts:1353](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:1353>) | Configures MCP servers consumed by Loom, distinct from mcp-server. |
| `compare` | [src/cli/index.ts:2272](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:2272>) | -w/--workers, --best, --wait, --keep; text output, no timeout or JSON flag. |
| `report` | [src/cli/index.ts:2308](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:2308>) | Exactly one of --checkpoint, --needs-input, --stuck, --done; required worker environment. |
| `orchestrate` | [src/cli/index.ts:2335](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:2335>) | -o/--orchestrator, -w/--workers, -p/--parallel, --rounds, --max-usd, --solo, --no-watch, --plan, --race, --apply, --push, --progress; no --json. |
| `orchestra` | [src/cli/index.ts:2387](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:2387>) | --json, --wait, --timeout, --progress, --watch; wait exit codes and workerModes distinction. |
| `orchestra:apply`, `orchestra:cleanup`, `orchestra:resume` | [src/cli/index.ts:2437](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:2437>) | Loop registrations; --task for race apply; cleanup has no dry-run. |
| `orchestra:reply` | [src/cli/index.ts:2463](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:2463>) | Run ID and text; answer or steer. |
| `team status`, `team auto` | [src/cli/index.ts:2824](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:2824>) | Status inspection; auto on can write team policy. |
| `team signin` | [src/cli/index.ts:2840](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:2840>) | Hosted sign-in; --paste declared at line 2817. |
| `team create` | [src/cli/index.ts:2853](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:2853>) | Name; creates a team. |
| `team invite` | [src/cli/index.ts:2860](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:2860>) | Private single-use link; --team selection. |
| `team join` | [src/cli/index.ts:2868](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:2868>) | Link; --team selection. |
| `team share`, `team unshare` | [src/cli/index.ts:2874](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:2874>) | Current project sharing; share accepts --team. |
| `team remove` | [src/cli/index.ts:2885](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:2885>) | GitHub login; --team; rotates the team key. |
| `team leave` | [src/cli/index.ts:3016](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:3016>) | --team selection passed to leave. |
| `runner status` | [src/cli/index.ts:3029](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:3029>) | Runner registration; status implementation at line 3073. |
| `agents:add` | [src/cli/index.ts:3259](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:3259>) | Positional kind; --as, --role, --model, --count, --account, --provider, --tools, --write, --run, --preset, --cmd. |
| `presence` | [src/cli/index.ts:3354](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:3354>) | Optional chat, --watch, --json snapshots; watch joins presence. |
| `share` | [src/cli/index.ts:3390](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:3390>) | --hours, --json, --list, --revoke; --live, --role, --name; distinct live/read-only output. |
| `chain` | [src/cli/index.ts:3438](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:3438>) | --check, --json, --progress, -o/-w/-p, --solo, --max-usd, --push, --keep-going; stdin/file and per-line overrides. |
| `bridge` | [src/cli/index.ts:3505](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:3505>) | slack/discord; --bot-token, --app-token, --user, --approvers, --channel, --project, --agent, --off, --remove; text status. |
| `triggers` | [src/cli/index.ts:3546](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:3546>) | --json returns {triggers,runs}. |
| `triggers:add` | [src/cli/index.ts:3565](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:3565>) | --every, --cron, --webhook, --name, --agent, --min-interval; URL/secret printed once. |
| `triggers:on`, `triggers:off` | [src/cli/index.ts:3592](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:3592>) | Loop registrations; preserve trigger settings/history. |
| `triggers:rm` | [src/cli/index.ts:3602](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:3602>) | Trigger ID; leaves thread. |
| `triggers:fire` | [src/cli/index.ts:3612](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:3612>) | --payload JSON fixture; run note, nonzero when rejected. |
| `defaults` | [src/cli/index.ts:3626](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:3626>) | --agents, --mode, --mode-for, --gitignore, --json; init defaults. |
| `limits` | [src/cli/index.ts:3671](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:3671>) | --turns, --min-free, --json; global settings and running/defaults output. |
| `agents:mode` | [src/cli/index.ts:3693](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:3693>) | Agent ID; auto/ask/bypass; inspect adapter meanings without a mode. |
| `agents:available` | [src/cli/index.ts:3718](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:3718>) | --json; available agents or machine view. |
| `models` | [src/cli/index.ts:3739](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:3739>) | Optional agent ID; --provider, --refresh, --free; no --json. |
| `steer` | [src/cli/index.ts:3870](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:3870>) | --chat ID/title, -a/--agent; steered or queued receipt with reason. |
| `send` | [src/cli/index.ts:3886](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:3886>) | --model, --effort, -a/--agent, --wait, --json, --timeout, --fresh, --handoff; no --chat; outcome/exit handling. |
| `chat` | [src/cli/index.ts:3960](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:3960>) | Interactive shared thread; /help in its action. |
| `handoff` | [src/cli/index.ts:4045](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:4045>) | Agent, -y/--yes; interrupt/write-baton warning. |
| `digest` | [src/cli/index.ts:4074](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:4074>) | --since in hours; text digest. |
| `memory` | [src/cli/index.ts:4422](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:4422>) | Shared memory document output. |
| `decision` | [src/cli/index.ts:4505](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:4505>) | Records the supplied agreed decision. |
| `log` | [src/cli/index.ts:4515](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:4515>) | -n/--limit and -f/--follow; project events. |
| `triage` | [src/cli/index.ts:4653](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:4653>) | Positional failure description, --agent, --project, --issue; saves/prints, never posts. |
| `doctor` | [src/cli/index.ts:4674](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:4674>) | --json, --fix; no daemon start, warnings versus failure exit. |
| `orchestra:clean` | [src/cli/index.ts:4725](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:4725>) | --dry-run; orphaned worktree directories, branches retained. |
| `clients` | [src/cli/index.ts:4740](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:4740>) | Paired-device list and --revoke for live guests. |
| `fleets` | [src/cli/index.ts:4894](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:4894>) | --json returns {fleets}; local LOOM_HOME storage. |
| `fleets:save` | [src/cli/index.ts:4905](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:4905>) | Name/spec; save or replace. |
| `fleets:rm` | [src/cli/index.ts:4913](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:4913>) | Name; removes saved definition. |
| `scoreboard` | [src/cli/index.ts:4921](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:4921>) | --all, --window 7d/30d/all, --json with byKindModel/byModel. |

## Native MCP tools and supporting behavior

The CLI registers the server at [src/cli/index.ts:93](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:93>). Native tool schemas
and calls live in the dedicated core module, not in CLI flag declarations.

| Tool | Source |
| --- | --- |
| `loom_status` | [src/core/mcp-server.ts:30](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/mcp-server.ts:30>) |
| `loom_projects` | [src/core/mcp-server.ts:32](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/mcp-server.ts:32>) |
| `loom_agents` | [src/core/mcp-server.ts:33](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/mcp-server.ts:33>) |
| `loom_add_agents` | [src/core/mcp-server.ts:37](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/mcp-server.ts:37>) |
| `loom_chats` | [src/core/mcp-server.ts:39](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/mcp-server.ts:39>) |
| `loom_read_chat` | [src/core/mcp-server.ts:40](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/mcp-server.ts:40>) |
| `loom_send` | [src/core/mcp-server.ts:42](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/mcp-server.ts:42>) |
| `loom_steer` | [src/core/mcp-server.ts:65](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/mcp-server.ts:65>) |
| `loom_orchestra_start` | [src/core/mcp-server.ts:67](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/mcp-server.ts:67>) |
| `loom_orchestra_status` | [src/core/mcp-server.ts:70](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/mcp-server.ts:70>) |
| `loom_compare` | [src/core/mcp-server.ts:72](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/mcp-server.ts:72>) |
| `loom_brain_search` | [src/core/mcp-server.ts:83](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/mcp-server.ts:83>) |
| `loom_remember` | [src/core/mcp-server.ts:85](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/mcp-server.ts:85>) |
| `loom_report` | [src/core/mcp-server.ts:87](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/mcp-server.ts:87>) |
| `loom_board` | [src/core/mcp-server.ts:90](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/mcp-server.ts:90>) |

| Contract | Source |
| --- | --- |
| Wait bounds, strict inputs and response/error contracts | [src/core/mcp-server.ts:13](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/mcp-server.ts:13>) |
| Tool catalog, waits, fleet arrays, reports and credentials | [docs/mcp-server.md:76](</Volumes/Extreme SSD/Projects/loom-wt/v2int/docs/mcp-server.md:76>) |
| Scoped write allowlist and denial of config/permission/delete routes | [src/daemon/server.ts:443](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/daemon/server.ts:443>) |
| Credential creation and cleanup | [src/core/loom-tools.ts:14](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/loom-tools.ts:14>) |
| Worker-specific report authorization and reports not completing tasks | [src/daemon/routes/orchestra.ts:56](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/daemon/routes/orchestra.ts:56>) |
| Stdio existing-daemon behavior and paired environment overrides | [src/cli/mcp-server.ts:7](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/mcp-server.ts:7>) |
| Connect aliases and OpenCode interactive registration (implementation overrides older prose) | [src/cli/connect.ts:5](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/connect.ts:5>) |
| Project loomTools validation/effective configuration | [src/daemon/runtime.ts:935](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/daemon/runtime.ts:935>) |
| Regular turn attachment | [src/daemon/runtime/turns.ts:548](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/daemon/runtime/turns.ts:548>) |
| Automatic worker attachment | [src/core/orchestra.ts:2528](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/orchestra.ts:2528>) |
| Fleet grammar, counts, storage and saved references | [src/core/fleets.ts:6](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/fleets.ts:6>) |
| Best-model evidence threshold and fallback | [src/core/scoreboard.ts:180](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/scoreboard.ts:180>) |
| Comparison 2–8 validation and 30-day selection | [src/core/orchestra.ts:1233](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/orchestra.ts:1233>) |
| Run JSON task counts, workerDetails and taskDetails | [src/cli/index.ts:1941](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:1941>) |
| Chain bracket parser | [src/cli/index.ts:2019](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:2019>) |
| Chain preflight including fleet expansion and per-project scoreboard | [src/cli/index.ts:2149](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:2149>) |
| Apply secret scan and merge/push recovery | [src/cli/index.ts:2100](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts:2100>) |
| Triage redaction, save-only collection, diagnosis chat | [src/cli/triage.ts:73](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/triage.ts:73>) |
| Bundled skill destinations and management markers | [src/core/agent-skills.ts:66](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/core/agent-skills.ts:66>) |
| Trigger owner/device authorization | [src/daemon/routes/triggers.ts:18](</Volumes/Extreme SSD/Projects/loom-wt/v2int/src/daemon/routes/triggers.ts:18>) |
| Demo and setup behavior | [README.md:54](</Volumes/Extreme SSD/Projects/loom-wt/v2int/README.md:54>) |
| Loom 2 feature descriptions and bridge approval change | [CHANGELOG.md:8](</Volumes/Extreme SSD/Projects/loom-wt/v2int/CHANGELOG.md:8>) |

## Validation

- `node scripts/validate.mjs`: all eight skills pass.
- `LOOM_CLI_SRC="/Volumes/Extreme SSD/Projects/loom-wt/v2int/src/cli/index.ts" node scripts/validate.mjs`: all eight skills pass command-name checking.
- Focused validator checks cover conditional/loop registrations, root versus child commands, positional values named `loom`, unknown commands, and reported line numbers.
- The skill-creator quick validator accepts `skills/loom-mcp`; local documentation links and requirement/count wording were checked.
- `git diff --check`: no whitespace errors.

Flags and behavior were reviewed manually; the repository validator checks command
names only. No source-checkout files were changed and no commit was created.
