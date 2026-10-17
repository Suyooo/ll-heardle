Some neat scripts to help prepare the songpool. Remember to install `requirements.txt` via `pip`.

- Remove `songpool.json` from this folder if it exists
- Fill the songpool in `00info.js`:
  - Use absolute paths to songs and covers on your disk in the `songUrl`/`coverUrl` properties
  - No need to fill the `listenOn` property, this is done automatically
- When done, run `prepare_songpool.py`
- `songpool.json` is created
  - The files from your disk are prepared as needed and saved to the folders in this project
  - YouTube links are automatically searched by the given song title (but do check them)
- Take the content from `songpool.json` and copypaste it into `00info.js` - done

`songpoolupdates.py` allows you to list all songs added for a given day, to update the `songpoolupdates.md` list.

`test_songpool.py` makes sure all needed files exist and stuff.
