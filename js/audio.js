/*****
 * Audio Player
 ****/

function playerTimeUpdate() {
    $timecurrent.text(timer(audio.currentTime));
    const playProgress = audio.currentTime / (CURRENT_PLAY_STATE.finished ? audio.duration : LENGTHS.at(-1));
    $playbarcurrent.width((playProgress * 100) + "%");
    if (!CURRENT_PLAY_STATE.finished && audio.currentTime >= LENGTHS[CURRENT_PLAY_STATE.failed]) {
        $playbarcurrent.width((LENGTHS[CURRENT_PLAY_STATE.failed] / LENGTHS.at(-1) * 100) + "%");
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
        $loading.html("<b>Failed to load today's song. Please double-check your connection and refresh!</b>");
        if (!CURRENT_PLAY_STATE.finished) {
            $loading.append($("<div>").addClass("mt-6 text-xs")
                .text("If you're sure it's an error on the Heardle instead of on your side, and can't play this " +
                    "round because of it, ")
                .append($("<a>").attr("role", "button")
                    .html("click here to give up on this round. You will keep your current streak, and you won't get a " +
                        "fail recorded in your stats. You cannot undo this!")
                    .on("click", () => {
                        CURRENT_PLAY_STATE.finished = true;
                        savePlayStates();
                        STATISTICS.viewed--;
                        saveStatistics();
                        window.location.reload();
                    })));
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