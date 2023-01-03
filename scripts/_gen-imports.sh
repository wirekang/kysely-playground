#!/bin/bash

cd "$(dirname "$(dirname "$0")")" || exit 1

#PACKAGE_NAME=kysely
#JSON=src/gen/kysely-versions.json
#OUT=src/gen/import-kysely.ts

rm -f "$OUT"

echo "" >>"$OUT"
echo "export const IMPORT_MAP = {" >>"$OUT"
jq -r -c '.[]' "$JSON" | while read -r i; do
  PACKAGE_ALIAS=$(echo "$PACKAGE_NAME"_"$i" | sed 's/\./_/g')
  echo "'$PACKAGE_ALIAS': ()=> import('$PACKAGE_ALIAS')", >>"$OUT"
done

echo "} as const" >>"$OUT"

npx prettier --write "$OUT"
