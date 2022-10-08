const tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('ytplayer', {
        height: '80',
        width: '100%',
        videoId: VID,
        'endSeconds': 1,
        playerVars: {
            'controls': 0, 'disablekb': 1, 'fs': 0, 'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady, 'onError': onError, 'onStateChange': onStateChange
        }
    });
}

function onError(event) {
    if (event.data === 150) { // Region blocked error code
        $("#note").text("Oh no the official uploads seem to be blocked in your region - I'll try to add a workaround at some point, sorry");
    } else {
        $("#note").text("Something on the YouTube player went wrong, try refreshing or something I guess?");
    }
}

function onPlayerReady(event) {
    // Make sure to set everything up here since the player can't see the YouTube player
    player.setPlaybackRate(1);
    player.setVolume(100);
    player.unMute();
    if (!state.finished) setIntroLength();
}

let isPlaying = false;

function onStateChange(event) {
    const control = $("#control");
    if (control !== null) {
        if (event.data === YT.PlayerState.PLAYING) control.val("...");
        else if (event.data === YT.PlayerState.BUFFERING) control.val("Loading...");
        else control.val("Play");

        isPlaying = event.data === YT.PlayerState.PLAYING;
    } else {
        isPlaying = false;
    }
}

setInterval(() => {
    if (isPlaying) $("#playbar").width((player.getCurrentTime()/0.16) + "%");
}, 100);

// So here's a fun thing with some browsers
// The YouTube Iframe player sets MediaSession metadata and there's nothing you can do about it
// And some browsers decide to show that info instead of reporting which tab is playing audio for some reason
// This is an attempt to get around it: Just play silent audio, and just pray it overrides the Iframe metadata
// Spoilers: there's some browsers where that works, but yet other browsers just ignore it
// this api sucks
const aud = new Audio("empty.mp3");
setInterval(() => {
    navigator.mediaSession.metadata = new MediaMetadata({
        title: 'LL Heardle',
        artist: 'No spoilers here :)'
    });
}, 500);

function playClick() {
    aud.loop = true;
    aud.play();

    if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
        player.playVideo();
    }
}

function setIntroLength() {
    // Did I mention this was originally a project slapped together in 4 hours
    // and that's why you might find some things in places where they really shouldn't be?
    $("#length")[0].className = "f" + state.failed;
    $("#guesscount").text("Guess " + (state.failed === 6 ? 6 : state.failed + 1) + " of 6");
    player.cueVideoById({'videoId': VID, 'endSeconds': LENGTHS[state.failed]});
}