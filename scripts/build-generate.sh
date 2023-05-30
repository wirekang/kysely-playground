#!/bin/bash

cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" || exit
cd .. || exit 1
cd generator || exit 1
GOOS=linux GOARCH=amd64 go build -o temp ./cmd/generate/main.go || exit 1
mv temp ../bin/generate || exit 1
