const OLD_HEARDLE_MAP = {
    "µ's - A song for You! You? You!!": 154,
    "µ's - after school NAVIGATORS": 34,
    "µ's - Aishiteru Banzai!": 17,
    "µ's - Aishiteru Banzai! / 愛してるばんざーい!": 17,
    "µ's - Anemone heart": 46,
    "µ's - Angelic Angel": 99,
    "µ's - Arashi no Naka no Koi dakara": 108,
    "µ's - Arashi no Naka no Koi dakara / 嵐のなかの恋だから": 108,
    "µ's - baby maybe Koi no Button": 3,
    "µ's - baby maybe Koi no Button / baby maybe 恋のボタン": 3,
    "µ's - Beat in Angel": 48,
    "µ's - Bokura no LIVE Kimi to no LIFE": 0,
    "µ's - Bokura no LIVE Kimi to no LIFE / 僕らのLIVE 君とのLIFE": 0,
    "µ's - Bokura wa Ima no Naka de": 36,
    "µ's - Bokura wa Ima no Naka de / 僕らは今のなかで": 36,
    "µ's - Bokutachi wa Hitotsu no Hikari": 103,
    "µ's - Bokutachi wa Hitotsu no Hikari / 僕たちはひとつの光": 103,
    "µ's - COLORFUL VOICE": 67,
    "µ's - Dancing stars on me!": 70,
    "µ's - Datte Datte Aa Mujou": 65,
    "µ's - Datte Datte Aa Mujou / だってだって噫無情": 65,
    "µ's - Donna Toki mo Zutto": 66,
    "µ's - Donna Toki mo Zutto / どんなときもずっと": 66,
    "µ's - Dreamin' Go! Go!!": 93,
    "µ's - ENDLESS PARADE": 63,
    "µ's - Future style": 104,
    "µ's - Garasu no Hanazono": 56,
    "µ's - Garasu no Hanazono / 硝子の花園": 56,
    "µ's - Happy maker!": 74,
    "µ's - HEART to HEART!": 109,
    "µ's - Hello, Hoshi o Kazoete": 100,
    "µ's - Hello, Hoshi o Kazoete / Hello,星を数えて": 100,
    "µ's - Kaguya no Shiro de Odoritai": 38,
    "µ's - Kaguya no Shiro de Odoritai / 輝夜の城で踊りたい": 38,
    "µ's - KiRa-KiRa Sensation!": 73,
    "µ's - Kitto Seishun ga Kikoeru": 37,
    "µ's - Kitto Seishun ga Kikoeru / きっと青春が聞こえる": 37,
    "µ's - Kokuhaku Biyori, desu!": 26,
    "µ's - Kokuhaku Biyori, desu! / 告白日和、です!": 26,
    "µ's - Korekara no Someday": 41,
    "µ's - Korekara no Someday / これからのSomeday": 41,
    "µ's - Korekara": 112,
    "µ's - Korekara / これから": 112,
    "µ's - Listen to my heart!!": 33,
    "µ's - LONELIEST BABY": 57,
    "µ's - Love wing bell": 71,
    "µ's - LOVELESS WORLD": 59,
    "µ's - Mermaid festa vol.1": 10,
    "µ's - Mermaid festa vol.2 ~Passionate~": 18,
    "µ's - Mi wa µ'sic no Mi": 95,
    "µ's - Mi wa µ'sic no Mi / ミはμ’sicのミ": 95,
    "µ's - Mogyutto \"love\" de Sekkin Chuu!": 16,
    "µ's - Mogyutto \"love\" de Sekkin Chuu! / もぎゅっと“love”で接近中!": 16,
    "µ's - MOMENT RING": 117,
    "µ's - Music S.T.A.R.T!!": 60,
    "µ's - Natsuiro Egao de 1,2,Jump!": 11,
    "µ's - Natsuiro Egao de 1,2,Jump! / 夏色えがおで1,2,Jump!": 11,
    "µ's - Natte Shimatta!": 155,
    "µ's - Natte Shimatta! / なってしまった！": 155,
    "µ's - No brand girls": 44,
    "µ's - Oh,Love&Peace!": 31,
    "µ's - Otome Shiki Ren'ai Juku": 21,
    "µ's - Otome Shiki Ren'ai Juku / 乙女式れんあい塾": 21,
    "µ's - Paradise Live": 62,
    "µ's - Ruteshi Kisuki Shiteru": 80,
    "µ's - Ruteshi Kisuki Shiteru / るてしキスキしてる": 80,
    "µ's - Sayounara e Sayonara!": 118,
    "µ's - Sayounara e Sayonara! / さようならへさよなら！": 118,
    "µ's - SENTIMENTAL StepS": 69,
    "µ's - Shangri-La Shower": 79,
    "µ's - Snow halation": 2,
    "µ's - soldier game": 30,
    "µ's - Sore wa Bokutachi no Kiseki": 64,
    "µ's - Sore wa Bokutachi no Kiseki / それは僕たちの奇跡": 64,
    "µ's - Soshite Saigo no Page ni wa": 91,
    "µ's - Soshite Saigo no Page ni wa / そして最後のページには": 91,
    "µ's - START:DASH!!": 40,
    "µ's - Storm in Lover": 78,
    "µ's - Suki desu ga Suki desu ka?": 84,
    "µ's - Suki desu ga Suki desu ka? / 好きですが好きですか？": 84,
    "µ's - SUNNY DAY SONG": 102,
    "µ's - Super LOVE=Super LIVE!": 94,
    "µ's - Susume→Tomorrow": 39,
    "µ's - Susume→Tomorrow / ススメ→トゥモロウ": 39,
    "µ's - Takaramonozu": 61,
    "µ's - Takaramonozu / タカラモノズ": 61,
    "µ's - WILD STARS": 35,
    "µ's - Wonder zone": 42,
    "µ's - Wonderful Rush": 32,
    "µ's - Yume no Tobira": 68,
    "µ's - Yume no Tobira / ユメノトビラ": 68,
    "µ's - Yuujou No Change": 1,
    "µ's - Yuujou No Change / 友情ノーチェンジ": 1,
    "µ's - Zurui yo Magnetic today": 75,
    "µ's - Zurui yo Magnetic today / ずるいよMagnetic today": 75,
    "µ's - ？ ← HEARTBEAT": 101,
    "A-RISE - Private Wars": 45,
    "A-RISE - Shocking Party": 77,
    "Printemps - CheerDay CheerGirl!": 92,
    "Printemps - Eien Friends": 82,
    "Printemps - Eien Friends / 永遠フレンズ": 82,
    "Printemps - Love marginal": 4,
    "Printemps - MUSEUM de Dou Shitai?": 96,
    "Printemps - MUSEUM de Dou Shitai? / MUSEUMでどうしたい？": 96,
    "Printemps - Nightingale Love Song": 83,
    "Printemps - Nightingale Love Song / 小夜啼鳥恋詩": 83,
    "Printemps - NO EXIT ORION": 111,
    "Printemps - Pure girls project": 54,
    "Printemps - Puwa Puwa-O!": 58,
    "Printemps - Puwa Puwa-O! / ぷわぷわーお！": 58,
    "Printemps - sweet&sweet holiday": 5,
    "Printemps - UNBALANCED LOVE": 55,
    "Printemps - WAO-WAO Powerful day!": 110,
    "lily white - A-NO-NE-GA-N-BA-RE!": 9,
    "lily white - A-NO-NE-GA-N-BA-RE! / あ・の・ね・が・ん・ば・れ!": 9,
    "lily white - Aki no Anata no Sora Tooku": 85,
    "lily white - Aki no Anata no Sora Tooku / 秋のあなたの空遠く": 85,
    "lily white - Binetsu Kara Mystery": 50,
    "lily white - Binetsu Kara Mystery / 微熱からMystery": 50,
    "lily white - Futari Happiness": 86,
    "lily white - Futari Happiness / ふたりハピネス": 86,
    "lily white - Kimi no Kuse ni!": 49,
    "lily white - Kimi no Kuse ni! / キミのくせに": 49,
    "lily white - Omoide Ijou ni Naritakute": 113,
    "lily white - Omoide Ijou ni Naritakute / 思い出以上になりたくて": 113,
    "lily white - Onaji Hoshi ga Mitai": 89,
    "lily white - Onaji Hoshi ga Mitai / 同じ星が見たい": 89,
    "lily white - Otohime Heart de Love Kyuuden": 98,
    "lily white - Otohime Heart de Love Kyuuden / 乙姫心で恋宮殿": 98,
    "lily white - Shiranai Love*Oshiete Love": 8,
    "lily white - Shiranai Love*Oshiete Love / 知らないLove*教えてLove": 8,
    "lily white - Shunjou Romantic": 114,
    "lily white - Shunjou Romantic / 春情ロマンティック": 114,
    "BiBi - Cutie Panther": 51,
    "BiBi - Diamond Princess no Yuuutsu": 7,
    "BiBi - Diamond Princess no Yuuutsu / ダイヤモンドプリンセスの憂鬱 ": 7,
    "BiBi - Fuyu ga Kureta Yokan": 88,
    "BiBi - Fuyu ga Kureta Yokan / 冬がくれた予感": 88,
    "BiBi - Love Novels": 6,
    "BiBi - Love Novels / ラブノベルス": 6,
    "BiBi - Natsu, Owaranai de.": 52,
    "BiBi - Natsu, Owaranai de. / 夏、終わらないで。": 52,
    "BiBi - PSYCHIC FIRE": 115,
    "BiBi - Saitei de Saikou no Paradiso": 97,
    "BiBi - Saitei de Saikou no Paradiso / 最低で最高のParadiso": 97,
    "BiBi - Sakkaku CROSSROADS": 116,
    "BiBi - Sakkaku CROSSROADS / 錯覚CROSSROADS": 116,
    "BiBi - Silent tonight": 90,
    "BiBi - Trouble Busters": 87,
    "Kousaka Honoka - Ai wa Taiyou Ja Nai?": 14,
    "Kousaka Honoka - Ai wa Taiyou Ja Nai? / 愛は太陽じゃない?": 14,
    "Kousaka Honoka - Mou Hitori Ja Nai yo": 15,
    "Kousaka Honoka - Mou Hitori Ja Nai yo / もうひとりじゃないよ": 15,
    "Kousaka Honoka - Shiawase Iki no SMILING!": 72,
    "Kousaka Honoka - Shiawase Iki no SMILING! / シアワセ行きのSMILING!": 72,
    "Kousaka Honoka - Someday of my life": 19,
    "Kousaka Honoka - Yume Naki Yume wa Yume ja nai": 43,
    "Kousaka Honoka - Yume Naki Yume wa Yume ja nai / 夢なき夢は夢じゃない": 43,
    "Ayase Eli - Arifureta Kanashimi no Hate": 29,
    "Ayase Eli - Arifureta Kanashimi no Hate / ありふれた悲しみの果て": 29,
    "Sonoda Umi - Watashitachi wa Mirai no Hana": 12,
    "Sonoda Umi - Watashitachi wa Mirai no Hana / 私たちは未来の花": 12,
    "Sonoda Umi - Yuuki no Reason": 28,
    "Sonoda Umi - Yuuki no Reason / 勇気のReason": 28,
    "Minami Kotori - Blueberry♥Train": 24,
    "Minami Kotori - Blueberry♥Train / ぶる～べりぃ♥とれいん": 24,
    "Minami Kotori - Spicaterrible": 13,
    "Minami Kotori - Spicaterrible / スピカテリブル": 13,
    "Nishikino Maki - Daring!": 27,
    "Hoshizora Rin - Koi no Signal Rin rin rin!": 20,
    "Hoshizora Rin - Koi no Signal Rin rin rin! / 恋のシグナルRin rin rin!": 20,
    "Hoshizora Rin - Kururin MIRACLE": 76,
    "Hoshizora Rin - Kururin MIRACLE / くるりんMIRACLE": 76,
    "Koizumi Hanayo - Kodoku na Heaven": 25,
    "Koizumi Hanayo - Kodoku na Heaven / 孤独なHeaven": 25,
    "Koizumi Hanayo - Nawatobi": 47,
    "Koizumi Hanayo - Nawatobi / なわとび": 47,
    "Toujo Nozomi - Junai Lens": 23,
    "Toujo Nozomi - Junai Lens / 純愛レンズ": 23,
    "Toujo Nozomi - Moshimo Kara Kitto": 81,
    "Toujo Nozomi - Moshimo Kara Kitto / もしもからきっと": 81,
    "Yazawa Nico - Mahoutsukai Hajimemashita!": 22,
    "Yazawa Nico - Mahoutsukai Hajimemashita! / まほうつかいはじめました!": 22,
    "Yazawa Nico - Niko puri♥Joshi dou": 53,
    "Yazawa Nico - Niko puri♥Joshi dou / にこぷり♥女子道": 53,
    "Aqours - Aozora Jumping Heart": 129,
    "Aqours - Aozora Jumping Heart / 青空Jumping Heart": 129,
    "Aqours - Aqours Pirates Desire": 156,
    "Aqours - Aqours☆HEROES": 105,
    "Aqours - BANZAI! digital trippers": 430,
    "Aqours - Bokura no Hashittekita Michi wa…": 157,
    "Aqours - Bokura no Hashittekita Michi wa… / 僕らの走ってきた道は…": 157,
    "Aqours - Bouken Type A, B, C!!": 158,
    "Aqours - Bouken Type A, B, C!! / 冒険Type A, B, C‼": 158,
    "Aqours - Brightest Melody": 159,
    "Aqours - CYaZALEA☆Kiss☆Dadandaan": 160,
    "Aqours - CYaZALEA☆Kiss☆Dadandaan / シャゼリア☆キッス☆ダダンダーン": 160,
    "Aqours - Daisuki Dattara Daijoubu!": 131,
    "Aqours - Daisuki Dattara Daijoubu! / ダイスキだったらダイジョウブ！": 131,
    "Aqours - Dance with Minotaurus": 161,
    "Aqours - Daydream Warrior": 144,
    "Aqours - Deep Resonance": 162,
    "Aqours - DREAMY COLOR": 163,
    "Aqours - Fantastic Departure!": 164,
    "Aqours - Future flight": 165,
    "Aqours - G Senjou no Cinderella": 145,
    "Aqours - G Senjou no Cinderella / G線上のシンデレラ": 145,
    "Aqours - GEMSTONE \"DE‐A‐I\"": 398,
    "Aqours - Hajimari Road": 166,
    "Aqours - Hajimari Road / ハジマリロード": 166,
    "Aqours - HAPPY PARTY TRAIN": 152,
    "Aqours - Hop? Stop? Nonstop!": 167,
    "Aqours - Hop・Step・Waai!": 168,
    "Aqours - Hop・Step・Waai! / ホップ・ステップ・ワーイ！": 168,
    "Aqours - Humming Friend": 128,
    "Aqours - Humming Friend / ハミングフレンド": 128,
    "Aqours - i-n-g, I TRY!!": 169,
    "Aqours - Jimo Ai ♡ Mantan ☆ Summer Life": 170,
    "Aqours - Jimo Ai ♡ Mantan ☆ Summer Life / 地元愛♡満タン☆サマーライフ": 170,
    "Aqours - JIMO-AI Dash!": 171,
    "Aqours - Jingle Bells ga Tomaranai": 140,
    "Aqours - Jingle Bells ga Tomaranai / ジングルベルがとまらない": 140,
    "Aqours - Jump up HIGH!!": 172,
    "Aqours - KA-GA-YA-KI-RA-RI-RA": 431,
    "Aqours - Kimeta yo Hand in Hand": 130,
    "Aqours - Kimeta yo Hand in Hand / 決めたよHand in Hand": 130,
    "Aqours - Kimi no Hitomi wo Meguru Bouken": 173,
    "Aqours - Kimi no Hitomi wo Meguru Bouken / 君の瞳を巡る冒険": 173,
    "Aqours - Kimi no Kokoro wa Kagayaiteru Kai?": 106,
    "Aqours - Kimi no Kokoro wa Kagayaiteru Kai? / 君のこころは輝いてるかい？": 106,
    "Aqours - Kimochi mo Yume mo Issho da ne!": 174,
    "Aqours - Kimochi mo Yume mo Issho da ne! / キモチもユメも一緒だね！": 174,
    "Aqours - Kiseki Hikaru": 175,
    "Aqours - Kiseki Hikaru / キセキヒカル": 175,
    "Aqours - Koi ni Naritai AQUARIUM": 120,
    "Aqours - Koi ni Naritai AQUARIUM / 恋になりたいAQUARIUM": 120,
    "Aqours - KOKORO Magic \"A to Z\"": 176,
    "Aqours - Kokoro no Hane yo Kimi e Tondeke!": 177,
    "Aqours - Kokoro no Hane yo Kimi e Tondeke! / 心の羽よ君へ飛んでけ！": 177,
    "Aqours - KU-RU-KU-RU Cruller!": 178,
    "Aqours - Landing action yeah!!": 179,
    "Aqours - Manatsu wa Dare no Mono?": 180,
    "Aqours - Manatsu wa Dare no Mono? / 真夏は誰のモノ？": 180,
    "Aqours - Marine Border Parasol": 181,
    "Aqours - Mattete Ai no Uta": 121,
    "Aqours - Mattete Ai no Uta / 待ってて愛のうた": 121,
    "Aqours - Mijuku DREAMER": 135,
    "Aqours - Mijuku DREAMER / 未熟DREAMER": 135,
    "Aqours - MIRACLE WAVE": 182,
    "Aqours - Mirai no Bokura wa Shitteru yo": 183,
    "Aqours - Mirai no Bokura wa Shitteru yo / 未来の僕らは知ってるよ": 183,
    "Aqours - MIRAI TICKET": 138,
    "Aqours - Misty Frosty Love": 184,
    "Aqours - Mitaiken HORIZON": 185,
    "Aqours - Mitaiken HORIZON / 未体験HORIZON": 185,
    "Aqours - \"MY LIST\" to you!": 186,
    "Aqours - MY Mai☆TONIGHT": 187,
    "Aqours - MY Mai☆TONIGHT / MY 舞☆TONIGHT ": 187,
    "Aqours - Namida ga Yuki ni Naru Mae ni": 188,
    "Aqours - Namida ga Yuki ni Naru Mae ni / 涙が雪になる前に": 188,
    "Aqours - Namida Janai": 189,
    "Aqours - Namida Janai / 涙×": 189,
    "Aqours - Nando Datte Yakusoku!": 399,
    "Aqours - Nando Datte Yakusoku! / なんどだって約束！": 399,
    "Aqours - Natsu e no Tobira Never end ver.": 190,
    "Aqours - Natsu e no Tobira Never end ver. / 夏への扉 Never end ver. ": 190,
    "Aqours - Natsu no Owari no Amaoto ga": 191,
    "Aqours - Natsu no Owari no Amaoto ga / 夏の終わりの雨音が": 191,
    "Aqours - Next SPARKLING!!": 192,
    "Aqours - No. 10": 193,
    "Aqours - not ALONE not HITORI": 194,
    "Aqours - Omoi yo Hitotsu ni Nare": 139,
    "Aqours - Omoi yo Hitotsu ni Nare / 想いよひとつになれ": 139,
    "Aqours - Party! Party! PaPaPaParty!": 195,
    "Aqours - Pops heart de Odorun damon!": 136,
    "Aqours - Pops heart de Odorun damon! / Pops heartで踊るんだもん！": 136,
    "Aqours - Seinaru Hi no Inori": 141,
    "Aqours - Seinaru Hi no Inori / 聖なる日の祈り": 141,
    "Aqours - Shoujo Ijou no Koi ga Shitai": 151,
    "Aqours - Shoujo Ijou no Koi ga Shitai / 少女以上の恋がしたい": 151,
    "Aqours - SKY JOURNEY": 153,
    "Aqours - smile smile ship Start!": 196,
    "Aqours - Sora mo Kokoro mo Hareru kara": 137,
    "Aqours - Sora mo Kokoro mo Hareru kara / 空も心も晴れるから": 137,
    "Aqours - Step! ZERO to ONE": 107,
    "Aqours - SUKI for you, DREAM for you!": 197,
    "Aqours - Sunshine Pikkapika Ondo": 133,
    "Aqours - Sunshine Pikkapika Ondo / サンシャインぴっかぴか音頭": 133,
    "Aqours - Taiyou o Oikakero!": 148,
    "Aqours - Taiyou o Oikakero! / 太陽を追いかけろ!": 148,
    "Aqours - Thank you, FRIENDS!!": 198,
    "Aqours - Thrilling One Way": 146,
    "Aqours - Thrilling One Way / スリリング・ワンウェイ": 146,
    "Aqours - Todokanai Hoshi da to Shitemo": 119,
    "Aqours - Todokanai Hoshi da to Shitemo / 届かない星だとしても": 119,
    "Aqours - Tousou Meisou Mobius Loop": 199,
    "Aqours - Tousou Meisou Mobius Loop / 逃走迷走メビウスループ": 199,
    "Aqours - Wake up, Challenger!!": 200,
    "Aqours - Waku-Waku-Week!": 142,
    "Aqours - WATER BLUE NEW WORLD": 201,
    "Aqours - WONDERFUL STORIES": 202,
    "Aqours - Yosoku Fukanou Driving!": 203,
    "Aqours - Yosoku Fukanou Driving! / 予測不可能Driving!": 203,
    "Aqours - Yume + Mirai ＝ Mugendai": 416,
    "Aqours - Yume de Yozora wo Terashitai": 134,
    "Aqours - Yume de Yozora wo Terashitai / 夢で夜空を照らしたい": 134,
    "Aqours - Yume Kataru yori Yume Utaou": 132,
    "Aqours - Yume Kataru yori Yume Utaou / ユメ語るよりユメ歌おう": 132,
    "Aqours - Yuuki wa doko ni? Kimi no Mune ni!": 204,
    "Aqours - Yuuki wa doko ni? Kimi no Mune ni! / 勇気はどこに?君の胸に!": 204,
    "Saint Snow - After The Rain": 205,
    "Saint Snow - Believe again": 206,
    "Saint Snow - CRASH MIND": 207,
    "Saint Snow - Dazzling White Town": 208,
    "Saint Snow - DROPOUT!?": 209,
    "Saint Snow - Lonely Snow Planet": 210,
    "Saint Snow - SELF CONTROL!!": 143,
    "Saint Aqours Snow - Awaken the power": 211,
    "Saint Aqours Snow - Over The Next Rainbow": 212,
    "CYaRon! - Aru Hi... Eien Mitai ni!": 213,
    "CYaRon! - Aru Hi... Eien Mitai ni! / ある日…永遠みたいに！": 213,
    "CYaRon! - Braveheart Coaster": 214,
    "CYaRon! - CHANGELESS": 215,
    "CYaRon! - Dragon Riders": 216,
    "CYaRon! - Dragon Riders / ドラゴンライダーズ": 216,
    "CYaRon! - Genki Zenkai DAY! DAY! DAY!": 122,
    "CYaRon! - Genki Zenkai DAY! DAY! DAY! / 元気全開DAY! DAY! DAY!": 122,
    "CYaRon! - Kaigandoori de Matteru yo": 217,
    "CYaRon! - Kaigandoori de Matteru yo / 海岸通りで待ってるよ": 217,
    "CYaRon! - Kinmirai Happy End": 218,
    "CYaRon! - Kinmirai Happy End / 近未来ハッピーエンド": 218,
    "CYaRon! - Kodoku・Teleport": 219,
    "CYaRon! - Kodoku・Teleport / コドク・テレポート": 219,
    "CYaRon! - P.S. no Mukougawa": 149,
    "CYaRon! - P.S. no Mukougawa / P.S.の向こう側": 149,
    "CYaRon! - Sakura Bye Bye": 220,
    "CYaRon! - Sakura Bye Bye / サクラバイバイ": 220,
    "CYaRon! - Whistle of Revolution": 221,
    "CYaRon! - Yozora wa Nandemo Shitteru no?": 123,
    "CYaRon! - Yozora wa Nandemo Shitteru no? / 夜空はなんでも知ってるの？": 123,
    "AZALEA - Amazing Travel DNA": 222,
    "AZALEA - Galaxy HidE and SeeK": 223,
    "AZALEA - INNOCENT BIRD": 224,
    "AZALEA - Kuuchuu Renai ron": 225,
    "AZALEA - Kuuchuu Renai ron / 空中恋愛論": 225,
    "AZALEA - LONELY TUNING": 150,
    "AZALEA - Maze Sekai": 226,
    "AZALEA - Maze Sekai / メイズセカイ": 226,
    "AZALEA - Metamorphism": 227,
    "AZALEA - Metamorphism / メタモルフィズム": 227,
    "AZALEA - PHOENIX DANCE": 228,
    "AZALEA - Sotsugyou desu ne": 229,
    "AZALEA - Sotsugyou desu ne / 卒業ですね": 229,
    "AZALEA - Tokimeki Bunruigaku": 124,
    "AZALEA - Tokimeki Bunruigaku / ときめき分類学": 124,
    "AZALEA - Torikoriko PLEASE!!": 125,
    "AZALEA - Torikoriko PLEASE!! / トリコリコPLEASE!!": 125,
    "AZALEA - We‘ll get the next dream!!!": 230,
    "Guilty Kiss - Deep Sea Cocoon": 231,
    "Guilty Kiss - Guilty Eyes Fever": 147,
    "Guilty Kiss - Guilty Night, Guilty Kiss!": 127,
    "Guilty Kiss - Guilty!? Farewell party": 232,
    "Guilty Kiss - Kowareyasuki": 233,
    "Guilty Kiss - Kowareyasuki / コワレヤスキ": 233,
    "Guilty Kiss - Love Pulsar": 234,
    "Guilty Kiss - Nameless Love Song": 235,
    "Guilty Kiss - New Romantic Sailors": 236,
    "Guilty Kiss - Phantom Rocket Adventure": 237,
    "Guilty Kiss - Shadow Gate to Love": 238,
    "Guilty Kiss - Shooting Star Warrior": 239,
    "Guilty Kiss - Strawberry Trapper": 126,
    "Takami Chika - Never giving up!": 240,
    "Takami Chika - OKAWARI Happy life!": 241,
    "Takami Chika - One More Sunshine Story": 242,
    "Sakurauchi Riko - Love Spiral Tower": 243,
    "Sakurauchi Riko - Pianoforte Monologue": 244,
    "Sakurauchi Riko - PURE PHRASE": 245,
    "Matsuura Kanan - Motto ne!": 246,
    "Matsuura Kanan - Motto ne! / もっとね！": 246,
    "Matsuura Kanan - RUN KAKERU RUN": 383,
    "Matsuura Kanan - Sakana ka Nanadaka?": 247,
    "Matsuura Kanan - Sakana ka Nanadaka? / さかなかなんだか？": 247,
    "Kurosawa Dia - MOTTO-ZUTTO be with you": 380,
    "Kurosawa Dia - Perfect SEKAI": 248,
    "Kurosawa Dia - WHITE FIRST LOVE": 249,
    "Watanabe You - Beginner's Sailing": 250,
    "Watanabe You - Totsuzen GIRL": 251,
    "Watanabe You - Totsuzen GIRL / 突然GIRL": 251,
    "Watanabe You - Paradise Chime": 400,
    "Tsushima Yoshiko - in this unstable world": 252,
    "Tsushima Yoshiko - Meimei Tantei Yohane": 418,
    "Tsushima Yoshiko - Meimei Tantei Yohane / 迷冥探偵ヨハネ": 418,
    "Tsushima Yoshiko - Tatehoko Tsubasa": 253,
    "Tsushima Yoshiko - Tatehoko Tsubasa / タテホコツバサ": 253,
    "Kunikida Hanamaru - Akogare Ranraran": 254,
    "Kunikida Hanamaru - Akogare Ranraran / あこがれランララン": 254,
    "Kunikida Hanamaru - Oyasuminasan!": 255,
    "Kunikida Hanamaru - Oyasuminasan! / おやすみなさん！": 255,
    "Kunikida Hanamaru - Yaa! Kouunryuusui!?": 397,
    "Kunikida Hanamaru - Yaa! Kouunryuusui!? / やあ！行雲流水！？": 397,
    "Ohara Mari - Love is all, I sing love is all!": 411,
    "Ohara Mari - New winding road": 256,
    "Ohara Mari - Shiny Racers": 257,
    "Kurosawa Ruby - 1STAR": 258,
    "Kurosawa Ruby - Cotton Candy Ei-Ei-Oh!": 259,
    "Kurosawa Ruby - Cotton Candy Ei-Ei-Oh! / コットンキャンディえいえいおー！": 259,
    "Kurosawa Ruby - RED GEM WINK": 260,
    "Nijigasaki - Colorful Dreams! Colorful Smiles!": 402,
    "Nijigasaki - Eien no Isshun": 444,
    "Nijigasaki - Eien no Isshun / 永遠の一瞬": 444,
    "Nijigasaki - Future Parade": 417,
    "Nijigasaki - Hurray Hurray": 261,
    "Nijigasaki - Just Believe!!": 262,
    "Nijigasaki - L！L！L! (Love the Life We Live)": 263,
    "Nijigasaki - Level Oops! Adventures": 420,
    "Nijigasaki - Love U my friends": 264,
    "Nijigasaki - Miracle STAY TUNE!": 265,
    "Nijigasaki - Miracle STAY TUNE! / ミラクル STAY TUNE!": 265,
    "Nijigasaki - Mirai Harmony": 266,
    "Nijigasaki - Mirai Harmony / 未来ハーモニー": 266,
    "Nijigasaki - NEO SKY, NEO MAP!": 267,
    "Nijigasaki - Nijiiro Passions!": 268,
    "Nijigasaki - Nijiiro Passions! / 虹色Passions!": 268,
    "Nijigasaki - Ryouran! Victory Road": 404,
    "Nijigasaki - Ryouran! Victory Road / 繚乱！ビクトリーロード": 404,
    "Nijigasaki - Sweet Eyes": 269,
    "Nijigasaki - TOKIMEKI Runners": 270,
    "Nijigasaki - Twilight": 401,
    "Nijigasaki - Twilight / トワイライト": 401,
    "Nijigasaki - Yume ga Bokura no Taiyou sa": 403,
    "Nijigasaki - Yume ga Bokura no Taiyou sa / 夢が僕らの太陽さ": 403,
    "Nijigasaki - Yume ga Koko Kara Hajimaru yo": 271,
    "Nijigasaki - Yume ga Koko Kara Hajimaru yo / 夢がここからはじまるよ": 271,
    "Nijigasaki - Zensoku Dreamer": 272,
    "Nijigasaki - Zensoku Dreamer / 全速ドリーマー": 272,
    "AZUNA - Cheer for you!!": 273,
    "AZUNA - Dream Land! Dream World!": 274,
    "AZUNA - Folklore ~Kanki no Uta~": 275,
    "AZUNA - Folklore ~Kanki no Uta~ / フォルクロア ～歓喜の歌～": 275,
    "AZUNA - Happy Nyan! Days": 276,
    "AZUNA - Kakushiaji!": 277,
    "AZUNA - Maze Town": 278,
    "DiverDiva - Fly into the sky": 279,
    "DiverDiva - Love Triangle": 280,
    "DiverDiva - POWER SPOT!!": 281,
    "DiverDiva - Saika -saika-": 282,
    "DiverDiva - Saika -saika- / 祭花 -saika-": 282,
    "DiverDiva - SUPER NOVA": 283,
    "DiverDiva - THE SECRET NiGHT": 284,
    "QU4RTZ - Beautiful Moonlight": 285,
    "QU4RTZ - Make-up session ABC": 286,
    "QU4RTZ - Not Sad": 287,
    "QU4RTZ - Sing & Smile!!": 288,
    "QU4RTZ - Swinging!": 289,
    "QU4RTZ - Twinkle Town": 290,
    "QU4RTZ - ENJOY IT!": 405,
    "R3BIRTH - MONSTER GIRLS": 291,
    "R3BIRTH - Bubble Over! / バブルオーバー！": 440,
    "Uehara Ayumu - Awakening Promise": 292,
    "Uehara Ayumu - Break The System": 293,
    "Uehara Ayumu - Dream with You": 294,
    "Uehara Ayumu - Kaika Sengen": 295,
    "Uehara Ayumu - Kaika Sengen / 開花宣言 ": 295,
    "Uehara Ayumu - Say Good-Bye Namida": 296,
    "Uehara Ayumu - Say Good-Bye Namida / Say Good-Bye 涙": 296,
    "Uehara Ayumu - Yume e no Ippo": 297,
    "Uehara Ayumu - Yume e no Ippo / 夢への一歩": 297,
    "Nakasu Kasumi - ☆Wonderland☆": 298,
    "Nakasu Kasumi - ☆Wonderland☆ / ☆ワンダーランド☆": 298,
    "Nakasu Kasumi - Diamond": 299,
    "Nakasu Kasumi - Diamond / ダイアモンド": 299,
    "Nakasu Kasumi - Margaret": 300,
    "Nakasu Kasumi - Mutekikyuu*Believer": 301,
    "Nakasu Kasumi - Mutekikyuu*Believer / 無敵級*ビリーバー": 301,
    "Nakasu Kasumi - Poppin' Up!": 302,
    "Nakasu Kasumi - TO BE YOURSELF": 303,
    "Osaka Shizuku - Anata no Risou no Heroine": 304,
    "Osaka Shizuku - Anata no Risou no Heroine / あなたの理想のヒロイン": 304,
    "Osaka Shizuku - Audrey": 305,
    "Osaka Shizuku - Audrey / オードリー": 305,
    "Osaka Shizuku - Eieisa": 306,
    "Osaka Shizuku - Eieisa / エイエ戦サー": 306,
    "Osaka Shizuku - Solitude Rain": 307,
    "Osaka Shizuku - Yagate Hitotsu no Monogatari": 308,
    "Osaka Shizuku - Yagate Hitotsu no Monogatari / やがてひとつの物語": 308,
    "Asaka Karin - Fire Bird": 309,
    "Asaka Karin - Starlight": 310,
    "Asaka Karin - Turn it Up!": 311,
    "Asaka Karin - VIVID WORLD": 312,
    "Asaka Karin - Wish": 313,
    "Miyashita Ai - Diabolic mulier": 314,
    "Miyashita Ai - Meccha Going!!": 315,
    "Miyashita Ai - Meccha Going!! / めっちゃGoing!! ": 315,
    "Miyashita Ai - Saikou Heart": 316,
    "Miyashita Ai - Saikou Heart / サイコーハート": 316,
    "Miyashita Ai - Tanoshii no Tensai": 317,
    "Miyashita Ai - Tanoshii no Tensai / 楽しいの天才": 317,
    "Miyashita Ai - Yuu & Ai": 318,
    "Miyashita Ai - Yuu & Ai / 友 & 愛": 318,
    "Konoe Kanata - Butterfly": 319,
    "Konoe Kanata - My Own Fairy-Tale": 320,
    "Konoe Kanata - Märchen Star": 321,
    "Konoe Kanata - Nemureru Mori ni Ikitai na": 322,
    "Konoe Kanata - Nemureru Mori ni Ikitai na / 眠れる森に行きたいな": 322,
    "Konoe Kanata - Silent Blaze": 323,
    "Yuki Setsuna - CHASE": 324,
    "Yuki Setsuna - DIVE!": 325,
    "Yuki Setsuna - LIKE IT! LOVE IT!": 326,
    "Yuki Setsuna - MELODY": 327,
    "Yuki Setsuna - Yada!": 328,
    "Yuki Setsuna - Yada! / ヤダ！": 328,
    "Emma Verde - Aion no Uta": 329,
    "Emma Verde - Aion no Uta / 哀温ノ詩": 329,
    "Emma Verde - Evergreen": 330,
    "Emma Verde - Itsu datte for you!": 331,
    "Emma Verde - Itsu datte for you! / いつだってfor you!": 331,
    "Emma Verde - Koe Tsunagou yo": 332,
    "Emma Verde - Koe Tsunagou yo / 声繋ごうよ": 332,
    "Emma Verde - La Bella Patria": 333,
    "Tennoji Rina - Analog Heart": 334,
    "Tennoji Rina - Analog Heart / アナログハート": 334,
    "Tennoji Rina - Doki Pipo ☆ Emotion": 335,
    "Tennoji Rina - Doki Pipo ☆ Emotion / ドキピポ☆エモーション": 335,
    "Tennoji Rina - First Love Again": 336,
    "Tennoji Rina - Tele-telepathy": 337,
    "Tennoji Rina - Tele-telepathy / テレテレパシー": 337,
    "Tennoji Rina - Tsunagaru Connect": 338,
    "Tennoji Rina - Tsunagaru Connect / ツナガルコネクト": 338,
    "Mifune Shioriko - Aoi Canaria": 339,
    "Mifune Shioriko - Aoi Canaria / 翠いカナリア": 339,
    "Mifune Shioriko - Concentrate!": 340,
    "Mifune Shioriko - Concentrate! / コンセントレイト！": 340,
    "Mifune Shioriko - Ketsui no Hikari": 341,
    "Mifune Shioriko - Ketsui no Hikari / 決意の光": 341,
    "Mia Taylor - I'm Still...": 342,
    "Mia Taylor - Toy Doll": 343,
    "Zhong Lanzhu - Queendom": 344,
    "Zhong Lanzhu - Ye Mingzhu": 345,
    "Zhong Lanzhu - Ye Mingzhu / 夜明珠 ": 345,
    "Liella! - 1,2,3!": 346,
    "Liella! - Bye Bye shichaeba!?": 347,
    "Liella! - Bye Bye shichaeba!? / バイバイしちゃえば！？": 347,
    "Liella! - Crescendo Yu・Ra": 389,
    "Liella! - Crescendo Yu・Ra / クレッシェンドゆ・ら": 389,
    "Liella! - Dakara Bokura wa Narasunda!": 348,
    "Liella! - Dakara Bokura wa Narasunda! / だから僕らは鳴らすんだ！": 348,
    "Liella! - Dancing Heart La-Pa-Pa-Pa!": 349,
    "Liella! - Day1": 350,
    "Liella! - Departure": 351,
    "Liella! - Dream Rainbow": 352,
    "Liella! - Dreaming Energy": 353,
    "Liella! - GOING UP": 354,
    "Liella! - Hajimari wa Kimi no Sora": 355,
    "Liella! - Hajimari wa Kimi no Sora / 始まりは君の空": 355,
    "Liella! - HAPPY TO DO WA!": 385,
    "Liella! - Kawaranai Subete": 355,
    "Liella! - Kawaranai Subete / 変わらないすべて": 355,
    "Liella! - Kono Machi de Ima Kimi to": 356,
    "Liella! - Kono Machi de Ima Kimi to / この街でいまキミと": 356,
    "Liella! - Mabataki no Saki e": 357,
    "Liella! - Mabataki no Saki e / 瞬きの先へ": 357,
    "Liella! - Mirai wa Kaze no You ni": 358,
    "Liella! - Mirai wa Kaze no You ni / 未来は風のように": 358,
    "Liella! - Mirai Yohou Hallelujah!": 359,
    "Liella! - Mirai Yohou Hallelujah! / 未来予報ハレルヤ!": 359,
    "Liella! - Nonfiction!!": 360,
    "Liella! - Nonfiction!! / ノンフィクション!!": 360,
    "Liella! - Primary": 361,
    "Liella! - Sagashite! Future": 387,
    "Liella! - Sagashite! Future / 探して！Future": 387,
    "Liella! - Shooting Voice!!": 362,
    "Liella! - Starlight Prologue": 310,
    "Liella! - START!! True dreams": 363,
    "Liella! - Stella!": 364,
    "Liella! - Tiny Stars": 365,
    "Liella! - Tokonatsu☆Sunshine": 366,
    "Liella! - Tokonatsu☆Sunshine / 常夏☆サンシャイン": 366,
    "Liella! - Tu Tu Tu!": 384,
    "Liella! - Tu Tu Tu! / トゥ トゥ トゥ！": 384,
    "Liella! - Unison": 392,
    "Liella! - Unison / ユニゾン": 392,
    "Liella! - Watashi no Symphony": 367,
    "Liella! - Watashi no Symphony / 私のSymphony": 367,
    "Liella! - What a Wonderful Dream!!": 394,
    "Liella! - Wish Song": 313,
    "Liella! - Star Sengen": 422,
    "Liella! - WE WILL!!": 423,
    "Liella! - Oi kakeru Yume no Saki de": 425,
    "Liella! - Mizushibuki no Sign": 424,
    "Liella! - Welcome to Bokura no Sekai": 428,
    "Liella! - Irozuite Tomei": 427,
    "Liella! - Go!! Restart": 426,
    "Liella! - Yuragu wa": 429,
    "Liella! - Utopia Magic": 438,
    "Liella! - Vitamin SUMMER!": 436,
    "Liella! - Chance Day, Chance Way!": 437,
    "Liella! - POP TALKING": 435,
    "Sunny Passion - HOT PASSION!!": 381,
    "Sunny Passion - Till Sunrise": 382,
    "Shibuya Kanon - Aozora o Matteru": 396,
    "Shibuya Kanon - Aozora o Matteru / 青空を待ってる": 396,
    "Shibuya Kanon - Kokoro Kirarara": 369,
    "Shibuya Kanon - Kokoro Kirarara / 心キラララ": 369,
    "Tang Keke - Mizuiro no Sunday": 391,
    "Tang Keke - Mizuiro no Sunday / 水色のSunday": 391,
    "Tang Keke - Oh! Ready Steady Positive": 370,
    "Tang Keke - Oh! Ready Steady Positive / Oh！レディ・ステディ・ポジティブ": 370,
    "Arashi Chisato - Flyer's High": 393,
    "Arashi Chisato - Yuuki no Kakera": 371,
    "Arashi Chisato - Yuuki no Kakera / 勇気のカケラ": 371,
    "Heanna Sumire - Heroines☆Runway": 372,
    "Heanna Sumire - Heroines☆Runway / ヒロインズ☆ランウェイ": 372,
    "Heanna Sumire - Mitero!": 395,
    "Heanna Sumire - Mitero! / みてろ！": 395,
    "Hazuki Ren - Binetsu no Waltz": 390,
    "Hazuki Ren - Binetsu no Waltz / 微熱のワルツ": 390,
    "Hazuki Ren - Reverb": 373,
    "Hazuki Ren - Reverb / リバーブ": 373,
    "Shibuya Kanon / Heanna Sumire - Message": 374,
    "Shibuya Kanon / Arashi Chisato - Memories": 375,
    "Tang Keke / Hazuki Ren - Anniversary": 376,
    "Tang Keke / Arashi Chisato - Ringing!": 377,
    "Heanna Sumire / Hazuki Ren - Dears": 378,
    "Aqours / Nijigasaki / Liella - LIVE with a smile!": 379
}

const OLD_HEARDLE_ROUNDS = [
    344, // 1, Zhong Lanzhu - Queendom
    125, // 2, AZALEA - Torikoriko PLEASE!!
    4, // 3, Printemps - Love marginal
    307, // 4, Osaka Shizuku - Solitude Rain
    80, // 5, µ's - Ruteshi Kisuki Shiteru / るてしキスキしてる
    201, // 6, Aqours - WATER BLUE NEW WORLD
    254, // 7, Kunikida Hanamaru - Akogare Ranraran / あこがれランララン
    173, // 8, Aqours - Kimi no Hitomi wo Meguru Bouken / 君の瞳を巡る冒険
    78, // 9, µ's - Storm in Lover
    86, // 10, lily white - Futari Happiness / ふたりハピネス
    177, // 11, Aqours - Kokoro no Hane yo Kimi e Tondeke! / 心の羽よ君へ飛んでけ！
    286, // 12, QU4RTZ - Make-up session ABC
    115, // 13, BiBi - PSYCHIC FIRE
    186, // 14, Aqours - "MY LIST" to you!
    333, // 15, Emma Verde - La Bella Patria
    310, // 16, Liella! - Starlight Prologue
    339, // 17, Mifune Shioriko - Aoi Canaria / 翠いカナリア
    63, // 18, µ's - ENDLESS PARADE
    268, // 19, Nijigasaki - Nijiiro Passions! / 虹色Passions!
    253, // 20, Tsushima Yoshiko - Tatehoko Tsubasa / タテホコツバサ
    141, // 21, Aqours - Seinaru Hi no Inori / 聖なる日の祈り
    302, // 22, Nakasu Kasumi - Poppin' Up!
    89, // 23, lily white - Onaji Hoshi ga Mitai / 同じ星が見たい
    155, // 24, µ's - Natte Shimatta! / なってしまった！
    372, // 25, Heanna Sumire - Heroines☆Runway / ヒロインズ☆ランウェイ
    379, // 26, Aqours / Nijigasaki / Liella - LIVE with a smile!
    340, // 27, Mifune Shioriko - Concentrate! / コンセントレイト！
    103, // 28, µ's - Bokutachi wa Hitotsu no Hikari / 僕たちはひとつの光
    58, // 29, Printemps - Puwa Puwa-O! / ぷわぷわーお！
    76, // 30, Hoshizora Rin - Kururin MIRACLE / くるりんMIRACLE
    210, // 31, Saint Snow - Lonely Snow Planet
    169, // 32, Aqours - i-n-g, I TRY!!
    238, // 33, Guilty Kiss - Shadow Gate to Love
    267, // 34, Nijigasaki - NEO SKY, NEO MAP!
    400, // 35, Watanabe You - Paradise Chime
    349, // 36, Liella! - Dancing Heart La-Pa-Pa-Pa!
    66, // 37, µ's - Donna Toki mo Zutto / どんなときもずっと
    1, // 38, µ's - Yuujou No Change / 友情ノーチェンジ
    280, // 39, DiverDiva - Love Triangle
    291, // 40, R3BIRTH - MONSTER GIRLS
    31, // 41, µ's - Oh,Love&Peace!
    175, // 42, Aqours - Kiseki Hikaru / キセキヒカル
    162, // 43, Aqours - Deep Resonance
    309, // 44, Asaka Karin - Fire Bird
    261, // 45, Nijigasaki - Hurray Hurray
    365, // 46, Liella! - Tiny Stars
    331, // 47, Emma Verde - Itsu datte for you! / いつだってfor you!
    139, // 48, Aqours - Omoi yo Hitotsu ni Nare / 想いよひとつになれ
    143, // 49, Saint Snow - SELF CONTROL!!
    154, // 50, µ's - A song for You! You? You!!
    321, // 51, Konoe Kanata - Märchen Star
    56, // 52, µ's - Garasu no Hanazono / 硝子の花園
    16, // 53, µ's - Mogyutto "love" de Sekkin Chuu! / もぎゅっと“love”で接近中!
    28, // 54, Sonoda Umi - Yuuki no Reason / 勇気のReason
    231, // 55, Guilty Kiss - Deep Sea Cocoon
    270, // 56, Nijigasaki - TOKIMEKI Runners
    152, // 57, Aqours - HAPPY PARTY TRAIN
    249, // 58, Kurosawa Dia - WHITE FIRST LOVE
    299, // 59, Nakasu Kasumi - Diamond / ダイアモンド
    360, // 60, Liella! - Nonfiction!! / ノンフィクション!!
    41, // 61, µ's - Korekara no Someday / これからのSomeday
    100, // 62, µ's - Hello, Hoshi o Kazoete / Hello,星を数えて
    184, // 63, Aqours - Misty Frosty Love
    178, // 64, Aqours - KU-RU-KU-RU Cruller!
    59, // 65, µ's - LOVELESS WORLD
    99, // 66, µ's - Angelic Angel
    262, // 67, Nijigasaki - Just Believe!!
    64, // 68, µ's - Sore wa Bokutachi no Kiseki / それは僕たちの奇跡
    342, // 69, Mia Taylor - I'm Still...
    61, // 70, µ's - Takaramonozu / タカラモノズ
    211, // 71, Saint Aqours Snow - Awaken the power
    127, // 72, Guilty Kiss - Guilty Night, Guilty Kiss!
    18, // 73, µ's - Mermaid festa vol.2 ~Passionate~
    90, // 74, BiBi - Silent tonight
    324, // 75, Yuki Setsuna - CHASE
    167, // 76, Aqours - Hop? Stop? Nonstop!
    74, // 77, µ's - Happy maker!
    46, // 78, µ's - Anemone heart
    303, // 79, Nakasu Kasumi - TO BE YOURSELF
    213, // 80, CYaRon! - Aru Hi... Eien Mitai ni! / ある日…永遠みたいに！
    199, // 81, Aqours - Tousou Meisou Mobius Loop / 逃走迷走メビウスループ
    234, // 82, Guilty Kiss - Love Pulsar
    111, // 83, Printemps - NO EXIT ORION
    334, // 84, Tennoji Rina - Analog Heart / アナログハート
    27, // 85, Nishikino Maki - Daring!
    399, // 86, Aqours - Nando Datte Yakusoku! / なんどだって約束！
    314, // 87, Miyashita Ai - Diabolic mulier
    328, // 88, Yuki Setsuna - Yada! / ヤダ！
    380, // 89, Kurosawa Dia - MOTTO-ZUTTO be with you
    230, // 90, AZALEA - We‘ll get the next dream!!!
    359, // 91, Liella! - Mirai Yohou Hallelujah! / 未来予報ハレルヤ!
    327, // 92, Yuki Setsuna - MELODY
    259, // 93, Kurosawa Ruby - Cotton Candy Ei-Ei-Oh! / コットンキャンディえいえいおー！
    45, // 94, A-RISE - Private Wars
    102, // 95, µ's - SUNNY DAY SONG
    292, // 96, Uehara Ayumu - Awakening Promise
    157, // 97, Aqours - Bokura no Hashittekita Michi wa… / 僕らの走ってきた道は…
    319, // 98, Konoe Kanata - Butterfly
    196, // 99, Aqours - smile smile ship Start!
    2, // 100, µ's - Snow halation
    53, // 101, Yazawa Nico - Niko puri♥Joshi dou / にこぷり♥女子道
    11, // 102, µ's - Natsuiro Egao de 1,2,Jump! / 夏色えがおで1,2,Jump!
    163, // 103, Aqours - DREAMY COLOR
    129, // 104, Aqours - Aozora Jumping Heart / 青空Jumping Heart
    35, // 105, µ's - WILD STARS
    338, // 106, Tennoji Rina - Tsunagaru Connect / ツナガルコネクト
    126, // 107, Guilty Kiss - Strawberry Trapper
    341, // 108, Mifune Shioriko - Ketsui no Hikari / 決意の光
    312, // 109, Asaka Karin - VIVID WORLD
    73, // 110, µ's - KiRa-KiRa Sensation!
    191, // 111, Aqours - Natsu no Owari no Amaoto ga / 夏の終わりの雨音が
    322, // 112, Konoe Kanata - Nemureru Mori ni Ikitai na / 眠れる森に行きたいな
    222, // 113, AZALEA - Amazing Travel DNA
    14, // 114, Kousaka Honoka - Ai wa Taiyou Ja Nai? / 愛は太陽じゃない?
    223, // 115, AZALEA - Galaxy HidE and SeeK
    297, // 116, Uehara Ayumu - Yume e no Ippo / 夢への一歩
    49, // 117, lily white - Kimi no Kuse ni! / キミのくせに
    207, // 118, Saint Snow - CRASH MIND
    57, // 119, µ's - LONELIEST BABY
    32, // 120, µ's - Wonderful Rush
    134, // 121, Aqours - Yume de Yozora wo Terashitai / 夢で夜空を照らしたい
    335, // 122, Tennoji Rina - Doki Pipo ☆ Emotion / ドキピポ☆エモーション
    156, // 123, Aqours - Aqours Pirates Desire
    225, // 124, AZALEA - Kuuchuu Renai ron / 空中恋愛論
    47, // 125, Koizumi Hanayo - Nawatobi / なわとび
    44, // 126, µ's - No brand girls
    275, // 127, AZUNA - Folklore ~Kanki no Uta~ / フォルクロア ～歓喜の歌～
    160, // 128, Aqours - CYaZALEA☆Kiss☆Dadandaan / シャゼリア☆キッス☆ダダンダーン
    183, // 129, Aqours - Mirai no Bokura wa Shitteru yo / 未来の僕らは知ってるよ
    5, // 130, Printemps - sweet&sweet holiday
    40, // 131, µ's - START:DASH!!
    310, // 132, Asaka Karin - Starlight
    172, // 133, Aqours - Jump up HIGH!!
    36, // 134, µ's - Bokura wa Ima no Naka de / 僕らは今のなかで
    293, // 135, Uehara Ayumu - Break The System
    288, // 136, QU4RTZ - Sing & Smile!!
    114, // 137, lily white - Shunjou Romantic / 春情ロマンティック
    218, // 138, CYaRon! - Kinmirai Happy End / 近未来ハッピーエンド
    144, // 139, Aqours - Daydream Warrior
    269, // 140, Nijigasaki - Sweet Eyes
    168, // 141, Aqours - Hop・Step・Waai! / ホップ・ステップ・ワーイ！
    22, // 142, Yazawa Nico - Mahoutsukai Hajimemashita! / まほうつかいはじめました!
    17, // 143, µ's - Aishiteru Banzai! / 愛してるばんざーい!
    317, // 144, Miyashita Ai - Tanoshii no Tensai / 楽しいの天才
    212, // 145, Saint Aqours Snow - Over The Next Rainbow
    332, // 146, Emma Verde - Koe Tsunagou yo / 声繋ごうよ
    283, // 147, DiverDiva - SUPER NOVA
    200, // 148, Aqours - Wake up, Challenger!!
    15, // 149, Kousaka Honoka - Mou Hitori Ja Nai yo / もうひとりじゃないよ
    77, // 150, A-RISE - Shocking Party
    37, // 151, µ's - Kitto Seishun ga Kikoeru / きっと青春が聞こえる
    121, // 152, Aqours - Mattete Ai no Uta / 待ってて愛のうた
    69, // 153, µ's - SENTIMENTAL StepS
    358, // 154, Liella! - Mirai wa Kaze no You ni / 未来は風のように
    252, // 155, Tsushima Yoshiko - in this unstable world
    318, // 156, Miyashita Ai - Yuu & Ai / 友 & 愛
    382, // 157, Sunny Passion - Till Sunrise
    0, // 158, µ's - Bokura no LIVE Kimi to no LIFE / 僕らのLIVE 君とのLIFE
    204, // 159, Aqours - Yuuki wa doko ni? Kimi no Mune ni! / 勇気はどこに?君の胸に!
    3, // 160, µ's - baby maybe Koi no Button / baby maybe 恋のボタン
    402, // 161, Nijigasaki - Colorful Dreams! Colorful Smiles!
    148, // 162, Aqours - Taiyou o Oikakero! / 太陽を追いかけろ!
    214, // 163, CYaRon! - Braveheart Coaster
    24, // 164, Minami Kotori - Blueberry♥Train / ぶる～べりぃ♥とれいん
    147, // 165, Guilty Kiss - Guilty Eyes Fever
    132, // 166, Aqours - Yume Kataru yori Yume Utaou / ユメ語るよりユメ歌おう
    101, // 167, µ's - ？ ← HEARTBEAT
    38, // 168, µ's - Kaguya no Shiro de Odoritai / 輝夜の城で踊りたい
    294, // 169, Uehara Ayumu - Dream with You
    355, // 170, Liella! - Hajimari wa Kimi no Sora / 始まりは君の空
    193, // 171, Aqours - No. 10
    131, // 172, Aqours - Daisuki Dattara Daijoubu! / ダイスキだったらダイジョウブ！
    12, // 173, Sonoda Umi - Watashitachi wa Mirai no Hana / 私たちは未来の花
    39, // 174, µ's - Susume→Tomorrow / ススメ→トゥモロウ
    88, // 175, BiBi - Fuyu ga Kureta Yokan / 冬がくれた予感
    161, // 176, Aqours - Dance with Minotaurus
    54, // 177, Printemps - Pure girls project
    209, // 178, Saint Snow - DROPOUT!?
    112, // 179, µ's - Korekara / これから
    130, // 180, Aqours - Kimeta yo Hand in Hand / 決めたよHand in Hand
    227, // 181, AZALEA - Metamorphism / メタモルフィズム
    236, // 182, Guilty Kiss - New Romantic Sailors
    108, // 183, µ's - Arashi no Naka no Koi dakara / 嵐のなかの恋だから
    136, // 184, Aqours - Pops heart de Odorun damon! / Pops heartで踊るんだもん！
    243, // 185, Sakurauchi Riko - Love Spiral Tower
    70, // 186, µ's - Dancing stars on me!
    104, // 187, µ's - Future style
    344, // 188, Zhong Lanzhu - Queendom
    312, // 189, Asaka Karin - VIVID WORLD
    255, // 190, Kunikida Hanamaru - Oyasuminasan! / おやすみなさん！
    188, // 191, Aqours - Namida ga Yuki ni Naru Mae ni / 涙が雪になる前に
    390, // 192, Hazuki Ren - Binetsu no Waltz / 微熱のワルツ
    172, // 193, Aqours - Jump up HIGH!!
    405, // 194, QU4RTZ - ENJOY IT!
    3, // 195, µ's - baby maybe Koi no Button / baby maybe 恋のボタン
    422, // 196, Liella! - Star Sengen
    29, // 197, Ayase Eli - Arifureta Kanashimi no Hate / ありふれた悲しみの果て
    33, // 198, µ's - Listen to my heart!!
    252, // 199, Tsushima Yoshiko - in this unstable world
    338, // 200, Tennoji Rina - Tsunagaru Connect / ツナガルコネクト
    136, // 201, Aqours - Pops heart de Odorun damon! / Pops heartで踊るんだもん！
    27, // 202, Nishikino Maki - Daring!
    207, // 203, Saint Snow - CRASH MIND
    429, // 204, Liella! - Yuragu wa
    328, // 205, Yuki Setsuna - Yada! / ヤダ！
    396, // 206, Shibuya Kanon - Aozora o Matteru / 青空を待ってる
    440, // 207, R3BIRTH - Bubble Over! / バブルオーバー！
    82, // 208, Printemps - Eien Friends / 永遠フレンズ
    400, // 209, Watanabe You - Paradise Chime
    36 // 210, µ's - Bokura wa Ima no Naka de / 僕らは今のなかで
];