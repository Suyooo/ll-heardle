const fs=require("fs");

fs.writeFileSync("songpool.json",JSON.stringify(SONGPOOL.map(e => {
    const l = listenOn.find(l => l.titleEn === e.titleEn);
    if (l === undefined) {
        console.log(e);
        process.exit(1);
    }
    if (e.songUrl === "") e.startOnDay = 999999;
    if (l === {}) return e;
    return {...e, listenOn: {spotify:l.spotify,youtube:l.youtube}};
}),null,4));
