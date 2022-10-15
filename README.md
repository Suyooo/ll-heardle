# Love Live Heardle

Runs the original Heardle site, but using HTML5 Audio elements instead of Soundcloud embeds.  
This project uses the site layout of the original Heardle by [Omakase](https://omakase.studio/).

This is set up as a *generated static site* on Glitch, which means that after you edit a file, some scripts run to
combine all the JavaScript and compress all the files and make it all neat. And those resulting files are treated as
a static site, which means it goes fast and never goes to sleep and doesn't count against project hours.

This build script will automatically run a few minutes after you close out of the Glitch editor. That means that if
you edit something, you won't immediately see the changes on the site! If you want to check your edits without
closing the editor and waiting for the scripts to run, open the Terminal at the bottom and type `npm run build`.

`js/00info.js` is the file you'll probably edit the most - it contains the news post info and the list for the song
pool - so I prefixed the 00 to have it at the top. The news post info is hopefully self-explanatory enough, for the
song pool, check the comment at the very bottom of the file.