#!/usr/bin/env python3

"""For all songs that have a YT video but no files defined, grab the files from YT."""

import json
import tempfile
import os
import re
import shutil
import subprocess
import sys
from typing import NotRequired, TypedDict, cast

import chompjs  # pyright: ignore[reportMissingTypeStubs]
from yt_dlp import YoutubeDL  # pyright: ignore[reportMissingTypeStubs]


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
	"""Run songpool file download."""
	_ = subprocess.run(["mkdir", "-p", "../covers"], check=True)
	_ = subprocess.run(["mkdir", "-p", "../songs"], check=True)

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

	for idx, song in enumerate(songpool):
		if song["songUrl"].startswith("songs/") and song["coverUrl"].startswith(
			"covers/"
		):
			continue
		print(song["titleEn"], "...")
		download_from_yt = True
		skip_download = False
		writethumbnail = False

		with tempfile.TemporaryDirectory() as tmpdir:
			# If songUrl is unset, download from the YouTube link
			# Otherwise, if the file is not in the songs/ folder, copy the song from the given path
			if song["songUrl"] != "":
				download_from_yt = False
				skip_download = True
				if not song["songUrl"].startswith("songs/"):
					ext = os.path.splitext(song["songUrl"])[1]
					_ = shutil.copyfile(
						song["songUrl"], os.path.join(tmpdir, "song." + ext)
					)

			# If coverUrl is unset, download from the YouTube link
			# Otherwise, if the file is not in the covers/ folder, copy the cover from the given path
			if song["coverUrl"] == "":
				download_from_yt = True
				writethumbnail = True
			elif not song["coverUrl"].startswith("covers/"):
				ext = os.path.splitext(song["coverUrl"])[1]
				_ = shutil.copyfile(
					song["coverUrl"], os.path.join(tmpdir, "thumb." + ext)
				)

			if download_from_yt:
				if not "youtube" in song["listenOn"]:
					print(song["titleEn"], "has no YT video, skipped")
				else:
					with YoutubeDL(
						{
							"format": "bestaudio",
							"outtmpl": {
								"default": os.path.join(tmpdir, "song.%(ext)s"),
								"thumbnail": os.path.join(tmpdir, "thumb"),
							},
							"skip_download": skip_download,
							"writethumbnail": writethumbnail,
						}
					) as ydl:
						ytdl_exit_code: int = (
							ydl.download(  # pyright: ignore[reportUnknownMemberType]
								[song["listenOn"]["youtube"]]
							)
						)
					if ytdl_exit_code != 0:
						print("Failed download for", song["titleEn"])
						sys.exit()

			outname = str(idx) + "_" + re.sub("[^0-9a-z]+", "", song["titleEn"].lower())

			for file in os.listdir(tmpdir):
				if file.startswith("song."):
					songpath = os.path.join("songs", outname + ".mp3")
					_ = subprocess.run(
						[
							"./crop_song.sh",
							os.path.join(tmpdir, file),
							os.path.join("..", songpath),
						],
						check=True,
					)
					song["songUrl"] = songpath
				elif file.startswith("thumb."):
					coverpath = os.path.join("covers", outname + ".png")
					_ = subprocess.run(
						[
							"./crop_cover.sh",
							os.path.join(tmpdir, file),
							os.path.join("..", coverpath),
						],
						check=True,
					)
					song["coverUrl"] = coverpath

			with open("songpool.json", "w", encoding="utf-8") as json_out:
				json.dump(songpool, json_out, indent="\t")


if __name__ == "__main__":
	run()
