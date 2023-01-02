#!/bin/bash

cd "$(dirname "$(dirname "$0")")" || exit 1

JSON_OUT=src/gen/kysely-versions.json
TYPES_OUT_DIR=src/gen/types
OUT=$JSON_OUT ./scripts/_gen-kysely-versions.sh || exit 1

jq -r -c '.[]' $JSON_OUT | while read -r i; do
  PACKAGE_NAME=kysely PACKAGE_VERSION=$i OUT_DIR=$TYPES_OUT_DIR ./scripts/_gen-type-bundle.sh
done

PACKAGE_NAME=kysely JSON=$JSON_OUT OUT=src/gen/kysely-modules.ts ./scripts/_gen-imports.sh
