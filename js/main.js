/*****
 * CONFIGURATION
 ****/

// Changing this does change the playback lengths for the video, however, it's hardcoded in a bunch of other places
// (Like the markers on the play bar, the amount of allowed attempts, the slots on the guess list...)
const LENGTHS = [1, 2, 4, 7, 11, 16];
// UNIX timestamp (in ms) of the first day
const RESETTIME = 1665154800000;
// Use unix timestamp to figure out what day it is in JST
const DAY = Math.floor((new Date().getTime() - RESETTIME) / (1000 * 60 * 60 * 24));


/*****
 * Pseudo Random Number Generator from https://stackoverflow.com/a/19301306
 ****/

// Using a seperate PRNG with a seed instead of the native one means we can guarantee players will always get
// the same song on the same day!
let m_w = 123456789;
let m_z = 987654321;
const mask = 0xffffffff;

// Takes any integer
function prngSeed(i) {
    m_w = (123456789 + i) & mask;
    m_z = (987654321 - i) & mask;
}

// Returns number between 0 (inclusive) and 1.0 (exclusive),
// just like Math.random().
function prngRandom() {
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    let result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
}


/*****
 * State and Local Storage
 ****/

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
    byFailCount: [0, 0, 0, 0, 0, 0, 0],
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
    // TODO buttonlabel();

    if (state.finished) {
        // TODO reveal(state.cleared, state.guesses.at(-1));
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


/*****
 * Pick a song
 ****/

prngSeed(DAY);
const CURRENT_HEARDLE = SONGPOOL[Math.floor(prngRandom() * SONGPOOL.length)];
const THE_CORRECT_ONE = CURRENT_HEARDLE.titleEn + " - " + CURRENT_HEARDLE.artistEn;


/*****
 * Audio Player
 ****/

const audio = $("#audio_player")[0];
audio.addEventListener("timeupdate", (event) => {
    if (!state.finished && audio.currentTime >= LENGTHS[state.failed]) {
        playerReset();
    }
});

$(audio)
    .attr("src", "https://static.wikia.nocookie.net/love-live/images/9/9f/Oh%2CLove%26Peace!.ogg")
    .one("canplay", () => {
        showPlayerBar();
    });
$("#control").on("click", controlClicked);

function controlClicked() {
    if (audio.duration > 0 && !audio.paused) {
        playerReset();
    } else {
        playerPlay();
    }
}

function playerPlay() {
    audio.play();
}

function playerReset() {
    audio.pause();
    audio.currentTime = 0;
}

// Set native "Now Playing" info on mobile devices
setInterval(() => {
    navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Love Live! Heardle'
    });
}, 500);


/*****
 * Guessing
 ****/

$("#skipbutton").on("click", () => {
    resolveGuess(false, null);
});

$("#submitbutton").on("click", () => {
    const guess = songfield.value;
    // Block input that is not an autocompleted option
    const option = [0]; // TODO $("select[name='song'] option").toArray().filter(e => e.innerText === guess);
    if (option.length > 0) {
        // addToStatistics() is called in the guess submission method instead of reveal()
        // so it is guaranteed a round only gets added to statistics exactly once
        if (guess === THE_CORRECT_ONE) {
            resolveGuess(true, guess);
        } else {
            resolveGuess(false, guess);
        }
    } else {
        // TODO $("#note").text("Please pick one of the options (or leave the field empty to skip)");
    }
});


/*****
 * UI
 ****/

function resolveGuess(wasCorrect, guess) {
    if (wasCorrect) {
        state.cleared = true;
        reveal(true, guess);
        addToStatistics();
    } else {
        state.failed++;
        if (state.failed >= 6) {
            reveal(false, guess);
            addToStatistics();
        } else {
            const guesslistRow = $($("#guesslist").children()[state.failed - 1]);
            const symbol = guess === null ? symbolSkip() : symbolIncorrect();
            const text = guess === null ? styleGuessSkipped().text("SKIPPED") : styleGuessSong().text(guess);
            guesslistRow
                .append($(`<div class="mr-2"></div>`).append(symbol))
                .append($(`<div class="flex flex-1 justify-between items-center"></div>`).append(text))
                .removeClass("border-custom-line");
            prepareNextGuess();
        }
    }
    saveTodayState();
}

function prepareNextGuess() {
    const guesslistNextRow = $($("#guesslist").children()[state.failed]);
    guesslistNextRow.addClass("border-custom-line");
    updateSkipLabel();
}

function updateSkipLabel() {
    if (state.failed === 5) {
        $("#skiplength").text("(GIVE UP)");
    } else {
        const diff = LENGTHS[state.failed + 1] - LENGTHS[state.failed];
        $("#skiplength").text("(+" + diff + "s)");
    }
}

function reveal(success, lastGuess) {
    state.finished = true;
    $("#player").show();
    $("#guessing").html("<span style='font-size:200%'>" + (success ? "you did it!" : "oops") + "</span>");
    $("#copybuttons").show();

    const copything = $("#copything")[0];
    copything.innerHTML = SHARELABEL + "<br>🔈";

    for (let i = 0; i < (success ? state.failed : 5); i++) {
        if ($("#guesses")[0].children[i]?.innerHTML === "⬜ (skip)")
            copything.innerHTML += "⬜";
        else
            copything.innerHTML += "🟥";
    }

    if (success) {
        copything.innerHTML += "🟩";
        for (let i = 0; i < 5 - state.failed; i++) {
            copything.innerHTML += "⬛";
        }
        copything.innerHTML += " " + (state.failed + 1) + "/6";
    } else {
        // Latest guess might not be added to the DOM yet, handle it seperately
        if (lastGuess === "")
            copything.innerHTML += "⬜";
        else
            copything.innerHTML += "🟥";
        copything.innerHTML += " X/6";
    }
    copything.innerHTML += "<br>" + SHAREPOST;

    if (player) player.loadVideoById({'videoId': VID});
}

function share() {
    if (navigator.share) {
        navigator.share({
            title: 'LL Heardle',
            text: $("#copything").html().replace(/<br>/g, "\n"),
            url: 'https://suyo.be/llheardle'
        });
    } else {
        // PC browsers usually don't have a native share mechanism - just copy it instead
        copy();
    }
}

function copy() {
    navigator.clipboard.writeText($("#copything").html().replace(/<br>/g, "\n")).then(function () {
        $('#copy').val("Copied!");
    }, function (err) {
        console.error("Could not copy text: ", err);
    });
}

document.onkeypress = e => {
    if (e.key === "Enter") submit();
}

/* TODO const fuseOptions = {keys: ["titleEn", "artistEn"]};
const options = {display: (e) => e["titleEn"] + " - " + e["artistEn"], key: "videoId", fuseOptions: fuseOptions};
const songfield = $("#song")[0];
$(songfield).fuzzyComplete(Object.keys(SONGPOOL).map(k => SONGPOOL[k]), options);

// Create setter method for the song field so the button label can be updated if the player clicks an option
// https://stackoverflow.com/a/58585971/1381397
const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(songfield), "value");
Object.defineProperty(songfield, "value", {
    set: function (t) {
        descriptor.set.apply(this, arguments);
        buttonlabel();
    },
    get: function () {
        return descriptor.get.apply(this);
    }
});*/


/*****
 * Symbols and Styling
 ****/

function symbolSkip() {
    return $(`<svg xmlns="http://www.w3.org/2000/svg" class="text-custom-mg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>`)
}

function symbolIncorrect() {
    return $(`<svg class="text-custom-negative" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`)
}

function styleGuessSkipped() {
    return $(`<div class="text-custom-mg tracking-widest font-semibold"></div>`);
}

function styleGuessSong() {
    return $(`<div class="text-white text-sm"></div>`);
}