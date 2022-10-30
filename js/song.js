/*****
 * Pick a song
 ****/

// Figure out the current day
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const NOW_DATE = new Date();
const FIRST_DAY_DATE = new Date(FIRST_DAY_TIME);
const CURRENT_DAY = Math.floor((Date.UTC(NOW_DATE.getFullYear(), NOW_DATE.getMonth(), NOW_DATE.getDate()) -
    Date.UTC(FIRST_DAY_DATE.getFullYear(), FIRST_DAY_DATE.getMonth(), FIRST_DAY_DATE.getDate())) / MS_PER_DAY) + 1;

// Do random pick
function getHeardleIdForDay(day, overrrideStates) {
    if (day <= OLD_HEARDLE_ROUNDS.length) {
        // Days before we switched to this script - just do a lookup
        return OLD_HEARDLE_ROUNDS[day - 1];
    }

    // Don't have any repeat from the last 100 days, in case of a collision just reroll
    // Heads up: changing that "100" magic number will break everything, it would need some special edits to work
    // So it's probably better to just not change this unless it turns out the repeats get really bad
    const blocked = new Set();
    const statesArray = overrrideStates || PLAY_STATES;
    for (let i = Math.max(statesArray.length - 100, 0); i < statesArray.length; i++) {
        blocked.add(statesArray[i].heardle_id);
    }

    prngSeed(day);
    const filteredSongPool = SONGPOOL
        .map((song, id) => ({id, ...song}))
        .filter(s => day >= s.startOnDay);
    let filteredHeardleIndex;
    do {
       filteredHeardleIndex = Math.floor(prngRandom() * filteredSongPool.length);
    } while (blocked.has(filteredSongPool[filteredHeardleIndex].id));
    return filteredSongPool[filteredHeardleIndex].id;
}