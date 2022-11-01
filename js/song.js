/*****
 * Pick a song
 ****/

// Figure out the current day
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const NOW_DATE = new Date();
const FIRST_DAY_DATE = new Date(FIRST_DAY_TIME);
const CURRENT_DAY = Math.round((Date.UTC(NOW_DATE.getFullYear(), NOW_DATE.getMonth(), NOW_DATE.getDate()) -
    Date.UTC(FIRST_DAY_DATE.getFullYear(), FIRST_DAY_DATE.getMonth(), FIRST_DAY_DATE.getDate())) / MS_PER_DAY) + 1;

const HEARDLE_DAY_CACHE = {};

// Do random pick
function getHeardleIdForDay(day) {
    if (day <= OLD_HEARDLE_ROUNDS.length) {
        // Days before we switched to this script - just do a lookup
        return OLD_HEARDLE_ROUNDS[day - 1];
    } else if (HEARDLE_DAY_CACHE.hasOwnProperty(day)) {
        return HEARDLE_DAY_CACHE[day];
    }

    // Don't have any repeat from the last 100 days, in case of a collision just reroll
    // Heads up: changing that "100" magic number will break everything, it would need some special edits to work
    // So it's probably better to just not change this unless it turns out the repeats get really bad
    // And yes, that means every visit, the entire Heardle history will get recreated.
    // Is it inefficient? Yes! Is it inefficient to the point that it makes a noticeable difference when playing? No!
    // So I think it's a fine tradeoff - by doing this instead of relying on a user's save file, we sacrifice some
    // performance for the guarantee that everyone will always have exactly the same song forever
    const blocked = new Set();
    for (let i = Math.max(day - 100, 0); i < day; i++) {
        blocked.add(getHeardleIdForDay(i));
    }

    prngSeed(day);
    const filteredSongPool = SONGPOOL
        .map((song, id) => ({id, ...song}))
        .filter(s => day >= s.startOnDay);
    let filteredHeardleIndex;
    do {
       filteredHeardleIndex = Math.floor(prngRandom() * filteredSongPool.length);
    } while (blocked.has(filteredSongPool[filteredHeardleIndex].id));

    HEARDLE_DAY_CACHE[day] = filteredSongPool[filteredHeardleIndex].id;
    return filteredSongPool[filteredHeardleIndex].id;
}