/*****
 * Old Heardle Migration
 ****/

if (localStorage.getItem("userStats") !== null) {
    try {
        // Old Heardle data available. Bring it over!
        const oldInfoString = localStorage.getItem("userStats");
        localStorage.setItem("old_heardle_userstats", oldInfoString); // back it up, just in case
        const oldInfo = JSON.parse(oldInfoString);

        function findHeardleIdFromOldHeardleSongTitle(title) {
            for (const [index, song] of SONGPOOL.entries()) {
                // Artist might differ
                if (title === song.titleEn || title.endsWith(" - " + song.titleEn) || title.endsWith(" - " + song.titleEn + " / " + song.titleJa)) {
                    return index;
                }
            }
            throw new Error("Unable to find new Heardle ID for title " + title);
        }

        // While we're recreating the stats anyways, let's fix some unfair problems
        // Day 168: Kaguya no Shiro de Odoritai, but the linked song was taken down and nobody could play
        //  This day is removed all together, since it wasn't fixed at all
        // Day 173: A placeholder was used as a Heardle and you literally had to guess "Placeholder"
        //  This one was later replaced with Watashitachi wa Mirai no Hana, so this day is not removed if you
        //  checked back in later to find the fixed Heardle - otherwise, don't count the streak break
        // If one of those days is missing after removal, the streak count below will consider those non-breaks
        const newPlayStates = oldInfo
            .filter(oldState => !(oldState.id === 167 || (oldState.id === 172 && oldState.guessList.length === 0)))
            .map(oldState => {
                if (oldState.id === 172) {
                    oldState.correctAnswer = "Sonoda Umi - Watashitachi wa Mirai no Hana / \u79c1\u305f\u3061\u306f\u672a\u6765\u306e\u82b1";
                }
                const newState = {
                    day: oldState.id + 1,
                    heardle_id: findHeardleIdFromOldHeardleSongTitle(oldState.correctAnswer),
                    guesses: oldState.guessList.map(guess => {
                        if (guess.isSkipped) return null;
                        try {
                            const song = SONGPOOL[findHeardleIdFromOldHeardleSongTitle(guess.answer)];
                            return song.artistEn + " - " + song.titleEn;
                        } catch (e) {
                            // Misspelled guess - old heardle didn't allow existing songs only, so in that case,
                            // just take the title as-is
                            return guess.answer;
                        }
                    }),
                    cleared: oldState.guessList.some(guess => guess.isCorrect)
                }
                newState.failed = newState.guesses.length - (newState.cleared ? 1 : 0);
                newState.finished = newState.cleared || newState.failed === 6 || newState.day !== CURRENT_DAY;
                return newState;
            });

        // Make sure we don't delete in-progress Heardles on the new script
        const existingStates = JSON.parse(localStorage.getItem("play_states"));
        if (existingStates !== null) {
            for (const existingState of existingStates) {
                if (!newPlayStates.some(otherState => otherState.day === existingState.day)) {
                    newPlayStates.push(existingState);
                }
            }
        }
        localStorage.setItem("play_states", JSON.stringify(newPlayStates));

        const newStatistics = {
            byFailCount: [0, 0, 0, 0, 0, 0, 0],
            viewed: newPlayStates.length,
            cleared: 0,
            currentStreak: 0,
            highestStreak: 0
        };

        let lastDay = 0;
        for (const state of newPlayStates) {
            if (!state.finished) continue;
            if (!state.cleared || state.day - lastDay > 1) {
                // Skip unfair streak breaks (see above)
                if (!(state.day === 169 && lastDay === 167) &&
                    !(state.day === 174 && lastDay === 172)) {
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