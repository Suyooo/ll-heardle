/*****
 * CONFIGURATION
 ****/

// Changing this does change the playback lengths for the video, however, it's hardcoded in a bunch of other places
// (Like the markers on the play bar, the amount of allowed attempts, the slots on the guess list...)
const LENGTHS = [1, 2, 4, 7, 11, 16];
// UNIX timestamp (in ms) of the first day
const RESETTIME = 1665154800000;

/*****
 * Grab element references
 ****/

const $playerbar = $("#playerbar");
const $loading = $("#loading");
const $audio = $("#audio_player");
const audio = $audio[0];

const $guessbar = $("#guessbar");
const $field = $("#field");
const $fieldclear = $("#fieldclear");
const $skipbutton = $("#skipbutton");
const $submitbutton = $("#submitbutton");
const $control = $("#control");
const $controlpaused = $("#controlpaused");
const $controlplaying = $("#controlplaying");

const $timecurrent = $("#timecurrent");
const $playbarcurrent = $("#playbarcurrent");
const $timelimit = $("#timelimit");
const $timeduration = $("#timeduration");
const $playbarlimit = $("#playbarlimit");
const $playbarmarkersChildren = $("#playbarmarkers").children().toArray().map(e => $(e));

const $guessingscreen = $("#guessingscreen");
const $guesslistChildren = $("#guesslist").children().toArray().map(e => $(e));
const $playprompt = $("#playprompt");

const $resultscreen = $("#resultscreen");


/*****
 * Pseudo Random Number Generator from https://stackoverflow.com/a/19301306
 ****/

// Using a seperate PRNG with a seed instead of the native one means we can guarantee players will always get
// the same song on the same day!
let m_w = 123456789;
let m_z = 987654321;
const mask = 0xffffffff;

function prngSeed(i) {
    m_w = (123456789 + i) & mask;
    m_z = (987654321 - i) & mask;
}

// Returns number between 0 (inclusive) and 1.0 (exclusive), just like Math.random().
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

// Use unix timestamp to figure out what day it is in JST
// TODO: base day on a common time or on local timezone?
const DAY = Math.floor((new Date().getTime() - RESETTIME) / (1000 * 60 * 60 * 24));

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
        // TODO: reset streak if a day was skipped?
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
    prepareNextGuess();
} else {
    if (state.finished) {
        reveal(state.cleared, state.guesses.at(-1));
    } else {
        state.guesses.forEach((guess, guessNo) => showWrongGuess(guessNo, guess));
        prepareNextGuess();
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

function getCorrectGuess() {
    return CURRENT_HEARDLE.artistEn + " - " + CURRENT_HEARDLE.titleEn;
}


/*****
 * Audio Player
 ****/

function playerTimeUpdate() {
    $timecurrent.text((audio.currentTime < 10 ? "0:0" : "0:") + Math.floor(audio.currentTime));
    $playbarcurrent.width((audio.currentTime / (state.finished ? audio.duration : LENGTHS[state.failed]) * 100) + "%");
    if (!state.finished && audio.currentTime >= LENGTHS[state.failed]) {
        playerStop();
    } else if (!audio.paused) {
        requestAnimationFrame(playerTimeUpdate);
    }
}

$audio
    .attr("src", "https://cdn.glitch.global/ea27ab61-17a9-4fca-9886-fbab5bad45f8/09%20ENDLESS%20PARADE%20.mp3?v=1665437862685")
    .one("canplay", () => {
        const fullSongSeconds = Math.floor(audio.duration % 60);
        $timeduration.text(Math.floor(audio.duration / 60) + ":" + (fullSongSeconds < 10 ? "0" : "") + fullSongSeconds);
        $loading.hide();
        $playerbar.show();
    });
$control.on("click", controlClicked);

function controlClicked() {
    if (audio.duration > 0 && !audio.paused) {
        playerStop();
    } else {
        playerPlay();
    }
}

function playerPlay() {
    // TODO: stop symbol on button
    audio.currentTime = 0;
    audio.play();
    $controlpaused.hide();
    $controlplaying.show();
    $playprompt.hide();
    requestAnimationFrame(playerTimeUpdate);
}

function playerStop() {
    audio.pause();
    $controlpaused.show();
    $controlplaying.hide();
}

function playerReset() {
    audio.pause();
    audio.currentTime = 0;
    playerTimeUpdate();
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

// When selecting an option from the dropdown using the Enter key, it should *not* immediately submit
// This is what this variable does: When a guess is set, it will block the keyUp event until it was re-pressed
let blockNextUp = false;
$field.on("keydown", e => {
    if (e.key === "Enter" && !e.originalEvent.repeat) blockNextUp = false;
});
$field.on("keyup", e => {
    if (e.key === "Enter" && !blockNextUp) submit();
});

const autoCompleter = new autoComplete({
    selector: "#field",
    data: {
        src: SONGPOOL.map(song => ({
            en: song.artistEn + " - " + song.titleEn,
            ja: song.artistJa + " - " + song.titleJa
        })),
        cache: false,
        keys: ["en", "ja"],
        filter: (list) => {
            // This function uses autoComplete.js as only a first step - it doesn't rank results, just filters them
            // Remove dupes (happens if a search term appears in multiple fields)
            // TODO: Maybe have a toggle between English/Japanese and only show those results?
            const foundValues = new Set();
            list = list.filter(result => {
                if (foundValues.has(result.value)) return false;
                foundValues.add(result.value);
                return true;
            });

            // Rank results by bigram similarity (bigram: every substring of two letters)
            const searchQuery = $field.val();
            // 1) Split the search query into bigrams
            const queryBigrams = makeBigrams(searchQuery.toLowerCase());
            list.forEach(result => {
                // 2) Split each result into bigrams
                const resultBigrams = makeBigrams(result.value[result.key].toLowerCase());

                // 3) Search how many of the bigrams of each result appear in the bigrams of the search query
                let hits = 0;
                queryBigrams.forEach(queryBigram => {
                    const matchingIndex = resultBigrams.indexOf(queryBigram);
                    if (matchingIndex !== -1) {
                        resultBigrams[matchingIndex] = null; // don't match the same bigram more than once
                        hits++;
                    }
                });

                // 4) Score based on number of hits
                result.score = (2 * hits) / (queryBigrams.length + resultBigrams.length);
            });

            // 5) Sort by calculated score (the higher the better)
            return list.sort((a, b) => b.score - a.score);
        }
    },
    threshold: 1,
    wrapper: false,
    resultsList: {
        maxResults: 6,
        tabSelect: true
    },
    diacritics: true,
    noresults: true,
    searchEngine: "loose",
    resultItem: {
        highlight: true
    },
    events: {
        input: {
            selection: (e) => {
                if ($field.val() === "") return;
                const value = e.detail.selection.value["en"];
                if (value !== $field.val()) {
                    blockNextUp = true;
                    $field.val(value).focus();
                }
            },
        }
    }
});

function makeBigrams(s) {
    if (s.length < 2) return [s];
    const bigrams = [];
    for (let i = 0; i < s.length - 1; i++) {
        bigrams.push(s.slice(i, i + 2));
    }
    return bigrams;
}

$skipbutton.on("click", () => {
    resolveGuess(state.failed, false, null);
});

function submit() {
    const guess = $field.val();
    // Block input that is not an option in the song pool
    if (SONGPOOL.some(song => song.artistEn + " - " + song.titleEn === guess)) {
        // addToStatistics() is called in the guess submission method instead of reveal()
        // so it is guaranteed a round only gets added to statistics exactly once
        if (guess === getCorrectGuess()) {
            resolveGuess(state.failed, true, guess);
        } else {
            resolveGuess(state.failed, false, guess);
        }
        $field.val("");
    } else {
        $("#invalid").show();
    }
}

$submitbutton.on("click", submit);

$fieldclear.on("click", () => {
    $field.val("");
});


/*****
 * UI
 ****/

function resolveGuess(guessNo, wasCorrect, guess) {
    if (state.finished) return;
    $("#invalid").hide();
    state.guesses.push(guess);
    if (wasCorrect) {
        state.cleared = true;
        endGame(true, guess);
    } else {
        state.failed++;
        if (state.failed >= 6) {
            endGame(false, guess);
        } else {
            showWrongGuess(guessNo, guess);
            prepareNextGuess();
        }
    }
    saveTodayState();
}

function showWrongGuess(guessNo, guess) {
    const guesslistRow = $guesslistChildren[guessNo];
    const symbol = guess === null ? symbolSkip() : symbolIncorrect();
    const text = guess === null ? styleGuessRowTitleSkipped().text("SKIPPED") : styleGuessRowTitleSong().text(guess);
    guesslistRow
        .append(styleGuessRowSymbol().append(symbol))
        .append(styleGuessRowTitle().append(text))
        .removeClass("border-custom-line");
}

function prepareNextGuess() {
    playerReset();
    updateSkipLabel();

    // Show "Click Play" prompt if no guesses have been made yet
    $playprompt.toggle(state.failed === 0);

    // Mark current guess list row
    $guesslistChildren[state.failed].addClass("border-custom-line");

    // Show timelimit in / next to play bar
    $playbarlimit.width((LENGTHS[state.failed] / LENGTHS.at(-1) * 100) + "%");
    $playbarmarkersChildren.forEach(($element, index) => {
        if (index <= state.failed) {
            $element.removeClass("bg-custom-line bg-custom-mg").addClass("bg-custom-bg");
        } else if (index === state.failed + 1) {
            $element.removeClass("bg-custom-mg").addClass("bg-custom-line");
        }
    });
    $timelimit.text((LENGTHS[state.failed] < 10 ? "0:0" : "0:") + LENGTHS[state.failed]);
}

function updateSkipLabel() {
    if (state.failed === 5) {
        $skipbutton.text("GIVE UP");
    } else {
        const diff = LENGTHS[state.failed + 1] - LENGTHS[state.failed];
        $skipbutton.text("SKIP (+" + diff + "s)");
    }
}

function endGame(success, lastGuess) {
    reveal(success, lastGuess);
    addToStatistics();
    playerReset();
    playerPlay();
}

function reveal(success, lastGuess) {
    // Disallow guessing
    state.finished = true;
    $guessbar.hide();

    // Show result screen
    $guessingscreen.hide();
    $resultscreen.show();

    // Show full song
    $playbarlimit.width("100%");
    $playbarmarkersChildren.forEach(($element) => $element.remove());
    $timelimit.hide();
    $timeduration.show();

    $resultscreen.html("<center><span style='font-size:200%'>" + (success ? "you did it!" : "oops") + "</span></center>");
    /*TODO $("#copybuttons").show();

    const copything = $("#copything")[0];
    copything.innerHTML = "🔈";

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
    copything.innerHTML += "<br>" + SHAREPOST;*/
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
        navigator.clipboard.writeText($("#copything").html().replace(/<br>/g, "\n")).then(function () {
            $('#copy').val("Copied!");
        }, function (err) {
            console.error("Could not copy text: ", err);
        });
    }
}


/*****
 * Symbols and Styling
 ****/

function symbolSkip() {
    return $(`<svg xmlns="http://www.w3.org/2000/svg" class="text-custom-mg w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>`)
}

function symbolIncorrect() {
    return $(`<svg xmlns="http://www.w3.org/2000/svg" class="text-custom-negative w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`)
}

function styleGuessRowSymbol() {
    return $(`<div class="mr-2"></div>`);
}

function styleGuessRowTitle() {
    return $(`<div class="flex flex-1 justify-between items-center"></div>`);
}

function styleGuessRowTitleSkipped() {
    return $(`<div class="text-custom-mg tracking-widest font-semibold"></div>`);
}

function styleGuessRowTitleSong() {
    return $(`<div class="text-white text-sm"></div>`);
}