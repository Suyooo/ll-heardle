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
        "artistJa": "dummy artist"
    },
    /*
     * WHEN ADDING A NEW SONG:
     * - Copypaste one of the elements above this (so songs are in release order in this list)
     * - For solos, you can copy the artist line from one of the others above
     * - !!! Make sure to set startOnDay to *at least* three days after the current day (the number that shows in the
     *       share info plus three), or the current day's Heardle **WILL** break for players!
     * - Same thing happens if you remove a song, so **never remove a song**! (If you want a song to never be picked
     *   as a daily Heardle again, just remove the song file ("songUrl": "",)
     * - If you want to make sure everything worked, you can check the song pool via your browser's developer tools.
     *   Open it with F12, head to the Console, and access the llheardle.SONGPOOL property. For example:
     *       llheardle.SONGPOOL.at(-1)
     *   That call will show the last song in the pool (the one right above this comment) so you can check whether the
     *   pool updated correctly, and the new song you just added is really in there. (Remember to wait for the build
     *   script or to run it manually - see the README file)
     */
];

exports.SONGPOOL = SONGPOOL;