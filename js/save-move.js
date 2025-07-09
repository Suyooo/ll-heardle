/*****
 * Import/export save data
 ****/

if (window.location.hash === "#export-save") {
    // Show save data for copying
    // It's shown as a textarea and has to be copied manually - which is somewhat awkward, but it's a good solution for
    // this case: it works on both insecure and secure connections, and works on mobile without having to open console
    window.history.replaceState(null, "", "/");
    const saveDataDiv = $("<div>").addClass("text-xs flex flex-col");
    const saveDataTextarea = $("<textarea>").addClass("mt-6 mb-6 h-32")
        .val(`{"playStates":` + localStorage.getItem("play_states") + `,"statistics":` + localStorage.getItem("statistics") + `}`);
    saveDataTextarea.on("focus", () => saveDataTextarea.select());
    saveDataDiv.append(saveDataTextarea);
    saveDataDiv.append($("<span>").text("🡅 This is your save data. Make sure to select all to copy the entire thing! 🡅"));
    $("main").prepend(saveDataDiv);
    requestAnimationFrame(() => saveDataTextarea.select());
} else if (window.location.hash === "#import-save") {
    // Prompt for data and load
    window.history.replaceState(null, "", "/");
    const movingSaveData = prompt("Please paste your save data here to load it.\n\n" +
        "WARNING: Any save data you have will be overwritten! (Click Cancel if you don't want that)");
    if (movingSaveData) {
        let saveDataParsed;
        try {
            saveDataParsed = JSON.parse(movingSaveData);
            if (saveDataParsed["playStates"]) {
                localStorage.setItem("play_states", JSON.stringify(saveDataParsed["playStates"]));
            }
            if (saveDataParsed["statistics"]) {
                localStorage.setItem("statistics", JSON.stringify(saveDataParsed["statistics"]));
            }
            alert("Save data move successful! Please check the Stats dialog in the top right to double-check!")
        } catch (e) {
            alert("There was a problem moving your save data. If the error contains something like \"JSON\", make " +
                "sure you copied and pasted all of the text from the insecure site. If you did, or there's a " +
                "different error, please let us know and we'll help! @Suyo_ on Twitter\n\nThe error was:\n" + e);
        }
    }
}