# Love Live Heardle

Runs the original Heardle site, but using HTML5 Audio elements instead of Soundcloud embeds.  
This project uses the site layout of the original Heardle by [Omakase](https://omakase.studio/), which is hereby
explicitly excluded from the GPL3 License the rest of the project is licensed under.

This is a very barebones project with mostly vanilla JS, since it was originally made to be easy to setup and edit
without having to deal with any frameworks. Enjoy.

- Install NodeJS on your PC
- Install requirements: `npm ci`
- After each update: `npm run build`
- Then upload the contents of the `build` folder to your nearest server, or run `npm run start` to start a local server for testing

`js/00info.js` is the file you'll probably edit the most - it contains the news post info and the list for the song
pool. The news post info is hopefully self-explanatory enough, for the song pool, here's some additional hints:

- startOnDay is a number representing the day (same as the one shown when copying share info after clearing a Heardle) when the song should be added to the pool of possible daily Heardles. This has to be done so that the RNG is guaranteed to deliver the same result, no matter when players visit the site.
- For new songs, make sure to set startOnDay to _at least_ three days after the current day, or the current day's Heardle **WILL** break for players! (Since players in different timezones might already have reached that day and you change the pool on them mid-day)
- Same thing happens if you remove a song, so **never remove a song**!
- For testing: If you want to make sure everything worked, you can check the song pool via your browser's developer tools. Open it with F12, head to the Console tab, and access the `SONGPOOL` object. For example: `SONGPOOL.at(-1)` will show the last song in the pool (the one right above this comment), so you can check whether the pool updated correctly and the new song you just added is really in there. (Remember to run the build script)
