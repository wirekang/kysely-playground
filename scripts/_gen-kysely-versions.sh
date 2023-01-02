#!/bin/bash

cd "$(dirname "$(dirname "$0")")" || exit 1

# OUT = src/gen/kysely-versions.json

yarn info kysely versions --json | jq .data[-4:]  | jq 'reverse' > "$OUT" || exit 1
