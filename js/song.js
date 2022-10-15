/*****
 * Pick a song
 ****/

// Figure out the current day
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const CURRENT_DAY = Math.floor((new Date().getTime() - FIRST_DAY_DATE) / MS_PER_DAY) + 1;

// Do random pick
prngSeed(CURRENT_DAY);
const FILTERED_SONGPOOL = SONGPOOL.filter(s => s.songUrl !== "" && CURRENT_DAY >= s.startOnDay);
const CURRENT_HEARDLE_ID = Math.floor(prngRandom() * FILTERED_SONGPOOL.length);
const CURRENT_HEARDLE = FILTERED_SONGPOOL[CURRENT_HEARDLE_ID];