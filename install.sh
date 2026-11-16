#!/bin/sh
set -eu

usage() {
    cat <<'EOF'
Usage: sh install.sh [--all] [--link] [--uninstall] [--dry-run]
  --all        Include all three agent skill directories; create them on install.
  --link       Symlink skill folders to this checkout instead of copying.
  --uninstall  Remove managed copies/links only; never create directories.
  --dry-run    Print planned actions without changing files.
  --help       Show this help.
By default, install into existing ~/.claude/skills, ~/.agents/skills, ~/.grok/skills.
EOF
}

all=0
link=0
uninstall=0
dry_run=0
for arg in "$@"; do
    case "$arg" in
        --all) all=1 ;;
        --link) link=1 ;;
        --uninstall) uninstall=1 ;;
        --dry-run) dry_run=1 ;;
        --help|-h) usage; exit 0 ;;
        *) printf 'Unknown option: %s\n' "$arg" >&2; usage >&2; exit 2 ;;
    esac
done

repo_dir=$(CDPATH='' cd -P "$(dirname "$0")" && pwd)
marker=.loom-skills-managed
signature='loom-skills installer v1'
stage=
trap 'if [ -n "$stage" ]; then rm -rf "$stage"; fi' 0
trap 'exit 1' HUP INT TERM

if [ ! -d "$repo_dir/skills" ]; then
    printf 'Missing skills directory: %s/skills\n' "$repo_dir" >&2
    exit 1
fi
if [ -z "${HOME:-}" ]; then
    printf 'HOME must be set to your home directory.\n' >&2
    exit 1
fi

# Never follow a destination symlink while deciding whether a copy is ours.
managed() {
    if [ -L "$dest" ]; then
        [ "$(readlink "$dest")" = "$source_dir" ]
    elif [ -d "$dest" ] && [ -f "$dest/$marker" ] && [ ! -L "$dest/$marker" ]; then
        [ "$(cat "$dest/$marker")" = "$signature" ]
    else
        return 1
    fi
}

destinations=0
skills_seen=0
errors=0
for target in "$HOME/.claude/skills" "$HOME/.agents/skills" "$HOME/.grok/skills"; do
    if [ -e "$target" ] && [ ! -d "$target" ]; then
        printf 'Refusing non-directory destination: %s\n' "$target" >&2
        errors=1
        continue
    fi
    if [ ! -d "$target" ]; then
        if [ "$all" -eq 0 ] || [ "$uninstall" -eq 1 ]; then
            printf 'Skip absent destination: %s\n' "$target"
            continue
        fi
        printf 'Create directory: %s\n' "$target"
        if [ "$dry_run" -eq 0 ]; then mkdir -p "$target"; fi
    fi
    destinations=$((destinations + 1))
    for source_dir in "$repo_dir"/skills/*; do
        [ -d "$source_dir" ] || continue
        if [ ! -f "$source_dir/SKILL.md" ]; then
            printf 'Missing SKILL.md: %s\n' "$source_dir" >&2
            errors=1
            continue
        fi
        skills_seen=$((skills_seen + 1))
        name=${source_dir##*/}
        dest=$target/$name
        exists=0
        if [ -e "$dest" ] || [ -L "$dest" ]; then
            exists=1
            if ! managed; then
                printf 'Refusing unmanaged entry (move it yourself): %s\n' "$dest" >&2
                errors=1
                continue
            fi
        fi

        if [ "$uninstall" -eq 1 ]; then
            if [ "$exists" -eq 1 ]; then
                printf 'Remove managed skill: %s\n' "$dest"
                if [ "$dry_run" -eq 0 ]; then rm -rf "$dest"; fi
            else
                printf 'Already absent: %s\n' "$dest"
            fi
        elif [ "$link" -eq 1 ]; then
            if [ -L "$dest" ]; then
                printf 'Already linked: %s -> %s\n' "$dest" "$source_dir"
                continue
            fi
            printf 'Link: %s -> %s\n' "$dest" "$source_dir"
            if [ "$dry_run" -eq 0 ]; then
                if [ "$exists" -eq 1 ]; then rm -rf "$dest"; fi
                ln -s "$source_dir" "$dest"
            fi
        else
            printf 'Copy: %s -> %s\n' "$source_dir" "$dest"
            if [ "$dry_run" -eq 0 ]; then
                # Prepare the complete replacement before removing an old managed copy.
                stage=$(mktemp -d "$target/.loom-skills.XXXXXX")
                cp -R "$source_dir/." "$stage/"
                printf '%s\n' "$signature" >"$stage/$marker"
                if [ "$exists" -eq 1 ]; then rm -rf "$dest"; fi
                mv "$stage" "$dest"
                stage=
            fi
        fi
    done
done

if [ "$destinations" -eq 0 ]; then
    printf 'No destinations selected. Create an agent skills directory or use --all.\n'
elif [ "$skills_seen" -eq 0 ]; then
    printf 'No skill folders found in %s/skills.\n' "$repo_dir" >&2
    errors=1
fi
if [ "$dry_run" -eq 1 ]; then printf 'Dry run: no files changed.\n'; fi
exit "$errors"
