/*****
 * Grab element references
 ****/

const $fadeout = $("#fadeout");

const $playerbar = $("#playerbar");
const $loading = $("#loading");
const $audio = $("#audio_player");
const audio = $audio[0];

const $guessbar = $("#guessbar");
const $field = $("#field");
const $fieldclear = $("#fieldclear");
const $skipbutton = $("#skipbutton");
const $submitbutton = $("#submitbutton");
const $invalidnote = $("#invalidnote");
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
const $resultspotify = $("#resultspotify");
const $resultyoutube = $("#resultyoutube");
const $clearmessage = $(".clearmessage");
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