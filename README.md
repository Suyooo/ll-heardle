# Love Live Heardle

Runs the original Heardle site, but using HTML5 Audio elements instead of Soundcloud embeds.  
This project uses the site layout of the original Heardle by [Omakase](https://omakase.studio/), which does not fall
under the GPL3 License the rest of the project is licensed under.

This is set up as a *generated static site* on Glitch, which means that after you edit a file, some scripts run to
bundle all the JavaScript and minimize all the files and make it all neat. And those resulting files are treated as
a static site, which means it goes fast and never goes to sleep and doesn't count against project hours.

That build script will automatically run a few minutes after you close out of the Glitch editor. That means that if
you edit something, you won't immediately see the changes on the site! If you want to check your edits without
closing the editor and waiting for the scripts to run, click the Terminal button in the footer below the editor, and
type `npm run build; refresh`.

`js/00info.js` is the file you'll probably edit the most - it contains the news post info and the list for the song
pool - so I prefixed it with `00` to always have it at the top of the folder. The news post info is hopefully
self-explanatory enough, for the song pool, check the comment at the very bottom of the file.

The folder is also linked with the Git repository, which means that if I do updates, you can put them on Glitch with a
single command instead of having to copypaste/upload every file one by one: `EDITOR=true git pull; refresh`. (Don't
forget the build command from above if you don't want to wait for the changes!)

The message will mention a conflict as it merges the changes from the Git repo with the ones on Glitch (probably the
updated songpool), but usually it can do it automatically without a problem. If it says "Automatic merge failed" though,
that means there's changes that Git is not sure how to apply - in that case, use `git merge --abort; refresh` to undo,
and then we'll try to figure out what's wrong later.