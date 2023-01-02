#!/bin/bash

cd "$(dirname "$(dirname "$0")")" || exit 1

# PACKAGE_NAME=kysely
# PACKAGE_VERSION=0.23.3
# OUT_DIR=src/gen/types

PACKAGE_ALIAS=$(echo "$PACKAGE_NAME"_"$PACKAGE_VERSION" | sed 's/\./_/g')
mkdir -p "$OUT_DIR" || exit 1
rm -rf temp || exit 1
mkdir -p temp || exit 1
yarn add "$PACKAGE_ALIAS"@npm:"$PACKAGE_NAME"@"$PACKAGE_VERSION" || exit 1
cp -r ./node_modules/"$PACKAGE_ALIAS"/dist/esm temp/"$PACKAGE_ALIAS" || exit 1
npx rollup --plugin rollup-plugin-dts --format=es --file="$OUT_DIR"/"$PACKAGE_ALIAS".d.ts -- temp/"$PACKAGE_ALIAS"/index.d.ts || exit 1
rm -rf temp
