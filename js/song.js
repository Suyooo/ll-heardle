/*
 * RNG from https://stackoverflow.com/a/19301306
 */
let m_w = 123456789;
let m_z = 987654321;
const mask = 0xffffffff;
// Takes any integer
function seed(i) {
    m_w = (123456789 + i) & mask;
    m_z = (987654321 - i) & mask;
}
// Returns number between 0 (inclusive) and 1.0 (exclusive),
// just like Math.random().
function random() {
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    let result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
}

// Having a seedable RNG means everyone will get the same song on every day
seed(DAY);

const KEYS = Object.keys(songlist);
// Exception for day 1 where I rolled random.choice() in Python to get that song instead of this one
const VID = DAY === 1 ? "FbnJMil5fz4" : KEYS[Math.floor(random() * KEYS.length)];

// Better idea would be adding the video ID to fuzzycomplete and using that to check whether the guess is correct
const THE_CORRECT_ONE = songlist[VID].titleEn + " - " + songlist[VID].artistEn;