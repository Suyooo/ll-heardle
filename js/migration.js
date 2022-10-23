/*****
 * Old Heardle Migration
 ****/

if (localStorage.getItem("userStats") !== null) {
    try {
        // Old Heardle data available. Bring it over!
        const oldInfoString = localStorage.getItem("userStats");
        localStorage.setItem("old_heardle_userstats", oldInfoString); // back it up, just in case
        const oldInfo = JSON.parse(oldInfoString);

        // While we're recreating the stats anyways, let's fix some unfair problems
        // Day 168: Kaguya no Shiro de Odoritai, but the linked song was taken down and nobody could play
        //  This day is removed all together, since it wasn't fixed at all
        // Day 173: A placeholder was used as a Heardle and you literally had to guess "Placeholder"
        //  This one was later replaced with Watashitachi wa Mirai no Hana, so this day is not removed if you
        //  checked back in later to find the fixed Heardle - otherwise, don't count the streak break
        // Day 199: Similar to above - answer pool ran out, was later replaced with in this unstable world
        // If one of those days is missing after removal, the streak count below will consider those non-breaks
        const newPlayStates = oldInfo
            .filter(oldState => !(oldState.id === 167
                || (oldState.id === 172 && oldState.guessList.length === 0)
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
                    cleared: oldState.guessList.some(guess => guess.isCorrect)
                }
                newState.failed = newState.guesses.length - (newState.cleared ? 1 : 0);
                newState.finished = newState.cleared || newState.failed === 6 || newState.day !== CURRENT_DAY;
                return newState;
            });

        // Make sure we don't delete in-progress Heardles on the new script
        const existingStates = JSON.parse(localStorage.getItem("play_states")) || [];

        // Merge priority: new save > old save > dummy entry (unless current day)
        const mergedPlayStates = [];
        for (let day = 0; day <= CURRENT_DAY; day++) {
            const newSave = existingStates.find(s => s.day === day);
            if (newSave) {
                mergedPlayStates.push(newSave);
                continue;
            }
            const oldSave = newPlayStates.find(s => s.day === day);
            if (oldSave) {
                mergedPlayStates.push(oldSave);
                continue;
            }
            if (day < CURRENT_DAY) {
                if (day <= OLD_HEARDLE_ROUNDS.length) {
                    mergedPlayStates.push({
                        day, heardle_id: OLD_HEARDLE_ROUNDS[day - 1]
                    });
                } else {
                    mergedPlayStates.push({
                        day, heardle_id: getHeardleIdForDay(day, mergedPlayStates)
                    });
                }
            }
        }
        localStorage.setItem("play_states", JSON.stringify(mergedPlayStates));

        const newStatistics = {
            byFailCount: [0, 0, 0, 0, 0, 0, 0],
            viewed: mergedPlayStates.length,
            cleared: 0,
            currentStreak: 0,
            highestStreak: 0
        };

        let lastDay = 0;
        for (const state of mergedPlayStates) {
            if (!state.finished) continue;
            if (!state.cleared || state.day - lastDay > 1) {
                // Skip unfair streak breaks (see above)
                if (!(state.day === 169 && lastDay === 167) &&
                    !(state.day === 174 && lastDay === 172) &&
                    !(state.day === 200 && lastDay === 198)) {
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
    } catch (e) {
        alert("We tried migrating your Heardle save data to a new format, but there was a problem.\nDon't worry, your" +
            " old save data is still there, so you can keep playing - once we fix this, we'll just add your old data" +
            " on top of the new one you create from now on!\n" +
            "Please contact us on Twitter so we know something is wrong. You can find the links by pressing the info" +
            " button in the top left of the site!\n\nLet us know the following:\n" + e);
    }
}