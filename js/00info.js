const CURRENT_ANNOUNCEMENT = {
    // Increase this number for every new announcement - this will be stored/checked for marking the button as unread or not
    announcementNo: 0,

    title: "Site Update",
    date: "October 13th, 2022",
    // You can use HTML (<br>, <a href="..."> etc) in the text
    text:
`Hello, everyone!<br>
<br>
Today, we've updated the site to use new code. You might notice some small differences (this news section, for example),
but the majority of changes is about helping us run and maintain the site. For players, the main changes are that the
audio player has changed, and the song choice for new Heardles is now automatic and randomized.<br>
<br>
That does mean there could be some repeating songs, but we hope that this update helps with overall song availability
and allows us to add features to <i>Love Live! Heardle</i> in the future more easily!<br>
<br>
Your statistics and streak have been carried over from the old version of the site already. We made sure to make this
new version play just like the old one, but of course, there could always be some issues or oversights that snuck in.
If you run into any problems, like your data not carrying over, not saving or other errors, let us know!<br>
<br>
Thanks for playing <i>Love Live! Heardle</i>!`
};

const SONGPOOL = [
    {
        "songUrl": "dummy url - if this property is an empty string, this song will never be chosen as a daily Heardle",
        "coverUrl": "dummy url",
        "startOnDay": 0,
        "titleEn": "dummy song",
        "artistEn": "dummy artist",
        "titleJa": "dummy song",
        "artistJa": "dummy artist",
        "listenOn": {
            "spotify": "spotifylink",
            "youtube": "youtubelink"
        }
    },
    /*
     * WHEN ADDING A NEW SONG:
     * - Copy one of the elements and paste it above this comment block (that way, songs are sorted by release order)
     * - For solos, you can copy the artist line from one of the others above
     * - !!! For new songs, make sure to set startOnDay to *at least* three days after the current day, or the current
     *       day's Heardle **WILL** break for players! (see below)
     *
     * - startOnDay is a number representing the day (same as the one shown when copying share info after clearing a
     *   Heardle) when the song should be added to the pool of possible daily Heardles. This has to be done so that the
     *   RNG is guaranteed to deliver the same result, no matter when players visit the site.
     * - Same thing happens if you remove a song, so **never remove a song**! (We'll have to add that as a new feature,
     *   if you ever need to get rid of a song)
     *
     * For the listenOn links:
     * - Spotify is pretty straightforward - search for the song, open the three-dot menu that shows on the right when
     *   you hover over the result and click "Share" > "Copy Song Link". (Remove the ?si= part if you want.)
     * - YouTube however can be kind of a pain, because its own search sucks. I had a way easier time using the Google
     *   video search instead, and searching "youtube [Japanese title]", maybe with the group name too
     *   (for example: https://www.google.com/search?q=youtube+%E3%82%82%E3%81%A3%E3%81%A8%E3%81%AD%EF%BC%81&tbm=vid)
     *   Make sure the video is from a channel ending with " - Topic", or it's not an official upload.
     * - If there is no upload on Spotify or no official upload on YT, just leave the field out (remove the entire line)
     *
     * - If you want to make sure everything worked, you can check the song pool via your browser's developer tools.
     *   Open it with F12, head to the Console tab, and access the llheardle.SONGPOOL property. For example:
     *       llheardle.SONGPOOL.at(-1)
     *   That call will show the last song in the pool (the one right above this comment), so you can check whether the
     *   pool updated correctly and the new song you just added is really in there. (Remember to wait for the build
     *   script or to run it manually - see the README file)
     */
];

exports.SONGPOOL = SONGPOOL;