/*****
 * Pick a song
 ****/

// Figure out the current day
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const NOW_DATE = new Date();
const FIRST_DAY_DATE = new Date(FIRST_DAY_TIME);
const CURRENT_DAY = Math.round((Date.UTC(NOW_DATE.getFullYear(), NOW_DATE.getMonth(), NOW_DATE.getDate()) -
    Date.UTC(FIRST_DAY_DATE.getFullYear(), FIRST_DAY_DATE.getMonth(), FIRST_DAY_DATE.getDate())) / MS_PER_DAY) + 1;

// CHECKPOINT: A continious chain of 100 heardles here means that the reroll check doesn't have to go back all the way
// to the start to generate today's heardle.
const HEARDLE_DAY_CACHE = {
    "1094": 97,
    "1095": 439,
    "1096": 419,
    "1097": 409,
    "1098": 49,
    "1099": 41,
    "1100": 19,
    "1101": 342,
    "1102": 11,
    "1103": 383,
    "1104": 111,
    "1105": 109,
    "1106": 464,
    "1107": 101,
    "1108": 59,
    "1109": 72,
    "1110": 399,
    "1111": 124,
    "1112": 440,
    "1113": 24,
    "1114": 405,
    "1115": 5,
    "1116": 132,
    "1117": 476,
    "1118": 467,
    "1119": 445,
    "1120": 95,
    "1121": 51,
    "1122": 65,
    "1123": 392,
    "1124": 8,
    "1125": 351,
    "1126": 17,
    "1127": 328,
    "1128": 116,
    "1129": 126,
    "1130": 470,
    "1131": 107,
    "1132": 133,
    "1133": 13,
    "1134": 420,
    "1135": 339,
    "1136": 379,
    "1137": 471,
    "1138": 359,
    "1139": 139,
    "1140": 249,
    "1141": 493,
    "1142": 120,
    "1143": 110,
    "1144": 56,
    "1145": 194,
    "1146": 291,
    "1147": 414,
    "1148": 53,
    "1149": 372,
    "1150": 138,
    "1151": 348,
    "1152": 16,
    "1153": 27,
    "1154": 487,
    "1155": 79,
    "1156": 461,
    "1157": 430,
    "1158": 426,
    "1159": 76,
    "1160": 68,
    "1161": 47,
    "1162": 25,
    "1163": 356,
    "1164": 357,
    "1165": 418,
    "1166": 406,
    "1167": 481,
    "1168": 83,
    "1169": 438,
    "1170": 88,
    "1171": 391,
    "1172": 70,
    "1173": 396,
    "1174": 40,
    "1175": 31,
    "1176": 22,
    "1177": 347,
    "1178": 106,
    "1179": 130,
    "1180": 475,
    "1181": 479,
    "1182": 432,
    "1183": 82,
    "1184": 424,
    "1185": 400,
    "1186": 390,
    "1187": 34,
    "1188": 363,
    "1189": 103,
    "1190": 178,
    "1191": 498,
    "1192": 412,
    "1193": 468
};

// Do random pick
function getHeardleIdForDay(day) {
    if (HEARDLE_DAY_CACHE.hasOwnProperty(day)) {
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