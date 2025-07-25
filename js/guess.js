/*****
 * Guessing
 ****/

$field.on("keydown", (e) => {
	$invalidnote.addClass("opacity-0").text("").removeClass("error");
	if (e.key === "Enter" && !e.originalEvent.repeat) submit();
});

function punctuationFullWidthToHalfWidth(s) {
	return s
		.replace(/[\uFF00-\uFF5E]/g, function (char) {
			return String.fromCharCode(32 /* space */ + (char.charCodeAt(0) - 65280) /* start of fullwidth block */);
		})
		.replace(/　/g /* fullwidth space is U+3000, not U+FF00 */, " ");
}

const autoCompleteInstance = new autoComplete({
	selector: "#field",
	data: {
		src: SONGPOOL.map((song) => ({
			en: punctuationFullWidthToHalfWidth(song.artistEn + " - " + song.titleEn),
			ja: punctuationFullWidthToHalfWidth(song.artistJa + " - " + song.titleJa),
			origEn: song.artistEn + " - " + song.titleEn,
			origJa: song.artistJa + " - " + song.titleJa,
		})),
		cache: false,
		// If the player's browser is set to Japanese, prefer Japanese song titles, otherwise prefer English
		// (No matter what, the other language will still show up for autocomplete suggestions if you enter it)
		keys: navigator.language.startsWith("ja") ? ["ja", "en"] : ["en", "ja"],
		filter: (list) => {
			if (list.length === 0) {
				// Show "no results"
				return [{ match: "No matching songs found", value: undefined, key: undefined }];
			}

			// This function uses autoComplete.js as only a first step - it doesn't rank results, just filters them
			// So here we make sure to show every song only once at most, and then sort the results by quality

			// Remove dupes (if both EN and JA titles match, the song will appear twice - only keep the first one)
			const foundValues = new Set();
			list = list.filter((result) => {
				if (foundValues.has(result.value)) return false;
				foundValues.add(result.value);
				return true;
			});

			// Rank results by bigram similarity (bigram: every substring of two letters)
			const searchQuery = $field.val();
			// 1) Split the search query into bigrams
			const queryBigrams = makeBigrams(searchQuery.toLowerCase());
			list.forEach((result) => {
				// 2) Split each result into bigrams
				const resultBigrams = makeBigrams(result.value[result.key].toLowerCase());

				// 3) Search how many of the bigrams of each result appear in the bigrams of the search query
				let hits = 0;
				queryBigrams.forEach((queryBigram) => {
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
		},
	},
	query: (input) => {
		return punctuationFullWidthToHalfWidth(input);
	},
	threshold: 1,
	wrapper: false,
	resultsList: {
		maxResults: 6,
		tabSelect: true,
	},
	diacritics: true,
	noresults: true,
	searchEngine: "loose",
	resultItem: {
		highlight: true,
		element: (list, data) => {
			// Add random number to element IDs - screen reader might only read options out if the ID is different
			list.id += "_" + Math.random().toString().substring(2, 5);
		},
	},
	events: {
		input: {
			results: (e) => {
				if (e.detail.results.length > 0) requestAnimationFrame(() => autoCompleteInstance.goTo(0));
			},
			selection: (e) => {
				if ($field.val() === "" || e.detail.selection.key === undefined) return;
				const value = e.detail.selection.value[e.detail.selection.key === "ja" ? "origJa" : "origEn"];
				$field.val(value).focus();
			},
		},
	},
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

const VALID_INPUTS = new Set(
	SONGPOOL.flatMap((song) => [song.artistEn + " - " + song.titleEn, song.artistJa + " - " + song.titleJa])
);

function submit() {
	const guess = $field.val();
	// Block input that is not an option in the song pool
	if (!VALID_INPUTS.has(guess)) {
		if ($field.attr("aria-expanded") === "false") {
			$invalidnote
				.removeClass("opacity-0")
				.text("That's an invalid guess! You must pick an option from the list!")
				.addClass("error");
		}
		return;
	}
	// addToStatistics() is called in the guess submission method instead of reveal()
	// so it is guaranteed a round only gets added to statistics exactly once
	if (
		guess === CURRENT_HEARDLE.artistEn + " - " + CURRENT_HEARDLE.titleEn ||
		guess === CURRENT_HEARDLE.artistJa + " - " + CURRENT_HEARDLE.titleJa
	) {
		resolveGuess(CURRENT_PLAY_STATE.failed, true, guess);
	} else {
		resolveGuess(CURRENT_PLAY_STATE.failed, false, guess);
	}
	$field.val("");
}

$submitbutton.on("click", submit);

$fieldclear.on("click", () => {
	$field.val("");
});
