// Before doing anything: Make sure the user is on HTTPS, as navigator.share only works on HTTPS
if (location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}


/*****
 * Configuration
 ****/

// Changing this does change the playback lengths for the video, however, it's hardcoded in a bunch of other places
// (Like the markers on the play bar, the amount of allowed attempts, the slots on the guess list...)
const LENGTHS = [1, 2, 4, 7, 11, 16];

// First day (YYYY/MM/DD)
const FIRST_DAY_DATE = Date.parse("2022/04/04");


/*****
 * Grab element references
 ****/

const $fadeout = $("#fadeout");
const $fadeouttext = $("#fadeouttext");
const $fadeoutwarning = $("#fadeoutwarning");

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
const $resultsongbox = $("#resultsongbox");
const $resultcover = $("#resultcover");
const $resultartist = $("#resultartist");
const $resulttitle = $("#resulttitle");
const $clearmessage = $("#clearmessage");
const $resultmessage = $("#resultmessage");
const $resultcolorrowChildren = $("#resultcolorrow").children().toArray().map(e => $(e));
const $resultshare = $("#resultshare");
const $resulttimer = $("#resulttimer");

const $modals = $("#modals");
const $modalsChildren = $modals.children().toArray().map(e => $(e));
const $closeModals = $(".close-modals, #modals");

const $modalAbout = $("#modal-about");
const $openAbout = $("#open-about");

const $modalAnnounce = $("#modal-announce");
const $modalAnnounceTitle = $("#modal-announcetitle");
const $modalAnnounceDate = $("#modal-announcedate");
const $modalAnnounceText = $("#modal-announcetext");
const $openAnnounce = $("#open-announce");
const $openAnnounceRead = $("#open-announce-read");
const $openAnnounceUnread = $("#open-announce-unread");

const $modalStats = $("#modal-stats");
const $openStats = $("#open-stats");
const $modalStatsBarContainer = $("#modal-stats-barcontainer")
const $modalStatsBars = $modalStatsBarContainer.children().toArray().map(e => $("div.absolute", e));
const $modalStatsCounters = $modalStatsBarContainer.children().toArray().map(e => $("span.absolute", e));
const $modalStatsLabels = $modalStatsBarContainer.children().toArray().map(e => $("div.text-center", e));
const $modalStatsViewed = $("#modal-stats-viewed");
const $modalStatsCleared = $("#modal-stats-cleared");
const $modalStatsWinRate = $("#modal-stats-winrate");
const $modalStatsCurrentStreak = $("#modal-stats-currentstreak");
const $modalStatsHighestStreak = $("#modal-stats-higheststreak");

const $modalHelp = $("#modal-help");
const $openHelp = $("#open-help");


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
 * Helper Functions
 ****/

function timer(fullSeconds) {
    if (fullSeconds < 60) {
        return (fullSeconds < 10 ? "0:0" : "0:") + Math.floor(fullSeconds);
    } else if (fullSeconds < 3600) {
        const minutes = Math.floor(fullSeconds / 60);
        const seconds = Math.floor(fullSeconds) % 60;
        return minutes + (seconds < 10 ? ":0" : ":") + seconds;
    } else {
        const hours = Math.floor(fullSeconds / 3600);
        const minutes = Math.floor(fullSeconds / 60) % 60;
        const seconds = Math.floor(fullSeconds) % 60;
        return hours + (minutes < 10 ? ":0" : ":") + minutes + (seconds < 10 ? ":0" : ":") + seconds;
    }
}


/*****
 * Pick a song
 ****/

// Figure out the current day
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const CURRENT_DAY = Math.floor((new Date().getTime() - FIRST_DAY_DATE) / MS_PER_DAY) + 1;

// If the location hash is set, we're in testing mode
const TESTING_SONG = window.location.hash && window.location.hash.startsWith("#http") ? window.location.hash.slice(1) : null;

// Do random pick
prngSeed(CURRENT_DAY);
const FILTERED_SONGPOOL = SONGPOOL.filter(s => s.songUrl !== "" && CURRENT_DAY >= s.startOnDay);
const CURRENT_HEARDLE_ID = Math.floor(prngRandom() * FILTERED_SONGPOOL.length);

const CURRENT_HEARDLE = TESTING_SONG !== null
    ? SONGPOOL.filter(s => s.songUrl === TESTING_SONG)[0]
    : FILTERED_SONGPOOL[CURRENT_HEARDLE_ID];

/*****
 * State and Local Storage
 ****/

// TODO: Import old Heardle info

const LOADED_PLAY_STATES = localStorage.getItem("play_states");
const PLAY_STATES = LOADED_PLAY_STATES !== null && TESTING_SONG === null
    ? JSON.parse(LOADED_PLAY_STATES)
    : [];

const LOADED_STATISTICS = localStorage.getItem("statistics");
const STATISTICS = LOADED_STATISTICS !== null && TESTING_SONG === null
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

if (TESTING_SONG === null) {
    // Regular play: Check for day change, load saved data and get the correct state ready
    if (IS_FIRST_PLAY || CURRENT_DAY > CURRENT_PLAY_STATE.day) {
        // It's a new day, or it's the player's first ever visit
        if (!IS_FIRST_PLAY) {
            // If the player played before...
            if (!CURRENT_PLAY_STATE.finished) {
                // If the last day was unfinished, add a fail to the statistics
                addToStatistics(true);
            }
            if (CURRENT_DAY - CURRENT_PLAY_STATE.day > 1) {
                // If a day was skipped, break streak
                STATISTICS.currentStreak = 0;
            }
        }

        CURRENT_PLAY_STATE = {
            day: CURRENT_DAY,
            heardle_id: CURRENT_HEARDLE_ID,
            failed: 0,
            guesses: [],
            cleared: false,
            finished: false
        };
        PLAY_STATES.push(CURRENT_PLAY_STATE);
        savePlayStates();
        STATISTICS.viewed += 1;
        saveStatistics();
        prepareNextGuess();
    } else {
        if (CURRENT_PLAY_STATE.finished) {
            reveal(CURRENT_PLAY_STATE.cleared);
        } else {
            CURRENT_PLAY_STATE.guesses.forEach((guess, guessNo) => showWrongGuess(guessNo, guess));
            prepareNextGuess();
        }
    }
} else {
    // Testing mode: don't load/save anything, just get the game started
    if (CURRENT_HEARDLE === undefined) {
        alert("The requested test song was not found in the song pool.");
    } else {
        alert("You're in testing mode.");
        prepareNextGuess();
    }
}

function savePlayStates() {
    if (TESTING_SONG !== null) return;
    localStorage.setItem("play_states", JSON.stringify(PLAY_STATES));
}

function saveStatistics() {
    if (TESTING_SONG !== null) return;
    localStorage.setItem("statistics", JSON.stringify(STATISTICS));
}

function addToStatistics(forceFailed = false) {
    if (TESTING_SONG !== null) return;
    STATISTICS.byFailCount[forceFailed ? 6 : CURRENT_PLAY_STATE.failed] += 1;
    if (CURRENT_PLAY_STATE.cleared && !forceFailed) {
        STATISTICS.cleared += 1;
        STATISTICS.currentStreak += 1;
        if (STATISTICS.currentStreak > STATISTICS.highestStreak) {
            STATISTICS.highestStreak = STATISTICS.currentStreak;
        }
    } else {
        STATISTICS.currentStreak = 0;
    }
    saveStatistics();
}


/*****
 * Audio Player
 ****/

function playerTimeUpdate() {
    $timecurrent.text(timer(audio.currentTime));
    $playbarcurrent.width((audio.currentTime / (CURRENT_PLAY_STATE.finished ? audio.duration : LENGTHS[CURRENT_PLAY_STATE.failed]) * 100) + "%");
    if (!CURRENT_PLAY_STATE.finished && audio.currentTime >= LENGTHS[CURRENT_PLAY_STATE.failed]) {
        playerStop();
    } else if (!audio.paused) {
        requestAnimationFrame(playerTimeUpdate);
    }
}

$audio
    .attr("src", CURRENT_HEARDLE.songUrl)
    .one("canplay", () => {
        $timeduration.text(timer(audio.duration));
        $loading.addClass("hidden");
        $playerbar.removeClass("hidden");

        // Show "Click Play" prompt if no guesses have been made yet
        if (CURRENT_PLAY_STATE.failed === 0) {
            $playprompt.removeClass("hidden");
        }
    })
    .one("error", () => {
        $loading.text("Failed to load today's song. Please double-check your connection and refresh!");
        if (!CURRENT_PLAY_STATE.finished) {
            $loading.append($("<div>").addClass("mb-6").text("If you're sure it's an error on the Heardle instead of on your side, and can't play this round because of it, you can use the button below to skip this round."))
            $loading.append($("<a>").text("SKIP (finish this round, but keep your streak and avoid a fail recorded in your stats)").on("click", () => {
                CURRENT_PLAY_STATE.finished = true;
                savePlayStates();
                STATISTICS.viewed--;
                saveStatistics();
                window.location.reload();
            }));
        }
    });
$control.on("click", controlClicked);

function controlClicked() {
    if (audio.duration > 0 && !audio.paused) {
        playerReset();
    } else {
        playerPlay();
    }
}

function playerPlay() {
    audio.currentTime = 0;
    audio.play();
    $controlpaused.addClass("hidden");
    $controlplaying.removeClass("hidden");
    $playprompt.addClass("hidden");
    requestAnimationFrame(playerTimeUpdate);
}

function playerStop() {
    audio.pause();
    $controlpaused.removeClass("hidden");
    $controlplaying.addClass("hidden");
}

function playerReset() {
    playerStop();
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
                const value = e.detail.selection.value[e.detail.selection.key];
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
    resolveGuess(CURRENT_PLAY_STATE.failed, false, null);
});

function submit() {
    const guess = $field.val();
    // Block input that is not an option in the song pool
    if (SONGPOOL.some(song => song.artistEn + " - " + song.titleEn === guess || song.artistJa + " - " + song.titleJa === guess)) {
        // addToStatistics() is called in the guess submission method instead of reveal()
        // so it is guaranteed a round only gets added to statistics exactly once
        if (guess === CURRENT_HEARDLE.artistEn + " - " + CURRENT_HEARDLE.titleEn || guess === CURRENT_HEARDLE.artistJa + " - " + CURRENT_HEARDLE.titleJa) {
            resolveGuess(CURRENT_PLAY_STATE.failed, true, guess);
        } else {
            resolveGuess(CURRENT_PLAY_STATE.failed, false, guess);
        }
        $field.val("");
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
    if (CURRENT_PLAY_STATE.finished) return;
    CURRENT_PLAY_STATE.guesses.push(guess);
    if (wasCorrect) {
        CURRENT_PLAY_STATE.cleared = true;
        endGame(true);
    } else {
        CURRENT_PLAY_STATE.failed++;
        if (CURRENT_PLAY_STATE.failed >= 6) {
            endGame(false);
        } else {
            showWrongGuess(guessNo, guess);
            prepareNextGuess();
        }
    }
    savePlayStates();
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

    // Mark current guess list row
    $guesslistChildren[CURRENT_PLAY_STATE.failed].addClass("border-custom-line");

    // Show timelimit in / next to play bar
    $playbarlimit.width((LENGTHS[CURRENT_PLAY_STATE.failed] / LENGTHS.at(-1) * 100) + "%");
    $playbarmarkersChildren.forEach(($element, index) => {
        if (index <= CURRENT_PLAY_STATE.failed) {
            $element.removeClass("bg-custom-line bg-custom-mg").addClass("bg-custom-bg");
        } else if (index === CURRENT_PLAY_STATE.failed + 1) {
            $element.removeClass("bg-custom-mg").addClass("bg-custom-line");
        }
    });
    $timelimit.text(timer(LENGTHS[CURRENT_PLAY_STATE.failed]));
}

function updateSkipLabel() {
    if (CURRENT_PLAY_STATE.failed === 5) {
        $skipbutton.text("GIVE UP");
    } else {
        const diff = LENGTHS[CURRENT_PLAY_STATE.failed + 1] - LENGTHS[CURRENT_PLAY_STATE.failed];
        $skipbutton.text("SKIP (+" + diff + "s)");
    }
}

function endGame(success) {
    reveal(success);
    addToStatistics();
    playerReset();
    playerPlay();
}

function reveal(success) {
    // Disallow guessing
    CURRENT_PLAY_STATE.finished = true;
    $guessbar.addClass("hidden");

    // Show result screen
    $guessingscreen.addClass("hidden");
    $resultscreen.removeClass("hidden");
    $clearmessage.text(success ? "You got it!" : "Too bad...");
    $resultmessage.text(success
        ? "You got today's Love Live! Heardle within " + LENGTHS[CURRENT_PLAY_STATE.failed] + (LENGTHS[CURRENT_PLAY_STATE.failed] === 1 ? " second!" : " seconds!")
        : "You didn't get today's Love Live! Heardle. Better luck tomorrow!");
    $resultsongbox.addClass(success ? "bg-custom-positive" : "bg-custom-mg");
    $resultcover.attr("src", CURRENT_HEARDLE.coverUrl).attr("alt", CURRENT_HEARDLE.artistEn + " - " + CURRENT_HEARDLE.titleEn)
    $resultartist.text(CURRENT_HEARDLE.artistEn);
    $resulttitle.text(CURRENT_HEARDLE.titleEn);
    $resultcolorrowChildren.forEach(($element, index) => {
        if (index < CURRENT_PLAY_STATE.failed) {
            if (CURRENT_PLAY_STATE.guesses[index] === null) $element.addClass("bg-custom-fg");
            else $element.addClass("bg-custom-negative");
        } else if (index === CURRENT_PLAY_STATE.failed && success) {
            $element.addClass("bg-custom-correct");
        } else {
            $element.addClass("bg-custom-mg");
        }
    });
    const nextDayTime = FIRST_DAY_DATE + CURRENT_DAY * MS_PER_DAY;
    updateResultTimer(nextDayTime);
    setInterval(updateResultTimer.bind(this, nextDayTime), 1000);

    // Show full song
    $playbarlimit.width("100%");
    $playbarmarkersChildren.forEach(($element) => $element.remove());
    $timelimit.addClass("hidden");
    $timeduration.removeClass("hidden");
}

function updateResultTimer(target) {
    const msLeft = target - Date.now();
    if (msLeft <= 0) {
        $resulttimer.text("NOW! (refresh the page)");
    } else {
        $resulttimer.text(timer(msLeft / 1000));
    }
}

$resultshare.on("click", () => {
    let shareText = "Love Live! Heardle #" + CURRENT_DAY + "\n🔉";
    $resultcolorrowChildren.forEach($element => {
        if ($element.hasClass("bg-custom-fg")) shareText += "️⬜";
        else if ($element.hasClass("bg-custom-negative")) shareText += "🟥️";
        else if ($element.hasClass("bg-custom-correct")) shareText += "🟩️";
        else if ($element.hasClass("bg-custom-mg")) shareText += "️️⬛";
    });
    shareText += "\n#loveliveheardle #lovelive #ラブライブ\nhttps://lovelive-heardle.glitch.me";

    // Firefox for Android does not support sharing text via navigator.share
    // There is no way to programmatically check whether a browser supports sharing text via the native share
    // mechanism, so we simply have to remember to manually remove this when it is implemented in Firefox
    if (navigator.share && !(navigator.userAgent.includes("Firefox") && navigator.userAgent.includes("Android"))) {
        navigator.share({text: shareText});
    } else {
        // PC browsers usually don't have a native share mechanism - just copy it instead
        navigator.clipboard.writeText(shareText)
            .then(() => {
                $resultshare.text("Copied to your Clipboard!");
            })
            .catch((err) => {
                alert("Unable to share or copy text: " + err);
            });
    }
});


/*****
 * Modals
 ****/

$closeModals.on("click", () => {
    $modals.addClass("hidden");
    $modalsChildren.forEach($element => $element.addClass("hidden"));
});

// Stop propagation of click events for each modal, so clicks within in the modal itself don't close it
$modalsChildren.forEach($element => $element.on("click", (e) => {
    e.stopPropagation();
}));

$openAbout.on("click", () => {
    $modals.removeClass("hidden");
    $modalAbout.removeClass("hidden");
});

$openAnnounce.on("click", () => {
    $modalAnnounceTitle.text(CURRENT_ANNOUNCEMENT.title);
    $modalAnnounceDate.text(CURRENT_ANNOUNCEMENT.date);
    $modalAnnounceText.html(CURRENT_ANNOUNCEMENT.text);

    $modals.removeClass("hidden");
    $modalAnnounce.removeClass("hidden");
    $openAnnounceRead.removeClass("hidden");
    $openAnnounceUnread.addClass("hidden");

    localStorage.setItem("last_announcement_no", CURRENT_ANNOUNCEMENT.announcementNo);
});
if (isNaN(LAST_ANNOUNCEMENT) || CURRENT_ANNOUNCEMENT.announcementNo > LAST_ANNOUNCEMENT) {
    $openAnnounceRead.addClass("hidden");
    $openAnnounceUnread.removeClass("hidden");
}

$openStats.on("click", () => {
    const maxBar = STATISTICS.byFailCount.reduce((max, value) => value > max ? value : max, 0);
    if (maxBar > 0) {
        $modalStatsBars.forEach(($element, index) => {
            if (STATISTICS.byFailCount[index] > 0) {
                $element.css("height", (STATISTICS.byFailCount[index] / maxBar * 100) + "%").addClass("border-b-2");
            }
            if (CURRENT_PLAY_STATE.finished && CURRENT_PLAY_STATE.failed === index) {
                $element.removeClass("bg-custom-mg").addClass("bg-custom-positive").removeClass("border-custom-mg").addClass("border-custom-positive");
            }
        });
    }
    $modalStatsCounters.forEach(($element, index) => {
        $element.text(STATISTICS.byFailCount[index]);
    });

    if (CURRENT_PLAY_STATE.finished) {
        $modalStatsBars[CURRENT_PLAY_STATE.failed]
            .removeClass("bg-custom-mg").addClass("bg-custom-positive").removeClass("border-custom-mg").addClass("border-custom-positive");
        $modalStatsCounters[CURRENT_PLAY_STATE.failed]
            .addClass("font-semibold").removeClass("text-custom-fg").addClass("text-custom-positive");
        $modalStatsLabels[CURRENT_PLAY_STATE.failed]
            .addClass("font-semibold").removeClass("text-custom-fg").addClass("text-custom-positive");
    }

    $modalStatsViewed.text(STATISTICS.viewed);
    $modalStatsCleared.text(STATISTICS.cleared);
    $modalStatsWinRate.text(STATISTICS.viewed === 0 ? "-" : ((STATISTICS.cleared / STATISTICS.viewed * 100).toFixed(1) + "%"));
    $modalStatsCurrentStreak.text(STATISTICS.currentStreak);
    $modalStatsHighestStreak.text(STATISTICS.highestStreak);

    $modals.removeClass("hidden");
    $modalStats.removeClass("hidden");
});

$openHelp.on("click", () => {
    $modals.removeClass("hidden");
    $modalHelp.removeClass("hidden");
});
if (IS_FIRST_PLAY) {
    // First ever play? Show help modal
    $openHelp.trigger("click");
}

// TODO: remove reset button


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


// Once everything is prepared, fade in
$fadeout.fadeOut(250);
setTimeout(() => $fadeouttext.fadeIn(250), 2000);
setTimeout(() => $fadeoutwarning.fadeIn(250), 10000);