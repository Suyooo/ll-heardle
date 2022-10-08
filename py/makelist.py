import secret
import json,requests

skips = [
    "g2pjeFGzNxA", "Ks4u5CTpwWI", "f2Dv1LPGrWA", # LIVE with a smile! Single Group versions
    "boF0DlenaNI", "RDKF2QSZZCE", "UJfTbukYRAo", # Radio singles dupes

    "ehHtYrRy9a0", # START:DASH!! 3 member ver.
    "c9Y6z9YAHEI", # "SUNNY DAY SONG (Movie Edit)"

    "O1gllrl79Vc", "BIUGlO_8M14", "tQJ6H9p4t5A", # Jump up HIGH!! Subunit versions
    "gSsTtbe8bnw", "EAsyHX-H8fU", "evu0uohx_Gs", # Hop Step Waai! Subunit versions
    "pikKBS4j3HU", # Nando datte YAKUSOKU! (Solo Ver.)
    "tMvs02DIKko", "zHxrToEB-lQ", "4nJpM9BZ6jc", "FMJvxu8kZYw", "-ggh4kotDvo", "vpqXNZ3EyAk", # Subunit remixes
    "x8S65wwzhdE", "h9ZzFn5AklI", "IPg9dFtfVFg", "J9vu5G8Ri54", "uLpQ07i6mNU", "pkkRfVyJUX4", "RyQWmW98MGM", # CYaRon album song reprints
    "phBO-YH1XcA", "9LpFcGoLCws", "blbTDPXIbjk", "BNHgclpTc8I", "rTauWjEYZr0", "QcQVQH2pFQw", "B48Jsx8ZdeU", # AZALEA album song reprints
    "iQ7xmq_i6aM", "PD_v19eMmgU", "YO2bPGlesR4", "dNYG_dgA8Ys", "DVGcAOUvtOQ", "I_ZVAzXvCqU", "4_-FZMwy9eM", # GK album song reprints

    # Yohane 2nd Solo Album songs are not labeled as "(Solo Ver.)"
    "VoGsfhfjgEY","eHrSoEKO_-0","jx0sIOR7wuw","xiQYNwc1rFw","HpBz-poWEGc","Uj0aWPZYR4E","8YXa6oQABW4","KfwXXnF8thc","CfI8rtJ_XKA","lfSVsNJ_11o","P2mvoSL3d4E","agk3Ulf7jpU","2fsgschX5JE","zXZ_F3GTaJ4", "3ioGEpIA6vk",

    # Aqours CHRONICLE
    'zs3QZW8IXPU', 'hgS4FSzvomc', 'LK7UywKrM6k', 'NhJ8diCPWIU', 'SRDftHsVkbk', 'jTU9FEJ3jJ8', 'E47THmF71ng',
    'IqBd62LL5fc', '3kwZXC7b7gA', 'Y8Ca-ZHT-CA', 'tdSV539o_yw', 'D-OXvQxqE5o', 'c4knYS3caG8', 'WvlmHd2Xm3k',
    'rA3-gFUUzJ8', 'L9v5n_rpRzU', '4laKO_TUSYM', 'drO1o6KklE0', 'drO1o6KklE0', 'lQrIlGGpQR4', '3eHBSakhCes',
    'fzg3sQG9b1E', 'PqWaGgI61Iw', '-Okzj8DNsI8', 'rGrIyBKQPVw', 'BlvEGaV8iX4', 'KTuC79Z6k2s', 'nSfhqZgumhM',
    'ASRpX2TlV7s', 'h7cNOXx4nJE', 'Wrc3d14umtA', 'PAqw4-BACWc', 'jxsg1PyHbAE', '0PZeCkN7GzQ', 'XFTG2W-BZtI',
    '2dwRnbciFtU', 'LYSwCyCF7Y0', '6jzvXPc4iJk', 'iK3Zk8tDkDQ', 'IxjfzoRVXwY', 'j42AfBdSo44', 'ybirxigmm0E',
    'OfpUj7x1eaM', 'mxQ0aKzrDu8', 'uFcslxvGYf8', '_-g_5GaDk2o', 'U0K-dFGEbcE', 'syajwkkGmig', 'ymUASUvMYLI',
    'YtXQJB3UL1w', 'C7ds7rqLo-I', "zs3QZW8IXPU",

    "W__wAfsDArM", "aO8rWVVusCI", # KimiSora dupes
    "oSOpK1M59LE", "jE4-qB3YjkQ", # Nonfiction!! / Starlight Prologue dupes
    "kFKlWcpeHYM", "UPpIrXjGXvU", # Mirai Yohou Hallelujah! / Tiny Stars dupe
    "if7Cz6O68iQ", "v5v0tUGlwYY", # Tokunatsu☆Sunshine / Wish Song dupes
    "KQYGXswWre8", "iJ3aTu3UMBc", # Welcome to Bokura no Sekai / Go!! Restart dupes
    "B73C2hZ5RQM", "NbWaer4sagg", # Vitamin SUMMER! / Chance Day, Chance Way! dupes
    "FmIyfiKTP1Q", "NVgf7WuYD70", # What a Wonderful Dream!! reprints
    "2R1OEtTHLcQ", "AiVVeTQJiLA", "6NXzNu5leSk", "RZU9dG1eEAk", "Yz_cx8KkbCA", # only one version of Liella no Uta songs
]

trans_titles = {
    "w-j-F72Nyn8": "Mermaid festa vol.2 ~Passionate~",
    "8nXg7xZjvpY": "Someday of my life",
    "_92g_TM74Cg": "Koi no Signal Rin rin rin!",
    "WhW3hTNXNPU": "Otomeshiki Renai Juku",
    "qSqc1fGSE00": "Mahoutsukai Hajimemashita!",
    "XATEvQj0QIw": "Junai Lens",
    "xmsXnRTpyyU": "Kokuhaku Biyori, desu!",
    "24lenT8latA": "Blueberry♡Train",
    "nLXtCvcz4yI": "Kodoku na Heaven",
    "2jEWQsbHUUI": "Bokura no LIVE Kimi to no LIFE",
    "Ht6lGr1uZsI": "Yuujou No Change",
    "D52Fg6_QfxY": "baby maybe Koi no Button",
    "OWkToTOvcdw": "Natsuiro Egao de 1,2,Jump!",
    "LSzgGJAGgGE": "Mermaid festa vol.1",
    "8bWeWj0pbR8": "Mogyutto \"love\" de Sekkin Chuu!",
    "FTh5KlUhJ7k": "Aishiteru Banzai!",
    "WIMTm6u3HJM": "Oh,Love & Peace!",
    "lONZitirTEc": "LOVELESS WORLD",
    "0PAUzmn582o": "Nawatobi",
    "BE8R0dlrMbg": "Beat in Angel",
    "uYEyJzQ8H8Y": "Nico Puri♡Joshi Dou",
    "LP55qNBi6pI": "Garasu no Hanazono",
    "69cpFzYEh_Y": "LONELIEST BABY",
    "J-rqPE2MfCw": "Donna Toki mo Zutto",
    "8f_9zih4NSM": "COLORFUL VOICE",
    "ztLeS3V_BD8": "SENTIMENTAL StepS",
    "IgqmQKkG2kE": "Love wing bell",
    "rbOollRvWNI": "Dancing stars on me!",
    "GQmdbuEizbU": "KiRa-KiRa Sensation!",
    "d8jP9C_mGIo": "Happy maker!",
    "yCz_vEmTHFQ": "A song for You! You? You!!",
    "cB6JNen6HPI": "Natteshimatta!",
    "x8t0QkM1XMs": "Bokura wa Ima no Naka de",
    "m1TdMY4-row": "Kitto Seishun ga Kikoeru",
    "PS-CC5rWJzc": "Kaguya no Shiro de Odoritai",
    "8EtMOixkXCQ": "Susume→Tomorrow",
    "KHo3dzv-2KQ": "Korekara no Someday",
    "gPlRwKkCdm4": "Wonder zone",
    "OxopdMTqUyI": "No brand girls",
    "r8gHynDYE0E": "START:DASH!!",
    "9U8PPIeFD1w": "Zurui yo Magnetic today",
    "KkHZxuj-M2c": "Kururin MIRACLE",
    "7W1QaMBLHls": "Storm in Lover",
    "ZyHn2VMITfM": "Moshimo kara Kitto",
    "oygW9_dMYnY": "Suki desu ga Suki desu ka?",
    "VvIesOU_714": "Soshite Saigo no Page ni wa",
    "9Bb9Z-RV4Ww": "Angelic Angel",
    "OvuoCMG3mtM": "Hello, Hoshi o Kazoete",
    "PYhe1hJpMa4": "SUNNY DAY SONG",
    "mmoRvPEerfc": "?←HEARTBEAT",
    "pRGGBMjzp40": "Bokutachi wa Hitotsu no Hikari",
    "iVmjNjfmad4": "Future style",
    "Pmold6wxrfA": "Korekara",
    "wzXSHhaIg6w": "MOMENT RING",
    "7oCIbjgwCFM": "Sayounara e Sayonara!",
    "xslIAA-gcFU": "soldier game",
    "wN0pODo87g0": "Yuuki no Reason",
    "wyHDU60oQDw": "Arifureta Kanashimi no Hate",
    "eF8bTinkgXg": "Ai wa Taiyou Janai?",
    "Fz84MQXiRQs": "Mou Hitori Janai yo",
    "l0ZqTNiH-AM": "Spicaterrible",
    "FbnJMil5fz4": "Watashitachi wa Mirai no Hana",
    "rT0TJP_8oTE": "Listen to my heart!!",
    "QaQtxK0ND4Y": "after school NAVIGATORS",
    "pLyQPzkGGc0": "Takaramonos",
    "aYzBfuPnrCU": "Paradise Live",
    "lF_JNL4aEGo": "Shangri-La Shower",
    "P6J4FwMeuBI": "Ruteshi Kisuki Shiteru",
    "apW5Ft3-Q10": "Mi wa μ'sic no Mi",
    "QxuyQfSB1-s": "Super LOVE=Super LIVE!",
    "kw6MAWQLjp4": "HEART to HEART!",
    "Fq-mrBjaXVI": "Arashi no Naka no Koi dakara",
    "6MCHwN8GmaA": "ENDLESS PARADE",
    "5JDC7WXdwFA": "Dreamin' Go! Go!!",
    "2MYdJBpMNVU": "Love marginal",
    "xTfcNVTThV8": "Pure girls project",
    "gquif_DYOjs": "UNBALANCED LOVE",
    "3yw5ches7o0": "Eien Friends",
    "LCo2PxitYms": "Nightingale Love Song",
    "XAPqGpIrhv4": "WAO-WAO Powerful day!",
    "bRrYkHjwZ_U": "NO EXIT ORION",
    "yRqN8_FOHjI": "Puwa Puwa-O!",
    "if-c2HOoBnw": "CheerDay CheerGirl!",
    "asU33AscyFM": "MUSEUM de Dou Shitai?",
    "OACsm9r3uZA": "Shiranai Love*Oshiete Love",
    "Z37nOvF0yHg": "A・no・ne・Ga・n・ba・re!",
    "ph9a_EY1VU4": "Binetsu kara Mystery",
    "BAsgZEau9IY": "Kimi no Kuse ni!",
    "TxAo4CARTC4": "Aki no Anata no Sora Tooku",
    "Dhb4WWHnO2M": "Futari Happiness",
    "L7OQA3nAPho": "Omoide Ijou ni Naritakute",
    "jRTimFzJx3w": "Shunjou Romantic",
    "OfZv_nOXTkY": "Onaji Hoshi ga Mitai",
    "4wq7yB3dNow": "Otohime Heart de Love Kyuuden",
    "ORNGwweEQrA": "Diamond Princess no Yuuutsu",
    "31kirJwIx2I": "Love Novels",
    "Ba5Me6EVZvQ": "Cutie Panther",
    "tKf2cFylJBc": "Natsu, Owaranaide.",
    "L5ZtieBq7iw": "Fuyu ga Kureta Yokan",
    "L_hy1XWBb_k": "Trouble Busters",
    "HGHH2cFI1mI": "Sakkaku CROSSROADS",
    "eTUtl-y3OuY": "PSYCHIC FIRE",
    "zAFyJXBbGQQ": "Silent tonight",
    "Pw5eVaCzA9c": "Saitei de Saikou no Paradiso",
    "jcF2yXlasjc": "Private Wars",
    "ZhKF0Dh_Wig": "Shocking Party",

    "EzFVxU8LsjQ": "not ALONE not HITORI",
    "3j9YFNx12I0": "Koi ni Naritai AQUARIUM",
    "XD-vjznVNXs": "Mattete Ai no Uta",
    "U0rUoB9ojcM": "Todokanai Hoshi da to Shite mo",
    "fHD4nFHjTOc": "WATER BLUE NEW WORLD",
    "Nd_rRH9Fy30": "WONDERFUL STORIES",
    "x-vJElhYbsU": "JIMO-AI Dash!",
    "SGkZknWerIw": "Nando datte YAKUSOKU!",
    "1M74ozb78uk": "KU-RU-KU-RU Cruller!",
    "BrzL8m2RWxc": "SUKI for you, DREAM for you!",
    "LGvQ3lscChg": "HAPPY PARTY TRAIN",
    "uX-V5JlE3Iw": "SKY JOURNEY",
    "fP5nAQ0ycxM": "Shoujo Ijou no Koi ga Shitai",
    "RdUENJeYUYI": "Mirai no Bokura wa Shitteru yo",
    "YWQOwty3BJA": "Kimi no Hitomi o Meguru Bouken",
    "8ZgywEXnKQc": "Yume to Mirai de MUGENDAI",
    "ouk6eSQisQ4": "smile smile ship Start!",
    "nghv3ckywLI": "Kokoro no Hane yo Kimi e Tondeke!",
    "I2dTqCBOmN4": "Landing action Yeah!!",
    "FEi3wdJYIFQ": "Jingle Bells ga Tomaranai",
    "fREtIttC3LE": "Seinaru Hi no Inori",
    "t_IThrVKPyE": "Thank you, FRIENDS!!",
    "kv-Zp30IC8A": "No.10",
    "C9lUX6lkudw": "Aozora Jumping Heart",
    "hv-V4CLmkzI": "Humming Friend",
    "UogE0nwkLwg": "Yume Kataru yori Yume Utaou",
    "6MHsaRghITY": "Sunshine Pikkapika Ondo",
    "fLnchHAGi4I": "Yuuki wa Doko ni? Kimi no Mune ni!",
    "8JHoP7zOESk": "MY LIST to you!",
    "Fz0XoQY3sMw": "Omoi yo Hitotsu ni Nare",
    "aL_3dVRDLPU": "Mitaiken HORIZON",
    "_csrXZNMEIQ": "Deep Resonance",
    "6FttCxKBHQs": "Dance with Minotaurus",
    "EtBXixfB20g": "Natsu e no Tobira Never end ver.",
    "Z-lzzpSjGi8": "Manatsu wa Dare no Mono?",
    "dZKi7xIPv1Q": "Jimo Ai ♡ Mantan ☆ Summer Life",
    "7579Sej7CYk": "Natsu no Owari no Amaoto ga",
    "zpVK5vGNDNI": "Hop・Step・Waai!",
    "AiJM0yAfVM4": "Yume de Yozora o Terashitai",
    "dHasNhuseU8": "Mijuku DREAMER",
    "ZMwXGDNC4i8": "Kimochi mo Yume mo Issho da ne!",
    "TdBaUmBhYJE": "Namida ga Yuki ni Naru Mae ni",
    "_aKtQX0Tax8": "Misty Frosty Love",
    "OnSXOwljE28": "Party! Party! PaPaPaParty!",
    "NziEaNeMekE": "Jump up HIGH!!",
    "JbvoEhrNwTw": "Fantastic Departure!",
    "MQ0pWmEMZZQ": "Aqours Pirates Desire",
    "NEzMVzPgSF4": "MY Mai☆TONIGHT",
    "h5ih56dzVYw": "MIRACLE WAVE",
    "e5D6Yibhk_U": "Kimeta yo Hand in Hand",
    "bCC2_OKT1DM": "Daisuki Dattara Daijoubu!",
    "A_fOcLUppZw": "Pops heart de Odurun damon!",
    "9NOE0rXp8_Q": "Daydream Warrior",
    "giSzu1GcsCg": "G Senjou no Cinderella",
    "qhOGlyW1D1c": "Thrilling・One Way",
    "XzCzcYD0zck": "Taiyou o Oikakero!",
    "VV1-sanER1M": "Awaken the power",
    "KpkjThm33Fs": "Kiseki Hikaru",
    "t-zRteXNP_U": "Future flight",
    "_ijn3e-3jtk": "Step! ZERO to ONE",
    "DeaGkBbi-2E": "Aqours☆HEROES",
    "uR3HVz0EHaM": "Bokura no Hashittekita Michi wa...",
    "l5HblElvFSE": "Next SPARKLING!!",
    "CvQEhuJoH9I": "MIRAI TICKET",
    "YFVtamSoSMw": "Hajimari Road",
    "uLdLl1DxwWc": "Marine Border Parasol",
    "GD4aGP2nmyg": "Yosoku Fukanou Driving!",
    "xRfCOqEW-bA": "Brightest Melody",
    "pGx2Qpc78ug": "Over The Next Rainbow",
    "n9pGxOLCVtY": "i-n-g, I TRY!!",
    "b0cRbn3p6II": "Bouken Type A, B, C!!",
    "cZDOuh5id2M": "KOKORO Magic \"A to Z\"",
    "kzezI7xQPsM": "Namida Janai",
    "nE_I45s7Fhw": "KOKORO Magic A to Z",
    "yRZFv04WEec": "Wake up, Challenger!!",
    "WRVyHfZXGHY": "Tousou Meisou Mobius Loop",
    "I2pz4zlngr8": "Hop? Stop? Nonstop!",
    "n-LCCiSErCo": "BANZAI! digital trippers (feat. MIKU HATSUNE)",
    "717CVu3EOh0": "KA-GA-YA-KI-RA-RI-RA (feat. MIKU HATSUNE)",
    "abrfiTxZG9Q": "Kinmirai Happy End",
    "CcXMre0gprQ": "Kaigandori de Matteru yo",
    "UJln5-o8jqg": "GALAXY HidE and SeeK",
    "SPh7tyj2Ipw": "INNOCENT BIRD",
    "nTZWmPVtkqI": "Kowareyasuki",
    "7wmOFiRHCw4": "Shadow gate to love",
    "0qAaLBbXE-c": "New Romantic Sailors",
    "ZwO0QFpH5Eg": "Love Pulsar",
    "qr-uy1qL43E": "Phantom Rocket Adventure",
    "x5Jqvn1mFK4": "Braveheart Coaster",
    "zw6ag0xKJhI": "CHANGELESS",
    "Tg50XHWos0A": "Kodoku・Teleport",
    "6DHAZo7IhhY": "Shooting Star Warrior",
    "UN-DsxXKAiw": "Deep Sea Cocoon",
    "UcG5RpJ6DTg": "Guilty Eyes Fever",
    "gF2guY1NTvM": "Nameless Love Song",
    "g9JHbvuNy_A": "Guilty!? Farewell party",
    "tCdJ6fCkSCw": "Torikoriko PLEASE!!",
    "JFfFJgdhLjg": "Tokimeki Bunruigaku",
    "Hkgc54cDwJg": "Strawberry Trapper",
    "zsly4OzCfuE": "Guilty Night, Guilty Kiss!",
    "uUeMsBl0_Y0": "Aru Hi...Eien Mitai ni!",
    "ERkqdlddhk0": "Whistle of Revolution",
    "6u7d7WrJLME": "P.S. no Mukougawa",
    "ZWSGCPRbg70": "Dragon Riders",
    "rhhDXqG1ZOk": "Sakura Bye Bye",
    "ZnG-2ZCU9Gw": "We'll get the next dream!!!",
    "aqG9ohduywA": "PHOENIX DANCE",
    "eNxFXm_LuZI": "LONELY TUNING",
    "gWL5c1wOYWQ": "Metamorphism",
    "G18GrBZ4wnE": "Sotsugyou desu ne",
    "idD6_8oXQ6E": "Amazing Travel DNA",
    "bI7lgNPf3ok": "Kuuchuu Renai Ron",
    "-vPaA1UqF3Y": "Maze Sekai",
    "lGUOVwCiG3g": "Genki Zenkai DAY! DAY! DAY!",
    "-ugxwDzsflE": "Yozora wa Nandemo Shitteru no?",
    "1kD7IK49Gr4": "Yaa! Koun Ryusui!?",
    "jwyBqK_rXYU": "One More Sunshine Story",
    "fj0RDiCZwIk": "Never giving up!",
    "EhyMWEW1RxU": "Namioto Refrain",
    "_qiUkzWeAPM": "Totsuzen GIRL",
    "dvIrXT4SyBQ": "Love is all, I sing love is all!",
    "210vXMQYWB0": "Yuki wa Doko ni? Kimi no Mune ni!",
    "R7cAI-I6YQY": "Meimei Tantei Yohane",
    "1uIUyBhrWdA": "RUN KAKERU RUN",
    "2fmZqdiTPG4": "Oyasuminasan!",
    "xP54Jr0SFLA": "Akogare Ranraran",
    "iyXhjyW3OFQ": "Love Spiral Tower",
    "LnX0Cb5xvS0": "Motto ne!",
    "9iBKbegiKyg": "MOTTO-ZUTTO be with you",
    "csB3o8RJxLU": "Paradise Chime",
    "_C9sxqK4B74": "OKAWARI Happy life!",
    "yIHJ8xBQ6O0": "Perfect SEKAI",
    "KHmzc_Tvtn0": "1STAR",
    "hmIV6Msh_sU": "Shiny Racers",
    "bc0dF6XPeHY": "in this unstable world",
    "mMw0aUfexrg": "Tatehoko Tsubasa",
    "0aSUGXPeW7w": "Minamo ni Piano",
    "eguOyIWfq1M": "PURE PHRASE",
    "ziNL1FRZ5fY": "SELF CONTROL!!",
    "ddgVXZnQt8o": "CRASH MIND",
    "OkXsedymTxc": "DROPOUT!?",
    "Zr7I5l-XPz8": "Believe again",
    "3Fw7GqhndZo": "Dazzling White Town",
    "_gsPSro8ugo": "Lonely Snow Planet",
    "qi1Z8PYbCys": "After The Rain",

    "EBnpWRCONnM": "Kaika Sengen",
    "wc3cfiS0VaQ": "L!L!L! (Love the Life We Live)",
    "PFibzMXHjqA": "Break The System",
    "ZSLH00pSniQ": "TO BE YOURSELF",
    "L7OXv_BXN5Y": "Eieisa",
    "KDnrlBN9DNM": "Turn it Up!",
    "Ji1bBREZ1jg": "Diabolic mulier",
    "0e38ymSmWks": "Silent Blaze",
    "1lPESUmrbZY": "Yada!",
    "XrUcDvCJq-0": "Itsudatte for you!",
    "GZCIdi1DI5k": "First Love Again",
    "HQaGC6SUK04": "Concentrate!",
    "7IlcjWYUUkE": "Toy Doll",
    "SRvmtD4RpLk": "Ye Mingzhu",
    "ToT2O8wp0Jo": "TOKIMEKI Runners",
    "suWk33wqGrs": "Yume e no Ippo",
    "dNYPwvpqAuw": "Diamond",
    "WIqYLm9EH6I": "Anata no Risou no Heroine",
    "1SpOixerr44": "Starlight",
    "zweAj9PDuo4": "Meccha Going!!",
    "wc2QLrW7Gqg": "Nemureru Mori ni Ikitai na",
    "5R1l0xrtVOc": "CHASE!",
    "AQAYnluAxd8": "Evergreen",
    "Otar-6a710Y": "Doki Pipo☆Emotion",
    "01kjQV-7fQQ": "☆Wonderland☆",
    "_D8EIlJi7wE": "Audrey",
    "Ifp-5U4VGok": "Wish",
    "lo3OB-a7TCg": "Yuu & Ai",
    "a-WarIBtd3w": "My Own Fairy-Tale",
    "PvVgqYSsQ2Y": "MELODY",
    "gIBdVbN5QKs": "Koe Tsunagou yo",
    "KZ0Wr3UIvMw": "Teletelepathy",
    "fNEuJHgPMtM": "Love U my friends",
    "m1ilXQbtizc": "NEO SKY, NEO MAP!",
    "lGnNjhTRQVw": "Zensoku Dreamer",
    "CDPOUZWfwsA": "Colorful Dreams! Colorful Smiles!",
    "pFUF8qJh5nk": "Twilight",
    "vkQ3UdLk3hw": "Say Good-Bye Namida",
    "wejUZYmLkqc": "Margaret",
    "JvURKZQdCDs": "Yagate Hitotsu no Monogatari",
    "8bjQg-RUiRc": "Fire Bird",
    "ZnyCUODvfKQ": "Tanoshii no Tensai",
    "RINkOGcXJKQ": "LIKE IT! LOVE IT!",
    "cbmJLrkdv3c": "Aion no Uta",
    "5LSOw13RGKs": "Analog Heart",
    "I8JYMvUpTI4": "Ketsui no Hikari",
    "RMJ1TT5Gh1g": "TOKIMEKI Runners (Ch. 17 Version)",
    "eXdOdtfAv6M": "Just Believe!!!",
    "KAEEhyfWtrw": "Nijiiro Passions!",
    "MpAUJ36fq3g": "Sweet Eyes",
    "5luoQvsVVHE": "Yume ga Bokura no Taiyo sa",
    "Wi43b0ESIgA": "Ryoran! Victory Road",
    "YSYg3LKAMgA": "Awakening Promise",
    "02tMRFTzMlw": "Yume ga Koko Kara Hajimaru yo",
    "wGdbBpqwOak": "Future Parade",
    "7H4wjtOg2P8": "Level Oops! Adventures",
    "d0JNEbyByrc": "Miracle STAY TUNE!",
    "ec1QM7aUWEE": "Swinging!",
    "TXG5xBcHlno": "Not Sad",
    "do527rsbSQE": "Infinity! Our wings!!",
    "u1wHM2ejN60": "Poker face & Onegai! Fairy",
    "9SEiiwiiha4": "Sing & Smile!!",
    "CQdEPi9UJvY": "Beautiful Moonlight",
    "FE2ykAqHdEc": "Maze Town",
    "N9_pIJEqL_4": "Folklore ~Kanki no Uta~",
    "dN68OiCCKcY": "ENJOY IT!",
    "wuAj8GI7-DQ": "4 SEASONS",
    "Y4b0oCtma8A": "Shadow Effect",
    "cFI7s3deZqM": "Kiss the Sun",
    "xp6qQA9VcXQ": "Vroom Vroom",
    "BdF0FcC7cNE": "Bubble Over!",
    "v5ZslcBjbq8": "THE SECRET NiGHT",
    "gWSAmlTD4wo": "Fly into the sky",
    "dso45gIdbjA": "SUPER NOVA",
    "WBETX2ONF8w": "Love Triangle",
    "5PueoefK2uc": "Eternal Light",
    "qJk4wxMiPLI": "Koi suru Magic!!",
    "5wq4-y8V6_Y": "MONSTER GIRLS",
    "FWfjdgdLcco": "Aoi Canaria",
    "1ToW01yQ2bs": "I'm Still...",
    "1_3Ypl6_e9A": "Queendom",
    "TRzHibBAFJs": "Dream Land! Dream World!",
    "8EoUknt_Ji4": "Cheer for you!!",
    "Hk8lDW8JB5c": "Eutopia",
    "BctS652B2-g": "EMOTION",
    "COwb7jyRxQM": "stars we chase",
    "8yyMnAK2Ki4": "Solitude Rain",
    "FFyWNOU82Vw": "VIVID WORLD",
    "0cGBTbjvwuo": "Dream with You",
    "vGtXstAHlXU": "Poppin' Up!",
    "krzru9NkedE": "DIVE!",
    "-Li6HT1mv0U": "Mutekikyuu*Believer",
    "H2VuAyjWDyU": "Mirai Harmony",
    "Kzr_xuqqh-M": "Tsunagaru Connect",
    "aoRBp5C_ZyI": "Butterfly",
    "i-NzrXpwJoA": "La Bella Patria",
    "rFol2afue0Q": "Saikou Heart",

    "bjIRLovzc80": "Hajimari wa Kimi no Sora",
    "4_06v7iS7bQ": "Nonfiction!!",
    "dd9i50ppx7g": "Tokunatsu☆Sunshine",
    "317eTPkfT-Y": "Bye Bye Shichaeba!?",
    "V6ytTXw6838": "Mirai Yohou Hallelujah!",
    "0sF9QKeY8Bo": "Dakara Bokura wa Narasunda!",
    "TrifR0_8_iM": "Matataki no Saki e",
    "ZfjpsHnU9DM": "Mirai wa Kaze no You ni",
    "zjPhzcMaMb4": "Kono Machi de Ima Kimi to",
    "zFV-Q0DjFUY": "GOING UP",
    "UgVSlQy3CfA": "Wish Song",
    "n-4U4iM4CL8": "LIVE with a smile!",
    "AKBV8afIcmE": "Oi kakeru Yume no Saki de",
    "EL619Be7OLU": "Mizushibuki no Sign",
    "XDWxSrCXuzc": "Tiny Stars",
    "En23vkPawHU": "1.2.3!",
    "Y1Dl389GoCo": "Primary",
    "vKEs-n2BP7c": "Memories",
    "qiX_9lbpfZI": "Anniversary",
    "sAF-cLDVqmk": "Message",
    "SPM0hSSUh10": "Ringing!",
    "Vmzt8gpiVDU": "Dears",
    "AuZvn_JEbyA": "Departure",
    "35WteJ60cps": "START!! True dreams",
    "NBBt0pqYqZU": "WE WILL!!",
    "L0auiy_wPNM": "Star Sengen",
    "H8PhMQrfEVA": "Starlight Prologue",
    "O3HmG2RX0Mk": "Dream Rainbow",
    "_RUHUwCINXY": "What a Wonderful Dream!!",
    "VAOLoxnr7s0": "Mizuiro no Sunday",
    "gPrsIjtTYuk": "Flyer's High",
    "sZ2A0qafxUo": "Mitero!",
    "OxM-4E7V5pY": "Binetsu no Waltz",
    "ElmguCA0SuI": "Aozora o Matteru",
    "dDc6BXHDhrY": "Mirai wa Kaze no you ni",
    "Q3M0lEXnqMs": "Unison",
    "DVk8tmQEHy4": "Chance Day, Chance Way!",
    "rVjiNjDkYcE": "POP TALKING",
    "lVdZGvEUno4": "Go!! Restart",
    "V2CXoystsAc": "Yuragu wa",
    "ueFfIkQegHw": "Irozuite Tomei",
    "xEad6oE1jzE": "Shooting Voice!!",
    "tRwSxoz0JzU": "Dancing Heart La-Pa-Pa-Pa!",
    "7u-i_OyaLaY": "Dreaming Energy",
    "2f3r-4m74bM": "Utopia Magic",
    "5UfSQq7C26M": "Day1",
    "6IdwHfgIzOQ": "Watashi no Symphony",
    "oDnmWbGsNxA": "Welcome to Bokura no Sekai",
    "Y46i_cmiVio": "Vitamin SUMMER!",
    "lZ9RHOwco_g": "HOT PASSION!!",
    "Cu5srL2Duk4": "Till Sunrise",
}

reverse_dic = {}
for k in trans_titles:
    v = trans_titles[k]
    reverse_dic[v] = reverse_dic.get(v, []) + [k]
for k in reverse_dic:
    if len(reverse_dic[k]) > 1: print("Dupe Title:",k,reverse_dic[k])

trans_artist = {
    "Aqours・虹ヶ咲学園スクールアイドル同好会・Liella!": "Aqours, Nijigasaki High School Idol Club, Liella",
    "虹ヶ咲学園スクールアイドル同好会": "Nijigasaki High School Idol Club",
    "A-RISE (綺羅ツバサ(CV.桜川めぐ)、統堂英玲奈(CV.松永真穂)、優木あんじゅ(CV.大橋歩夕))": "A-RISE"
}

trans_cv = {
    "高坂穂乃果(CV.新田恵海)": "Honoka Kosaka (CV: Emi Nitta)",
    "絢瀬絵里(CV.南條愛乃)": "Eli Ayase (CV: Yoshino Nanjo)",
    "南ことり(CV.内田 彩)": "Kotori Minami (CV: Aya Uchida)",
    "園田海未(CV.三森すずこ)": "Umi Sonoda (CV: Suzuko Mimori)",
    "星空 凛(CV.飯田里穂)": "Rin Hoshizora (CV: Riho Iida)",
    "西木野真姫(CV.Pile)": "Maki Nishikino (CV: Pile)",
    "東條 希(CV.楠田亜衣奈)": "Nozomi Tojo (CV: Aina Kusuda)",
    "小泉花陽(CV.久保ユリカ)": "Hanayo Koizumi (CV: Yurika Kubo)",
    "矢澤にこ(CV.徳井青空)": "Nico Yazawa (CV: Sora Tokui)",

    "高海千歌 (CV.伊波杏樹)": "Chika Takami (CV: Anju Inami)",
    "桜内梨子 (CV.逢田梨香子)": "Riko Sakurauchi (CV: Rikako Aida)",
    "松浦果南 (CV.諏訪ななか)": "Kanan Matsuura (CV: Nanaka Suwa)",
    "黒澤ダイヤ (CV.小宮有紗)": "Dia Kurosawa (CV: Arisa Komiya)",
    "渡辺 曜 (CV.斉藤朱夏)": "You Watanabe (CV: Shuka Saitou)",
    "津島善子 (CV.小林愛香)": "Yoshiko Tsushima (CV: Aika Kobayashi)",
    "国木田花丸 (CV.高槻かなこ)": "Hanamaru Kunikida (CV: Kanako Takatsuki)",
    "小原鞠莉 (CV.鈴木愛奈)": "Mari Ohara (CV: Aina Suzuki)",
    "黒澤ルビィ (CV.降幡愛)": "Ruby Kurosawa (CV: Ai Furihata)",
    "黒澤ルビィ (CV.降幡 愛)": "Ruby Kurosawa (CV: Ai Furihata)",

    "上原歩夢 (CV.大西亜玖璃)": "Ayumu Uehara (CV: Aguri Onishi)",
    "中須かすみ (CV.相良茉優)": "Kasumi Nakasu (CV: Mayu Sagara)",
    "桜坂しずく (CV.前田佳織里)": "Shizuku Osaka (CV: Kaori Maeda)",
    "朝香果林 (CV.久保田未夢)": "Karin Asaka (CV: Miyu Kubota)",
    "宮下 愛 (CV.村上奈津実)": "Ai Miyashita (CV: Natsumi Murakami)",
    "近江彼方 (CV.鬼頭明里)": "Kanata Konoe (CV: Akari Kito)",
    "優木せつ菜 (CV.楠木ともり)": "Setsuna Yuki (CV: Tomori Kusunoki)",
    "エマ・ヴェルデ (CV.指出毬亜)": "Emma Verde (CV: Maria Sashide)",
    "天王寺璃奈 (CV.田中ちえ美)": "Rina Tennoji (CV: Chiemi Tanaka)",
    "三船栞子 (CV.小泉萌香)": "Shioriko Mifune (CV: Moeka Koizumi)",
    "ミア・テイラー (CV.内田 秀)": "Mia Taylor (CV: Shu Uchida)",
    "鐘 嵐珠 (CV.法元明菜)": "Lanzhu Zhong (CV: Akina Homoto)",

    "澁谷かのん (CV.伊達さゆり)": "Kanon Shibuya (CV: Sayuri Date)",
    "唐 可可 (CV.Liyuu)": "Keke Tang (CV: Liyuu)",
    "嵐 千砂都 (CV.岬 なこ)": "Chisato Arashi (CV: Nako Misaki)",
    "平安名すみれ (CV.ペイトン尚未)": "Sumire Heanna (CV: Naomi Payton)",
    "葉月 恋 (CV.青山なぎさ)": "Ren Hazuki (CV: Nagisa Aoyama)"
}

channel_ids = [
    "UCZooi-eLVkSl9HpYwKc86yA", # Aqours

    "UCztuBEOYRv6lhGBeghPWjIw", # CYaRon
    "UCCSO_iLh2j5UgDF3_q6Rwpg", # AZALEA
    "UCS_18tIZhGdtryg6SbKdTig", # GK

    "UCUTihOwW4X0QsX4ruYeXH5Q", # Chika solo
    "UCq4en1QZ2G9dQKsK0C0BylA", # Riko solo
    "UCL35swjUy5FhW8tWRUcp2KA", # Kanan solo
    "UCP51gYv5o9CG7luWSbfrrlw", # Dia solo
    "UCsDTR0IforvdFCU4u3gXEvw", # You solo
    "UCNALRB5Yv0WM-qED4tSXYGQ", # Yohane solo
    "UC7IbKIHzrddP4Ws1LuGqTCQ", # Maru solo
    "UCRvfZ8nvsB2Z5NCCPzJBYUQ", # Mari solo
    "UCnnA9gF_4FOiyXn7CIYOqTg", # Ruby solo

    "UCxTryh8UmFwtU8ap5R4mJsQ", # Niji

    "UCtxwO-d7ZRRVqiGAjlkFybA", # DiverDiva
    "UCpF4z1vP_6DiXdTjOh5BneQ", # AZUNA
    "UCU75cy9BpTnucxrNdbOThoQ", # QU4RTZ
    "UC61b0cT0CZ7ehXzRotLgb6A", # R3BIRTH

    "UCGzO-WBL6ggp2TIoW0fhPjA", # Liella
    "UCfjCCODQi5Krk1O0H0-gMwQ", # Sunny Passion
]

pls = set()

# Own playlist to cover some odd Niji albums and Saint Snow
pls.add("PL0G3cPit21sCsVP944ziAQ9JIgnI26WDQ")

# Instead of scraping µ's topic, just add playlists directly (there's nothing new coming anytime soon)
pls.add("OLAK5uy_lEvZScQWqzSsz9GnRMHwoEDGh60FZX83g") # Complete BEST BOX 1
pls.add("OLAK5uy_kJpvwCBFfkys031JyJ5Xu9240oyydqozI") # Complete BEST BOX 2
pls.add("OLAK5uy_kXNbQQqaup_0vR5YCxiAidzfjZE17FW-I") # Complete BEST BOX 3
pls.add("OLAK5uy_klA6D512EN5319rJhNAnfHUt_ftbX1Mbw") # Complete BEST BOX 4
pls.add("OLAK5uy_l2yivjsVnJ0iO8pfqGZkQwdZryEZRbQFA") # Complete BEST BOX 5
pls.add("OLAK5uy_mEqGtwlC8w2BDFmQS2ntw52KgFGKjA0Lc") # Complete BEST BOX 6
pls.add("PLXJuuF0-YCDJaGIkgsuPBiVVRQ3cWV-h_") # Complete BEST BOX 7
pls.add("OLAK5uy_lgPwpnfAz-BWq1MARQ40Orb2PjSp1t_lk") # Complete BEST BOX 8
pls.add("PLWjvVRM4kRSxuwfqzGXcoVcLUDte9uu-r") # Complete BEST BOX 9
pls.add("OLAK5uy_nPbZgmJDEO2bVo3nQAx0fvB_Xy1efZI8I") # Complete BEST BOX 10
pls.add("OLAK5uy_leqvLLHNLZ-9mvmCE_1zIwYpiUfM42oi0") # Complete BEST BOX 11
pls.add("OLAK5uy_maVdvUk6QxhnW1e19nGiKrpJ595oHx54Q") # Complete BEST BOX 12
pls.add("OLAK5uy_n1ahIvy6PL-47HncqrA-AgzV3b3Nhtslg") # ASFYYY

for channel_id in channel_ids:
    res = requests.get("https://www.googleapis.com/youtube/v3/channelSections?part=snippet%2C+contentDetails&channelId="+channel_id+"&maxResults=50&key="+secret.YT_API_KEY)
    for i in res.json()["items"]:
        if i["snippet"] and i["snippet"]["type"] == "multipleplaylists":
            for pl in i["contentDetails"]["playlists"]:
                pls.add(pl)

new_videos = {}
with open("videos.json","r") as vidfile:
    videos = json.load(vidfile)
    alreadyfound = {videos[k]["titleEn"]+videos[k]["artistEn"]:k for k in videos}

for pl in list(pls):
    res = requests.get("https://www.googleapis.com/youtube/v3/playlistItems?regionCode=jp&part=snippet&fields=pageInfo,items(snippet(resourceId/videoId,title,description))&maxResults=50&playlistId="+pl+"&key="+secret.YT_API_KEY)
    if res.json()["pageInfo"]["totalResults"] > 50: print(pl,"too long, time to implement pagination")
    for video in res.json()["items"]:
        videoId = video["snippet"]["resourceId"]["videoId"]
        if videoId in skips: continue
        if videoId in videos: continue
        if "Provided to YouTube by NexTone Inc." not in video["snippet"]["description"] and "Provided to YouTube by Lantis" not in video["snippet"]["description"]: continue

        title = trans_titles[videoId] if videoId in trans_titles else video["snippet"]["title"]
        artist = video["snippet"]["description"].split("\n\n")[1].split(" · ")[1]
        if artist[-12:] == " from Aqours": artist = artist[:-12]
        if artist in trans_artist: artist = trans_artist[artist]

        if title[-12:] == " (Off Vocal)": continue
        if title[-10:] == "Solo Ver.)": continue
        if title+artist in alreadyfound:
            print("   ",videoId,"is dupe of",alreadyfound[title+artist])
            continue

        if videoId not in trans_titles: print("\""+videoId+"\": \"" + video["snippet"]["title"] + "\",")

        if "CV." in artist:
            s = artist.split("、")
            for i in range(len(s)):
                if s[i] in trans_cv: s[i] = trans_cv[s[i]]
                else: print(s[i])
            artist = ", ".join(s)

        alreadyfound[title+artist] = videoId
        data = {
            "titleEn": title,
            "artistEn": artist
        }
        videos[videoId] = data
        new_videos[videoId] = data
print(json.dumps(new_videos,indent=4,ensure_ascii=False))