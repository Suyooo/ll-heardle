/*****
 * Modals
 ****/

function closeModals() {
    if ($modals.hasClass("hidden")) return;
    $modals.addClass("hidden");
    $modalsChildren.forEach($element => $element.addClass("hidden"));
    $makeInert.removeAttr("aria-hidden").removeAttr("disabled").removeAttr("tabindex");
    if (returnFocus) {
        returnFocus.focus();
        returnFocus = null;
    }
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModals();
})

$makeInert = $("*", $("#guessingscreen, #resultscreen, #playerbar, header"));

let returnFocus = null;
$closeModals.on("click", closeModals);

// Stop propagation of click events for each modal, so clicks within in the modal itself don't close it
$modalsChildren.forEach($element => $element.on("click", (e) => {
    e.stopPropagation();
}));

$openAbout.on("click", () => {
    $modals.removeClass("hidden");
    $modalAbout.removeClass("hidden");
    $makeInert.attr("aria-hidden", "true").attr("disabled", "true").attr("tabindex","-1");
    returnFocus = $openAbout;
    $(".close-modals button", $modalAbout).focus();
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
    $makeInert.attr("aria-hidden", "true").attr("disabled", "true").attr("tabindex","-1");
    returnFocus = $openAnnounce;
    $(".close-modals button", $modalAnnounce).focus();
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
    $makeInert.attr("aria-hidden", "true").attr("disabled", "true").attr("tabindex","-1");
    returnFocus = $openStats;
    $(".close-modals button", $modalStats).focus();
});

$openHelp.on("click", () => {
    $modals.removeClass("hidden");
    $modalHelp.removeClass("hidden");
    $makeInert.attr("aria-hidden", "true").attr("disabled", "true").attr("tabindex","-1");
    returnFocus = $openHelp;
    $("button.close-modals", $modalHelp).focus();
});
if (IS_FIRST_PLAY) {
    // First ever play? Show help modal
    $openHelp.trigger("click");
}