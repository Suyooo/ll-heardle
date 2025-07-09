# Love Live Heardle

Runs the original Heardle site, but using HTML5 Audio elements instead of Soundcloud embeds.  
This project uses the site layout of the original Heardle by [Omakase](https://omakase.studio/), which is hereby
explicitly excluded from the GPL3 License the rest of the project is licensed under.

This is a very barebones project with mostly vanilla JS, since it was originally made to be easy to setup and edit
without having to deal with any frameworks. Enjoy.

- Install NodeJS on your PC
- Install requirements: `npm ci`
- After each update: `npm run build`
- Then upload the contents of the `build` folder to your nearest server

`js/00info.js` is the file you'll probably edit the most - it contains the news post info and the list for the song
pool. The news post info is hopefully self-explanatory enough, for the song pool, check the comment at the very bottom
of the file.