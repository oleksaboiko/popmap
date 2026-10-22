#!/usr/bin/env bash
set -euo pipefail

script_directory="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
port="${1:-8000}"

cd "$script_directory"
printf 'Population map: http://127.0.0.1:%s/\nPress Ctrl+C to stop.\n' "$port"
python3 -m http.server "$port" --bind 127.0.0.1
