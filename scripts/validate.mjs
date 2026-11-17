#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const report = (file, message) => errors.push(`${path.relative(root, file)}: ${message}`);

// The required fields support plain/quoted scalars and YAML folded/literal blocks.
// This deliberately validates skill metadata, not arbitrary YAML documents.
function field(frontmatter, key) {
  const lines = frontmatter.split('\n');
  const matches = lines.flatMap((line, index) =>
    line.startsWith(`${key}:`) ? [index] : []);
  if (matches.length !== 1) throw new Error(`expected exactly one ${key} field`);
  const index = matches[0];
  const raw = lines[index].slice(key.length + 1).trim();
  if (/^[>|][-+]?$/.test(raw)) {
    const block = [];
    for (let i = index + 1; i < lines.length; i++) {
      if (lines[i].trim() && !/^\s/.test(lines[i])) break;
      block.push(lines[i].trim());
    }
    return block.join(raw.startsWith('>') ? ' ' : '\n').trim();
  }
  if (raw.startsWith('"')) {
    // JSON double-quoted scalars are a portable subset of YAML strings.
    try { return JSON.parse(raw); }
    catch { throw new Error(`${key} has an invalid double-quoted scalar`); }
  }
  if (raw.startsWith("'")) {
    if (!/^'(?:[^']|'')*'$/.test(raw)) throw new Error(`${key} has an invalid quoted scalar`);
    return raw.slice(1, -1).replace(/''/g, "'");
  }
  if (/^[\[{]/.test(raw) || /:\s/.test(raw)) {
    throw new Error(`${key} must be a scalar string; quote values containing ': '`);
  }
  return raw.replace(/\s+#.*$/, '').trim();
}

function validateSkill(file, folder) {
  const text = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const frontmatter = /^---\n([\s\S]*?)\n---(?:\n|$)/.exec(text);
  if (!frontmatter) {
    report(file, 'missing YAML frontmatter delimited by --- at the start');
    return;
  }
  for (const key of ['name', 'description']) {
    try {
      const value = field(frontmatter[1], key);
      if (typeof value !== 'string') throw new Error(`${key} must be a string`);
      if (key === 'name') {
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
          report(file, 'name must be lowercase kebab-case');
        }
        if (value !== folder) report(file, `name '${value}' must equal folder '${folder}'`);
      } else if ([...value].length < 20 || [...value].length > 1024) {
        report(file, 'description must be 20–1024 characters');
      }
    } catch (error) { report(file, error.message); }
  }
  if (!text.slice(frontmatter[0].length).trim()) report(file, 'skill body is empty');
}

// Read registration text only. Never import/evaluate the upstream CLI or launch Loom.
// Root registrations use program.command(). Child commands (queueCmd, serversCmd)
// must not accidentally become valid root commands such as "loom add".
function rootCommands(source) {
  const commands = new Set();
  const loopPattern = /for\s*\(\s*const\s+(\[[^\]]+\]|\w+)\s+of\s+(\[[\s\S]*?\])\s*(?:as\s+const\s*)?\)\s*\{/g;
  const loops = [...source.matchAll(loopPattern)];
  // Loom 2 registers chat:edit/chat:retry with a conditional expression.
  // Accept only literal branches at root registration sites; never evaluate TS.
  const conditional = /\bprogram\s*\.command\(\s*\w+\s*===\s*["'][^"']+["']\s*\?\s*(["'])([^"']+)\1\s*:\s*(["'])([^"']+)\3\s*\)/g;
  for (const match of source.matchAll(conditional)) {
    commands.add(match[2].split(/\s/)[0]);
    commands.add(match[4].split(/\s/)[0]);
  }
  const registration = /\bprogram\s*\.command\(\s*(["'`])([\s\S]*?)\1/g;
  for (const match of source.matchAll(registration)) {
    let names = [match[2].split(/\s/)[0]];
    const variable = /\$\{(\w+)\}/.exec(names[0]);
    if (variable) {
      // Loom registers orchestra actions and trigger/review verbs in literal loops.
      const loop = loops.filter((item) => item.index < match.index &&
        item[1].replace(/[\[\]\s]/g, '').split(',')[0] === variable[1]).at(-1);
      if (!loop) throw new Error(`cannot resolve command template '${names[0]}' from source`);
      const values = loop[1].startsWith('[')
        ? [...loop[2].matchAll(/\[\s*["']([^"']+)["']/g)].map((item) => item[1])
        : [...loop[2].matchAll(/["']([^"']+)["']/g)].map((item) => item[1]);
      if (!values.length) throw new Error(`no literal values found for '${names[0]}'`);
      names = values.map((value) => names[0].replace(variable[0], value));
    }
    for (const name of names) commands.add(name);
  }
  if (/\.version\s*\(/.test(source)) commands.add('--version');
  if (!commands.size) throw new Error('no root .command(...) registrations found');
  return commands;
}

function skillFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules'].includes(entry.name)) continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...skillFiles(file));
    else if (entry.isFile() && entry.name === 'SKILL.md') files.push(file);
  }
  return files;
}

function checkCommands(file, commands) {
  const text = fs.readFileSync(file, 'utf8');
  // Match both inline code spans and triple-backtick fenced examples.
  for (const span of text.matchAll(/(`+)([\s\S]*?)\1(?!`)/g)) {
    // Commands start a span/line or follow a shell separator. A positional value
    // named loom (skills install loom, intake --label loom) is not an invocation.
    for (const mention of span[2].matchAll(/(?:^|[\r\n;&|])[ \t]*loom[ \t\r\n]+([a-z][a-z0-9:-]*|--[a-z-]+)/g)) {
      if (!commands.has(mention[1])) {
        const offset = span.index + span[1].length + mention.index + mention[0].indexOf('loom');
        const line = text.slice(0, offset).split('\n').length;
        report(file, `line ${line}: unknown Loom command '${mention[1]}' in backtick code`);
      }
    }
  }
}

try {
  const skillsDir = path.join(root, 'skills');
  const folders = fs.readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory()).sort((a, b) => a.name.localeCompare(b.name));
  if (!folders.length) report(skillsDir, 'no skill directories found');
  for (const folder of folders) {
    const file = path.join(skillsDir, folder.name, 'SKILL.md');
    if (!fs.existsSync(file)) report(file, 'missing SKILL.md');
    else validateSkill(file, folder.name);
  }
  if (process.env.LOOM_CLI_SRC) {
    const source = fs.readFileSync(process.env.LOOM_CLI_SRC, 'utf8');
    const commands = rootCommands(source);
    const files = skillFiles(root);
    for (const file of files) checkCommands(file, commands);
    console.log(`Checked commands in ${files.length} SKILL.md files against ${process.env.LOOM_CLI_SRC}`);
  } else {
    console.log('Command check skipped: set LOOM_CLI_SRC to Loom src/cli/index.ts to enable it.');
  }
  if (errors.length) {
    for (const error of errors) console.error(`ERROR ${error}`);
    console.error(`Validation failed: ${errors.length} error(s).`);
    process.exitCode = 1;
  } else {
    console.log(`Validated ${folders.length} skills successfully.`);
  }
} catch (error) {
  console.error(`Validation failed: ${error.message}`);
  process.exitCode = 1;
}
