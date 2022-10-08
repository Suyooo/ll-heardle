function buttonlabel() {
    if (songfield.value === "") {
        if (state.failed === 5) {
            $("#send").val("Give Up");
        } else {
            const diff = LENGTHS[state.failed + 1] - LENGTHS[state.failed];
            $("#send").val("Skip (+" + diff + " second" + (diff === 1 ? "" : "s") + ")");
        }
    } else {
        $("#send").val("Send");
    }
}

function submit() {
    const guess = songfield.value;
    // Block input that is not an autocompleted option
    const option = $("select[name='song'] option").toArray().filter(e => e.innerText === guess);
    if (guess === "" || option.length > 0) {
        const guessEl = document.createElement('div');
        let guessText;
        // addToStatistics() is called in the guess submission method instead of reveal()
        // so it is guaranteed a round only gets added to statistics exactly once
        if (guess === THE_CORRECT_ONE) {
            state.cleared = true;
            guessText = "🟩 " + guess;
            reveal(true, guess);
            addToStatistics();
        } else {
            state.failed++;
            if (guess === "") {
                guessText = "⬜ (skip)";
            } else {
                guessText = "🟥 " + guess;
            }
            if (state.failed >= 6) {
                reveal(false, guess);
                addToStatistics();
            } else {
                setIntroLength();
                songfield.value = "";
                buttonlabel();
                $("#note").text("");
            }
        }
        guessEl.innerHTML = guessText;
        state.guesses.push(guessText);
        $("#guesses").append(guessEl);
        saveTodayState();
    } else {
        $("#note").text("Please pick one of the options (or leave the field empty to skip)");
    }
}

function reveal(success, lastGuess) {
    state.finished = true;
    $("#player").show();
    $("#playeranswer").text("#" + DAY + ": " + THE_CORRECT_ONE);
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

const fuseOptions = {keys: ["titleEn", "artistEn"]};
const options = {display: (e) => e["titleEn"] + " - " + e["artistEn"], key: "videoId", fuseOptions: fuseOptions};
const songfield = $("#song")[0];
$(songfield).fuzzyComplete(Object.keys(songlist).map(k => songlist[k]), options);

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
});