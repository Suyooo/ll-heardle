/*****
 * Pick a song
 ****/

// Figure out the current day
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const CURRENT_DAY = Math.floor((new Date().getTime() - FIRST_DAY_DATE) / MS_PER_DAY) + 1;

// Do random pick
function getHeardleIdForDay(day) {
    prngSeed(day);
    const filteredSongPool = SONGPOOL
        .map((song, id) => ({id, ...song}))
        .filter(s => day >= s.startOnDay);
    const filteredHeardleIndex = Math.floor(prngRandom() * filteredSongPool.length);
    return filteredSongPool[filteredHeardleIndex].id;
}