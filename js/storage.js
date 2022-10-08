const tempstate = localStorage.getItem("today_state");
const state = tempstate !== null ? JSON.parse(tempstate) : {
    day: DAY,
    failed: 0,
    guesses: [],
    cleared: false,
    finished: false
}

const tempstats = localStorage.getItem("stats");
const stats = tempstats !== null ? JSON.parse(tempstats) : {
    byFailCount: [0,0,0,0,0,0,0],
    viewed: 0,
    cleared: 0,
    currentStreak: 0,
    highestStreak: 0
}

const lastDay = localStorage.getItem("last_visited_day");
if (lastDay === null || DAY > parseInt(lastDay)) {
    // new day started
    if (lastDay !== null) {
        // check whether last day was unfinished
        if (!state.finished) {
            state.failed = 6;
            state.finished = true;
            addToStatistics();
        }
    }

    localStorage.setItem("last_visited_day", DAY.toString());
    state.day = DAY;
    state.failed = 0;
    state.guesses = [];
    state.cleared = false;
    state.finished = false;
    saveTodayState();
    stats.viewed += 1;
    saveStats();
} else {
    const guessList = $("#guesses");
    for (const guess of state.guesses) {
        const guessEl = document.createElement('div');
        guessEl.innerHTML = guess;
        guessList.append(guessEl);
    }
    $("#guesscount").text("Guess " + (state.failed === 6 ? 6 : state.failed + 1) + " of 6");
    buttonlabel();

    if (state.finished) {
        reveal(state.cleared, state.guesses.at(-1));
    }
}

function saveTodayState() {
    localStorage.setItem("today_state", JSON.stringify(state));
}

function saveStats() {
    localStorage.setItem("stats", JSON.stringify(stats));
}

function addToStatistics() {
    stats.byFailCount[state.failed] += 1;
    if (state.cleared) {
        stats.cleared += 1;
        stats.currentStreak += 1;
        if (stats.currentStreak > stats.highestStreak) {
            stats.highestStreak = stats.currentStreak;
        }
    } else {
        stats.currentStreak = 0;
    }
    saveStats();
}