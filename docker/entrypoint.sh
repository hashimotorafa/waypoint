#!/usr/bin/env bash
set -euo pipefail

# Remove a pre-existing server PID file so Rails can boot cleanly.
rm -f /app/tmp/pids/server.pid

exec "$@"
