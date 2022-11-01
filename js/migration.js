/*****
 * Old Heardle Migration
 ****/

if (window.location.hash === "#reimport" ||
    (localStorage.getItem("old_heardle_reimport") === null && localStorage.getItem("old_heardle_userstats") !== null)) { // TODO remove
    window.history.replaceState(null, null, "/");
    localStorage.setItem("userStats", localStorage.getItem("old_heardle_userstats"));
}

if (localStorage.getItem("userStats") !== null) {
    try {
        // Old Heardle data available. Bring it over!
        const oldInfoString = localStorage.getItem("userStats");
        localStorage.setItem("old_heardle_userstats", oldInfoString); // back it up, just in case
        const oldInfo = JSON.parse(oldInfoString);

        const deleteDays = new Set();

        // While we're recreating the stats anyways, let's fix some unfair problems
        // Day 168: Kaguya no Shiro de Odoritai, but the linked song was taken down and nobody could play
        //  This day is removed all together, since it wasn't fixed at all
        // Day 173: A placeholder was used as a Heardle and you literally had to guess "Placeholder"
        //  This one was later replaced with Watashitachi wa Mirai no Hana, so this day is not removed if you
        //  checked back in later to find the fixed Heardle - otherwise, don't count the streak break
        // Day 188: eienfriendz closes Heardle, gets taken over by Kach later - but that is still an unfair break
        //  This is handled slightly different - the streak is kept even if the player was gone multiple days since then
        //  since they might not have heard about the Heardle site returning for a while
        // Day 199: Similar to above - answer pool ran out, was later replaced with in this unstable world
        //  If one of those days is missing after removal, the streak count below will consider those non-breaks
        const newPlayStates = oldInfo
            .filter(oldState => !(oldState.id === 167
                || (oldState.id === 172 && oldState.guessList.length === 0)
                || (oldState.id === 187 && oldState.guessList.length === 0)
                || (oldState.id === 198 && oldState.guessList.length === 0)))
            .map(oldState => {
                const newState = {
                    day: oldState.id + 1,
                    heardle_id: OLD_HEARDLE_ROUNDS[oldState.id],
                    guesses: oldState.guessList.map(guess => {
                        if (guess.isSkipped) return null;
                        const song = SONGPOOL[OLD_HEARDLE_MAP[guess.answer]];
                        return song ? song.artistEn + " - " + song.titleEn : guess.answer;
                    }),
                    played: true,
                    cleared: oldState.guessList.some(guess => guess.isCorrect)
                }
                newState.failed = newState.guesses.length - (newState.cleared ? 1 : 0);
                newState.finished = newState.cleared || newState.failed === 6 || newState.day !== CURRENT_DAY;
                if (newState.finished && newState.failed < 6 && !newState.cleared) {
                    // Old Heardle did not count unfinished rounds as failed
                    // As such, we do not count them as fails for imports either - just as a skip
                    // And the best way to do that is to pretend this round does not exist
                    // (This will get filtered out of the array after the map() finishes)
                    deleteDays.add(newState.day);
                    return null;
                }
                return newState;
            }).filter(s => s !== null);

        // Make sure we don't delete in-progress Heardles on the new script
        const existingStates = JSON.parse(localStorage.getItem("play_states")) || [];

        // Merge priority: old save > new save
        const mergedPlayStates = [];
        for (let day = 1; day <= CURRENT_DAY; day++) {
            const oldSave = newPlayStates.find(s => s.day === day);
            const newSave = existingStates.find(s => s.day === day && s.guesses);
            if (newSave && !deleteDays.has(day) && (!oldSave || !oldSave.finished)) {
                mergedPlayStates.push(newSave);
                continue;
            }
            if (oldSave && !deleteDays.has(day)) {
                mergedPlayStates.push(oldSave);
            }
        }
        localStorage.setItem("play_states", JSON.stringify(mergedPlayStates));

        const newStatistics = {
            byFailCount: [0, 0, 0, 0, 0, 0, 0],
            viewed: 0,
            cleared: 0,
            currentStreak: 0,
            highestStreak: 0
        };

        let lastDay = 0;
        for (const state of mergedPlayStates) {
            if (!state.finished) continue;
            if (state.played !== false) newStatistics.viewed++; // TODO remove the !== false
            if (!state.cleared || state.day - lastDay > 1) {
                // Skip unfair streak breaks (see above)
                if (!(state.day === 169 && lastDay === 167) && !(state.day === 174 && lastDay === 172) &&
                    !(lastDay === 186) && !(state.day === 200 && lastDay === 198)) {
                    newStatistics.currentStreak = 0;
                }
            }
            if (state.cleared) {
                newStatistics.cleared++;
                newStatistics.currentStreak++;
                if (newStatistics.currentStreak > newStatistics.highestStreak) {
                    newStatistics.highestStreak = newStatistics.currentStreak;
                }
                newStatistics.byFailCount[state.failed]++;
            } else {
                newStatistics.byFailCount[6]++;
            }
            lastDay = state.day;
        }
        localStorage.setItem("statistics", JSON.stringify(newStatistics));

        // Migration successful, remove old keys
        localStorage.removeItem("userStats");
        localStorage.removeItem("firstTime");
        localStorage.setItem("old_heardle_reimport","true");
    } catch (e) {
        alert("We tried migrating your Heardle save data to a new format, but there was a problem.\nDon't worry, your" +
            " old save data is still there, so you can keep playing - once we fix this, we'll just add your old data" +
            " on top of the new one you create from now on!\n" +
            "Please contact us on Twitter so we know something is wrong. You can find the links by pressing the info" +
            " button in the top left of the site!\n\nLet us know the following:\n" + e);
    }
}