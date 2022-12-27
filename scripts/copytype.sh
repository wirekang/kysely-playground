#!/bin/bash

cd "$(dirname "$(dirname "$0")}")" || exit 1

TMP=tmp
OUT=public/copytype
rm -rf $TMP
mkdir -p $TMP/kysely
cd node_modules/kysely/dist/esm || exit 1
find . -name "*.d.ts" -exec cp --parent {} ../../../../$TMP/kysely \;
cd ../../../../ || exit 1
cd $TMP || exit 1
find . -name "*.d.ts" -print > "files.txt"
cd .. || exit 1
rm -rf $OUT
mv $TMP public/copytype
