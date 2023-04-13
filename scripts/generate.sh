#!/bin/bash

cd "$(dirname "$(dirname "$0")")" || exit 1


GEN_DIR=src/generated
JSON_OUT=$GEN_DIR/versions.json
TYPES_OUT_DIR=$GEN_DIR/types
MODULES_OUT=$GEN_DIR/kysely-modules.ts

yarn info kysely versions --json | jq .data[-20:]  | jq 'reverse' > "$JSON_OUT" || exit 1

jq -r -c '.[]' $JSON_OUT | while read -r VERSION; do
  ALIAS=$(echo kysely_"$VERSION" | sed 's/\./_/g')
  mkdir -p "$TYPES_OUT_DIR" || exit 1
  rm -rf temp || exit 1
  mkdir -p temp || exit 1
  yarn add "$ALIAS"@npm:kysely@"$VERSION" || exit 1
  cp -r ./node_modules/"$ALIAS"/dist/esm temp/"$ALIAS" || exit 1
  npx rollup --plugin rollup-plugin-dts --format=es --file="$TYPES_OUT_DIR"/"$ALIAS".d.ts -- temp/"$ALIAS"/index.d.ts || exit 1
  rm -rf temp
done


rm -f $MODULES_OUT || exit 1

echo "" >>$MODULES_OUT || exit 1
echo "export const IMPORT_MAP = {" >>$MODULES_OUT
jq -r -c '.[]' "$JSON_OUT" | while read -r VERSION; do
  ALIAS=$(echo kysely_"$VERSION" | sed 's/\./_/g')
  echo "'$ALIAS': ()=> import('$ALIAS')", >>$MODULES_OUT || exit 1
done

echo "} as const" >>$MODULES_OUT || exit 1

npx prettier --write $MODULES_OUT || exit 1
