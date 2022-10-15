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