#!/usr/bin/env bash
set -euo pipefail

ASPECT_RATIO=$(identify -format '%[fx:(h/w)]' "$1")
if [[ ASPECT_RATIO > 1 ]]; then
	convert "$1" \
		-bordercolor black -border 5000x0 \
		-gravity center -extent 1:1 \
		-scale 128x128 \
		"$2"
else
	convert "$1" \
		-gravity center -extent 1:1 \
		-scale 128x128 \
		"$2"
fi