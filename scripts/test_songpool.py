#!/usr/bin/env python3

"""Test all filenames in the songpool entries for validity."""

import json
import os
import sys
from typing import NotRequired, TypedDict, cast

import chompjs  # pyright: ignore[reportMissingTypeStubs]
import filetype  # pyright: ignore[reportMissingTypeStubs]


abspath = os.path.abspath(__file__)
dname = os.path.dirname(abspath)
os.chdir(dname)


class SongPoolEntryListenOn(TypedDict):
	"""External links for songpool entries."""

	spotify: NotRequired[str]
	youtube: NotRequired[str]


class SongPoolEntry(TypedDict):
	"""Objects in the songpool array."""

	# pylint: disable=invalid-name

	songUrl: str
	coverUrl: str
	startOnDay: int
	titleEn: str
	artistEn: str
	titleJa: str
	artistJa: str
	listenOn: SongPoolEntryListenOn


def run():
	"""Test songpool."""

	if os.path.exists("songpool.json"):
		with open("songpool.json", "r", encoding="utf-8") as json_file:
			songpool = cast(list[SongPoolEntry], json.load(json_file))
	else:
		with open("../js/00info.js", "r", encoding="utf-8") as js_file:
			songpool = cast(
				list[SongPoolEntry],
				list(
					chompjs.parse_js_objects(  # pyright: ignore[reportUnknownMemberType]
						js_file.read()
					)
				)[-1],
			)

	for song in songpool:
		print(song["titleEn"])
		if not song["songUrl"]:
			if song["startOnDay"] < 999999:
				print("ERROR: Song with no file must have startOnDay set absurdly high")
				sys.exit(1)
			continue

		if not song["coverUrl"]:
			print("ERROR: No cover")
			sys.exit(1)

		songpath = os.path.join("..", song["songUrl"])
		if not os.path.exists(songpath):
			print("ERROR: The song file does not exist")
			sys.exit(1)
		songtype = filetype.guess_mime(  # pyright: ignore[reportUnknownMemberType]
			songpath
		)
		if songtype is None or songtype != "audio/mpeg":
			print("ERROR: The song file is not a MP3")
			sys.exit(1)

		coverpath = os.path.join("..", song["coverUrl"])
		if not os.path.exists(coverpath):
			print("ERROR: The cover file does not exist")
			sys.exit(1)
		covertype = filetype.guess_mime(  # pyright: ignore[reportUnknownMemberType]
			coverpath
		)
		if covertype is None or covertype != "image/png":
			print("ERROR: The cover file is not a PNG")
			sys.exit(1)

	print("")
	print("All good ✅")


if __name__ == "__main__":
	run()
