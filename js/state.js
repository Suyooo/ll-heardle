/*****
 * State and Local Storage
 ****/

const LOADED_PLAY_STATES = localStorage.getItem("play_states");
const PLAY_STATES = LOADED_PLAY_STATES !== null
    ? JSON.parse(LOADED_PLAY_STATES)
    : [];

const LOADED_STATISTICS = localStorage.getItem("statistics");
const STATISTICS = LOADED_STATISTICS !== null
    ? JSON.parse(LOADED_STATISTICS)
    : {
        byFailCount: [0, 0, 0, 0, 0, 0, 0],
        viewed: 0,
        cleared: 0,
        currentStreak: 0,
        highestStreak: 0
    };

let CURRENT_PLAY_STATE = PLAY_STATES.at(-1); // undefined if player's first visit
const IS_FIRST_PLAY = CURRENT_PLAY_STATE === undefined;
const LAST_ANNOUNCEMENT = parseInt(localStorage.getItem("last_announcement_no")); // NaN if news were never read
let CURRENT_HEARDLE;

// Check for day change, load saved data and get the correct state ready
if (IS_FIRST_PLAY || CURRENT_DAY > CURRENT_PLAY_STATE.day) {
    // It's a new day, or it's the player's first ever visit
    if (!IS_FIRST_PLAY) {
        // If the player played before...
        if (!CURRENT_PLAY_STATE.finished) {
            // If the last day was unfinished, add a fail to the statistics
            addToStatistics();
        }
        if (CURRENT_DAY - CURRENT_PLAY_STATE.day > 1) {
            // If a day was skipped, break streak
            STATISTICS.currentStreak = 0;
        }
    }

    // Recreate skipped days so song picks can properly avoid repeats (see song.js)
    let LAST_STATE_DAY = CURRENT_PLAY_STATE?.day || 0;
    if (CURRENT_DAY - LAST_STATE_DAY > 1) {
        LAST_STATE_DAY++;
        while (LAST_STATE_DAY < CURRENT_DAY) {
            PLAY_STATES.push({
                day: LAST_STATE_DAY,
                heardle_id: getHeardleIdForDay(LAST_STATE_DAY)
            });
            LAST_STATE_DAY++;
        }
    }

    CURRENT_PLAY_STATE = {
        day: CURRENT_DAY,
        heardle_id: getHeardleIdForDay(CURRENT_DAY),
        failed: 0,
        guesses: [],
        cleared: false,
        finished: false
    };
    CURRENT_HEARDLE = SONGPOOL[CURRENT_PLAY_STATE.heardle_id];
    PLAY_STATES.push(CURRENT_PLAY_STATE);
    savePlayStates();
    STATISTICS.viewed += 1;
    saveStatistics();
    prepareNextGuess();
} else {
    CURRENT_HEARDLE = SONGPOOL[CURRENT_PLAY_STATE.heardle_id];
    if (CURRENT_PLAY_STATE.finished) {
        reveal(CURRENT_PLAY_STATE.cleared);
    } else {
        CURRENT_PLAY_STATE.guesses.forEach((guess, guessNo) => showWrongGuess(guessNo, guess));
        prepareNextGuess();
    }
}

function savePlayStates() {
    localStorage.setItem("play_states", JSON.stringify(PLAY_STATES));
}

function saveStatistics() {
    localStorage.setItem("statistics", JSON.stringify(STATISTICS));
}

function addToStatistics() {
    if (CURRENT_PLAY_STATE.cleared) {
        STATISTICS.cleared += 1;
        STATISTICS.currentStreak += 1;
        if (STATISTICS.currentStreak > STATISTICS.highestStreak) {
            STATISTICS.highestStreak = STATISTICS.currentStreak;
        }
        STATISTICS.byFailCount[CURRENT_PLAY_STATE.failed] += 1;
    } else {
        STATISTICS.currentStreak = 0;
        STATISTICS.byFailCount[6] += 1;
    }
    saveStatistics();
}