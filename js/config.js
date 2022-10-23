/*****
 * Configuration
 ****/

// Changing this does change the playback lengths for the video, however, it's hardcoded in a bunch of other places
// (Like the markers on the play bar, the amount of allowed attempts, the slots on the guess list...)
const LENGTHS = [1, 2, 4, 7, 11, 16];

// First day (YYYY/MM/DD)
const FIRST_DAY_DATE = Date.parse("2022/04/04");