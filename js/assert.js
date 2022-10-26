// Some functions for the testing phase.

const HEADER = "Hi! Thanks for testing the new version of LL! Heardle - we managed to find a problem with your save " +
    "file.\n Please let Kach or Suyooo know the following so we can fix it:\n\n"

if (PLAY_STATES.length < CURRENT_DAY) {
    alert(HEADER + "Save file is too short");
} else if (PLAY_STATES.length > CURRENT_DAY) {
    alert(HEADER + "Save file is too long");
} else {
    const actualHeardles = PLAY_STATES.map(s => s.heardle_id);
    const expectedHeardles = OLD_HEARDLE_ROUNDS.slice(0, actualHeardles.length);
    if (actualHeardles[204] === 398) actualHeardles[204] = 328; // don't panic on our first few tests
    if (actualHeardles.some((h, i) => h !== expectedHeardles[i])) {
        alert(HEADER + "Heardle IDs in save file differ from what they should be");
    } else {
        const actualList = new Array(10).fill(undefined).map((_, i) => getHeardleIdForDay(230 + i));
        let expectedList;
        if (CURRENT_DAY >= 206 && CURRENT_DAY <= 208) expectedList = [400,125,400,394,377,117,364,419,351,439];
        else if (CURRENT_DAY === 209 || CURRENT_DAY === 210) expectedList = [410,125,68,394,377,117,364,419,351,439];
        if (expectedList && actualList.some((h, i) => h !== expectedList[i])) {
            alert(HEADER + "Heardle IDs rolled in the future differ from the expected ones: " + actualList);
        }
    }
}