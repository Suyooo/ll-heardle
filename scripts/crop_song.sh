#!/usr/bin/env bash
set -euo pipefail

ffmpeg -y \
	-i "$1" \
	-vn -map_metadata 0:s:0 \
	-metadata "title=Love Live! Heardle!" \
	-metadata "artist=???" \
	-af "silenceremove=start_periods=1:start_silence=0:start_threshold=0" \
	-codec:a libmp3lame -q:a 6 \
	"$2"