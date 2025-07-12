/*****
 * UI
 ****/

function resolveGuess(guessNo, wasCorrect, guess) {
	if (CURRENT_PLAY_STATE.finished) return;
	markPlayed();
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
	const reader = styleVisuallyHidden().text(guess === null ? "The turn was" : "Wrong Guess: ");
	const text = guess === null ? styleGuessRowTitleSkipped().text("SKIPPED") : styleGuessRowTitleSong().text(guess);
	guesslistRow
		.append(styleGuessRowSymbol().append(symbol))
		.append(styleGuessRowTitle().append(text))
		.removeClass("border-custom-line");
	if (reader !== null) {
		text.prepend(reader);
	}
}

function prepareNextGuess() {
	updateSkipLabel();

	// Mark current guess list row
	$guesslistChildren[CURRENT_PLAY_STATE.failed].addClass("border-custom-line");

	// Show timelimit in / next to play bar
	$playbarlimit.width((LENGTHS[CURRENT_PLAY_STATE.failed] / LENGTHS[5]) * 100 + "%");
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

	$resultmessage.html(
		success
			? 'You got today\'s Love Live<span aria-hidden="true">!</span> Heardle within ' +
					LENGTHS[CURRENT_PLAY_STATE.failed] +
					(LENGTHS[CURRENT_PLAY_STATE.failed] === 1 ? " second!" : " seconds!")
			: "You didn't get today's Love Live<span aria-hidden=\"true\">!</span> Heardle. Better luck tomorrow!"
	);
	$resultsongbox.addClass(success ? "bg-custom-positive" : "bg-custom-mg");
	if (CURRENT_HEARDLE.coverUrl === "") {
		$resultcover.remove();
	} else {
		$resultcover
			.attr("src", CURRENT_HEARDLE.coverUrl)
			.attr("alt", CURRENT_HEARDLE.artistEn + " - " + CURRENT_HEARDLE.titleEn);
	}
	$resultartist.text(CURRENT_HEARDLE.artistEn);
	$resulttitle.text(CURRENT_HEARDLE.titleEn);

	if (CURRENT_HEARDLE.listenOn.spotify) {
		$resultspotify.removeClass("hidden").attr("href", CURRENT_HEARDLE.listenOn.spotify);
	}
	if (CURRENT_HEARDLE.listenOn.youtube) {
		$resultyoutube.removeClass("hidden").attr("href", CURRENT_HEARDLE.listenOn.youtube);
	}

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
	const nextDayDate = new Date(FIRST_DAY_TIME);
	nextDayDate.setDate(nextDayDate.getDate() + CURRENT_DAY);
	const nextDayTime = nextDayDate.getTime();
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

function isDesktop() {
	return (
		!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) &&
		// iOS 13 stopped reporting iPad in the userAgent because that is good design thanks apple
		!(navigator.userAgent.includes("Mac") && "ontouchend" in document)
	);
}

$resultshare.on("click", () => {
	let shareText = "Love Live! Heardle #" + CURRENT_DAY + "\n\ud83d\udd09";
	$resultcolorrowChildren.forEach(($element) => {
		if ($element.hasClass("bg-custom-fg")) shareText += "\u2b1b";
		else if ($element.hasClass("bg-custom-negative")) shareText += "\ud83d\udfe5";
		else if ($element.hasClass("bg-custom-correct")) shareText += "\ud83d\udfe9";
		else if ($element.hasClass("bg-custom-mg")) shareText += "\u2b1c";
	});
	shareText += "\n#LoveLiveHeardle #lovelive #ラブライブ\nhttps://llheardle.suyo.be";

	if (
		navigator.share &&
		navigator.canShare({ text: shareText }) &&
		!isDesktop() &&
		// Firefox for Android does not support sharing text via navigator.share
		// There is no way to programmatically check whether a browser supports sharing text via the native share
		// mechanism, so we simply have to remember to manually remove this when it is implemented in Firefox
		!navigator.userAgent.includes("Firefox")
	) {
		navigator.share({ text: shareText });
	} else {
		// PC browsers usually don't have a native share mechanism - just copy it instead
		navigator.clipboard
			.writeText(shareText)
			.then(() => {
				$resultshare.text("Copied to your Clipboard!");
			})
			.catch((err) => {
				alert("Unable to share or copy your result: " + err);
			});
	}
});

// Once everything is prepared, fade in
$fadeout.fadeOut(250);
