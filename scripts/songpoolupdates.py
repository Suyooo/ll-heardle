import json, os, sys

if len(sys.argv) < 2:
	print("Usage: songpoolupdates.py [minimum startOnDay]")
	exit(1)

abspath = os.path.abspath(__file__)
dname = os.path.dirname(abspath)
os.chdir(dname)

with open("songpool.json", "r") as jsonf:
	j = json.load(jsonf)

cutoff = int(sys.argv[1])
for jj in j:
	if jj["startOnDay"] >= cutoff:
		if jj["titleEn"] == jj["titleJa"]:
			print("-", jj["titleEn"])
		else:
			print("-", jj["titleEn"], "/", jj["titleJa"])
