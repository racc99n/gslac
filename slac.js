(function () {
  const ROOT = document.querySelector(".gsr");
  const SPEED = +ROOT.getAttribute("data-speed") || 100;
  const OFFSET = +ROOT.getAttribute("data-offset") || 100;
  ROOT.style.setProperty("--edge-offset", OFFSET + "px");

  // ===============================
  // 🔧 CONFIG
  // ===============================
  const LOGIN_URL = "https://grand899.tips/login";
  const API_BASE = "https://grand899.tips/login";
  const VENDOR = "PGS";
  const TYPE = "slot";
  const SESSION_KEYS = ["sess", "session_id"];
  const IMAGE_PLACEHOLDER = "https://via.placeholder.com/180x120?text=No+Image";
  const IMAGE_BASE =
    "https://assets.g2gbet.co/gm-logo/img/sportsbook/game/PGS/L/";
  const BATCH_SIZE = 10;
  const BATCH_INTERVAL =
    Math.max(
      1,
      +ROOT.getAttribute("data-batch-interval") ||
        +ROOT.getAttribute("data-speed") ||
        SPEED
    ) * 1000;

  // ===============================
  // 🎮 รายชื่อเกม + ID + CODE
  // (เพิ่มหรือแก้ได้ตามจริง)
  // =============================
  // ===============================
  const games = [
    {
      id: "60531c5534d88c344ce9acbd",
      code: "87",
      title: "Treasures of Aztec",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Treasures%20of%20Aztec_1702651933.webp",
    },
    {
      id: "60531c5534d88c344ce9aca9",
      code: "65",
      title: "Mahjong Ways",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Mahjong%20Ways_1702651252.webp",
    },
    {
      id: "60531c5534d88c344ce9acb2",
      code: "74",
      title: "Mahjong Ways 2",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Mahjong%20Ways%202_1702651260.webp",
    },
    {
      id: "67c5840d093187a6134d8f12",
      code: "1799745",
      title: "Mr. Treasure's Fortune",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Mr.%20Treasure%E2%80%99s%20Fortune_1741244621.webp",
    },
    {
      id: "67b57da7519f51d363533d4b",
      code: "1850016",
      title: "Incan Wonders",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Incan%20Wonders_1740385189.jpg",
    },
    {
      id: "677ba84fdca2412e4bb395f0",
      code: "1879752",
      title: "Fortune Snake",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Fortune%20Snake_1736420371.webp",
    },
    {
      id: "675fc7690c5f520026bf7617",
      code: "1702123",
      title: "Geisha's Revenge",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Geisha%27s%20Revenge_1734337168.webp",
    },
    {
      id: "67444abe01e1b48421257cd3",
      code: "1666445",
      title: "Chocolate Deluxe",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Chocolate%20Deluxe_1732705543.webp",
    },
    {
      id: "6729dc10e48acdc3767dbcbd",
      code: "1786529",
      title: "Rio Fantasia",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Rio%20Fantasia_1730798868.webp",
    },
    {
      id: "671636a04f60dc5ea4d88144",
      code: "1755623",
      title: "Museum Mystery",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Museum%20Mystery_1729514506.webp",
    },
    {
      id: "66faa5bbb9410ad3acc1cb74",
      code: "1815268",
      title: "Oishi Delights",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Oishi%20Delights_1728032208.webp",
    },
    {
      id: "66e9480d11711a7813b76f70",
      code: "1727711",
      title: "Three Crazy Piggies",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Three%20Crazy%20Piggies_1726669980.webp",
    },
    {
      id: "66c31a41c0e45bdc2c487abb",
      code: "1747549",
      title: "Wings of Iguazu",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Wings%20of%20Iguazu_1724657922.webp",
    },
    {
      id: "66b0bd9269917b030d307754",
      code: "1760238",
      title: "Yakuza Honor",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Yakuza%20Honor_1724316401.webp",
    },
    {
      id: "6697b178dbf56c32f9bba3bd",
      code: "1648578",
      title: "Shark Bounty",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Shark%20Bounty_1724316372.webp",
    },
    {
      id: "6683b510e4f57cf3ca5587df",
      code: "1778752",
      title: "Futebol Fever",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Futebol%20Fever_1724316334.webp",
    },
    {
      id: "6662eb520f574f61a12088d2",
      code: "1635221",
      title: "Zombie Outbreak",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Zombie%20Outbreak_1724314955.webp",
    },
    {
      id: "6654862f0f574f61a120875d",
      code: "1623475",
      title: "Anubis Wrath",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Anubis%20Wrath_1716881055.webp",
    },
    {
      id: "663a061680881500eb5d45e2",
      code: "1717688",
      title: "Mystic Potion",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Mystic%20Potion_1724316243.webp",
    },
    {
      id: "66150caa11b82fa493bd2bd0",
      code: "1492288",
      title: "Pinata Wins",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Pinata%20Wins_1724316205.webp",
    },
    {
      id: "660a7ca011b82fa493bd29e0",
      code: "1508783",
      title: "Wild Ape #3258",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Wild%20Ape%20%233258_1724315869.webp",
    },
    {
      id: "65e591a6a8d4f9e78a2359cb",
      code: "1671262",
      title: "Gemstones Gold",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Gemstones%20Gold_1709544215.webp",
    },
    {
      id: "65a4dc05ce8220fa9ea9cbad",
      code: "1451122",
      title: "Dragon Hatch 2",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Dragon%20Hatch%202_1727794891.webp",
    },
    {
      id: "60531c5534d88c344ce9acc4",
      code: "89",
      title: "Lucky Neko",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Lucky%20Neko_1702651224.webp",
    },
    {
      id: "609e78ea4a67b994b50d2a66",
      code: "104",
      title: "Wild Bandito",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Wild%20Bandito_1702651545.webp",
    },
    {
      id: "61af2980e5d289e90f512720",
      code: "106",
      title: "Ways of the Qilin",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Ways%20of%20the%20Qilin_1702651533.webp",
    },
    {
      id: "657c6c5edc072093049ee230",
      code: "1655268",
      title: "Tsar Treasures",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Tsar%20Treasures_1702653861.webp",
    },
    {
      id: "65780764d5d85b2a27578ce8",
      code: "1580541",
      title: "Mafia Mayhem",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Mafia%20Mayhem_1702653832.webp",
    },
    {
      id: "651a86bcd9d5c7a2c1190b78",
      code: "1529867",
      title: "Ninja Raccoon Frenzy",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Ninja%20Raccoon%20Frenzy_1702651330.webp",
    },
    {
      id: "650ee22baf17ad9d265fc7e2",
      code: "1572362",
      title: "Gladiator's Glory",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Gladiator%27s%20Glory_1702649928.webp",
    },
    {
      id: "64ee44fdc1e1e7de0d997015",
      code: "1594259",
      title: "Safari Wilds",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Safari%20Wilds_1702649950.webp",
    },
    {
      id: "64d38696ce633aea332d4b4e",
      code: "1473388",
      title: "Cruise Royale",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Cruise%20Royale_1702649966.webp",
    },
    {
      id: "64ad591bdf561b7a323e96fa",
      code: "1397455",
      title: "Fruity Candy",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Fruity%20Candy_1702650995.webp",
    },
    {
      id: "648aa1f17b820f8f1e7995d3",
      code: "1601012",
      title: "Lucky Clover Lady",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Lucky%20Clover%20Lady_1702650001.webp",
    },
    {
      id: "646c6f827cd3acce7c334bb4",
      code: "1513328",
      title: "Super Golf Drive",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Super%20Golf%20Drive_1702650015.webp",
    },
    {
      id: "6449fd9cdc4b313d6a4b968f",
      code: "1432733",
      title: "Mystical Spirits",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Mystical%20Spirits_1702651322.webp",
    },
    {
      id: "63bfd5c622b9e6f28b091ce1",
      code: "1543462",
      title: "Fortune Rabbit",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Fortune%20Rabbit_1702650982.webp",
    },
    {
      id: "6303327eebafc4fa8272f137",
      code: "135",
      title: "Wild Bounty Showdown",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Wild%20Bounty%20Showdown_1702651563.webp",
    },
    {
      id: "641059fc299d6ec2bbd28c09",
      code: "1418544",
      title: "Bakery Bonanza",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Bakery%20Bonanza_1702650054.webp",
    },
    {
      id: "60531c5534d88c344ce9acc9",
      code: "98",
      title: "Fortune Ox",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Fortune%20Ox_1702650976.webp",
    },
    {
      id: "60531c5534d88c344ce9acaf",
      code: "71",
      title: "Caishen Wins",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Caishen%20Wins_1702650093.webp",
    },
    {
      id: "60531c5534d88c344ce9acb4",
      code: "75",
      title: "Ganesha Fortune",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Ganesha%20Fortune_1702651007.webp",
    },
    {
      id: "6433b5d52c6902344243cc6f",
      code: "1448762",
      title: "Songkran Splash",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Songkran%20Splash_1702651441.webp",
    },
    {
      id: "6395de70f7320aee2573ae32",
      code: "1340277",
      title: "Asgardian Rising",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Asgardian%20Rising_1724314753.webp",
    },
    {
      id: "641059cc299d6ec2bbd28c08",
      code: "1381200",
      title: "Hawaiian Tiki",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Hawaiian%20Tiki_1702651084.webp",
    },
    {
      id: "63f3085fa338520cea6e1913",
      code: "1420892",
      title: "Rave Party Fever",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Rave%20Party%20Fever_1702651395.webp",
    },
    {
      id: "63b114809de1192ec5790dcc",
      code: "1402846",
      title: "Midas Fortune",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Midas%20Fortune_1702651300.webp",
    },
    {
      id: "6370d0b3d3f541a01484de4b",
      code: "1372643",
      title: "Diner Delights",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Diner%20Delights_1702650944.webp",
    },
    {
      id: "6343f98165580ff060a42707",
      code: "1368367",
      title: "Alchemy Gold",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Alchemy%20Gold_1724314701.webp",
    },
    {
      id: "631728cd3ddeac8867580258",
      code: "1338274",
      title: "Totem Wonders",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Totem%20Wonders_1702651508.webp",
    },
    {
      id: "630c6b3e35a342efac0ec906",
      code: "1312883",
      title: "Prosperity Fortune Tree",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Prosperity%20Fortune%20Tree_1702651369.webp",
    },
    {
      id: "62d6747a419ec630e268816b",
      code: "132",
      title: "Wild Coaster",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Wild%20Coaster_1702651674.webp",
    },
    {
      id: "62cd2a6c5476ba8e1061c0a0",
      code: "128",
      title: "Legend of Perseus",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Legend%20of%20Perseus_1702651200.webp",
    },
    {
      id: "62b2c2d0f5f48ee7f4b25f2a",
      code: "127",
      title: "Speed Winner",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Speed%20Winner_1702651988.webp",
    },
    {
      id: "62a6f343ce8a365c3b00be62",
      code: "130",
      title: "Lucky Piggy",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Lucky%20Piggy_1702651238.webp",
    },
    {
      id: "628c6bb3b785c10a9714f687",
      code: "129",
      title: "Win Win Fish Prawn Crab",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Win%20Win%20Fish%20Prawn%20Crab_1702652011.webp",
    },
    {
      id: "60531c5534d88c344ce9acb1",
      code: "69",
      title: "Bikini Paradise",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Bikini%20Paradise_1702650074.webp",
    },
    {
      id: "60531c5534d88c344ce9acb0",
      code: "70",
      title: "Candy Burst",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Candy%20Burst_1702650107.webp",
    },
    {
      id: "60531c5534d88c344ce9aca3",
      code: "54",
      title: "Captain's Bounty",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Captain%27s%20Bounty_1702650113.webp",
    },
    {
      id: "60531c5534d88c344ce9acbe",
      code: "80",
      title: "Circus Delight",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Circus%20Delight_1702650119.webp",
    },
    {
      id: "60531c5534d88c344ce9ac83",
      code: "1",
      title: "Honey Trap of Diao Chan",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Honey%20Trap%20of%20Diao%20Chan_1702651102.webp",
    },
    {
      id: "60531c5534d88c344ce9aca0",
      code: "48",
      title: "Double Fortune",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Double%20Fortune_1702650161.webp",
    },
    {
      id: "60531c5534d88c344ce9acaa",
      code: "57",
      title: "Dragon Hatch",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Dragon%20Hatch_1724315453.webp",
    },
    {
      id: "60531c5534d88c344ce9ac92",
      code: "29",
      title: "Dragon Legend",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Dragon%20Legend_1702650179.webp",
    },
    {
      id: "60531c5534d88c344ce9aca8",
      code: "63",
      title: "Dragon Tiger Luck",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Dragon%20Tiger%20Luck_1702650190.webp",
    },
    {
      id: "60531c5534d88c344ce9acb7",
      code: "79",
      title: "Dreams of Macau",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Dreams%20of%20Macau_1702650198.webp",
    },
    {
      id: "60531c5534d88c344ce9acb3",
      code: "73",
      title: "Egypt's Book of Mystery",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Egypt%27s%20Book%20of%20Mystery_1702650207.webp",
    },
    {
      id: "60531c5534d88c344ce9ac9c",
      code: "44",
      title: "Emperor's Favour",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Emperor%27s%20Favour_1702650223.webp",
    },
    {
      id: "60531c5534d88c344ce9aca5",
      code: "61",
      title: "Flirting Scholar",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Flirting%20Scholar_1702650236.webp",
    },
    {
      id: "60531c5534d88c344ce9ac84",
      code: "3",
      title: "Fortune Gods",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Fortune%20Gods_1702650256.webp",
    },
    {
      id: "60531c5534d88c344ce9acab",
      code: "68",
      title: "Fortune Mouse",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Fortune%20Mouse_1702650970.webp",
    },
    {
      id: "60531c5534d88c344ce9ac87",
      code: "26",
      title: "Tree of Fortune",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Tree%20of%20Fortune_1702652037.webp",
    },
    {
      id: "60531c5534d88c344ce9acc6",
      code: "86",
      title: "Galactic Gems",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Galactic%20Gems_1702651000.webp",
    },
    {
      id: "60531c5534d88c344ce9ac9d",
      code: "42",
      title: "Ganesha Gold",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Ganesha%20Gold_1702651014.webp",
    },
    {
      id: "60531c5534d88c344ce9acc7",
      code: "91",
      title: "Guardians of Ice and Fire",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Guardians%20of%20Ice%20and%20Fire_1702651079.webp",
    },
    {
      id: "60531c5534d88c344ce9ac8d",
      code: "2",
      title: "Gem Saviour",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Gem%20Saviour_1702651033.webp",
    },
    {
      id: "60531c5534d88c344ce9acad",
      code: "62",
      title: "Gem Saviour Conquest",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Gem%20Saviour%20Conquest_1702651039.webp",
    },
    {
      id: "60531c5534d88c344ce9ac99",
      code: "38",
      title: "Gem Saviour Sword",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Gem%20Saviour%20Sword_1702651048.webp",
    },
    {
      id: "60531c5534d88c344ce9acbc",
      code: "85",
      title: "Genie's 3 Wishes",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Genie%27s%203%20Wishes_1702651065.webp",
    },
    {
      id: "60531c5534d88c344ce9ac96",
      code: "33",
      title: "Hip Hop Panda",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Hip%20Hop%20Panda_1702651096.webp",
    },
    {
      id: "60531c5534d88c344ce9ac90",
      code: "18",
      title: "Hood vs Wolf",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Hood%20vs%20Wolf_1702651108.webp",
    },
    {
      id: "60531c5534d88c344ce9ac91",
      code: "28",
      title: "Hot Pot",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Hotpot_1702651122.webp",
    },
    {
      id: "60531c5534d88c344ce9acc5",
      code: "97",
      title: "Jack Frost's Winter",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Jack%20Frost%27s%20Winter_1702651143.webp",
    },
    {
      id: "60531c5534d88c344ce9acc3",
      code: "88",
      title: "Jewels of Prosperity",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Jewels%20of%20Prosperity_1702651152.webp",
    },
    {
      id: "60531c5534d88c344ce9aca2",
      code: "50",
      title: "Journey to the Wealth",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Journey%20to%20the%20Wealth_1702651161.webp",
    },
    {
      id: "60531c5534d88c344ce9ac9f",
      code: "40",
      title: "Jungle Delight",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Jungle%20Delight_1702651169.webp",
    },
    {
      id: "60531c5534d88c344ce9ac94",
      code: "34",
      title: "Legend of Hou Yi",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Legend%20of%20Hou%20Yi_1702651186.webp",
    },
    {
      id: "60531c5534d88c344ce9aca4",
      code: "60",
      title: "Leprechaun Riches",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Leprechaun%20Riches_1702651214.webp",
    },
    {
      id: "60531c5534d88c344ce9ac88",
      code: "7",
      title: "Medusa",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Medusa_1702651282.webp",
    },
    {
      id: "60531c5534d88c344ce9ac86",
      code: "6",
      title: "Medusa II",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Medusa%20II_1702651288.webp",
    },
    {
      id: "60531c5534d88c344ce9ac93",
      code: "35",
      title: "Mr. Hallow-Win",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Mr.%20Hallow-Win_1702651312.webp",
    },
    {
      id: "60531c5534d88c344ce9aca7",
      code: "64",
      title: "Muay Thai Champion",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Muay%20Thai%20Champion_1702651317.webp",
    },
    {
      id: "60531c5534d88c344ce9aca6",
      code: "59",
      title: "Ninja vs Samurai",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Ninja%20vs%20Samurai_1702651336.webp",
    },
    {
      id: "60531c5534d88c344ce9acc8",
      code: "93",
      title: "Opera Dynasty",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Opera%20Dynasty_1702651341.webp",
    },
    {
      id: "60531c5534d88c344ce9acb6",
      code: "82",
      title: "Phoenix Rises",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Phoenix%20Rises_1702652085.webp",
    },
    {
      id: "60531c5534d88c344ce9ac9a",
      code: "39",
      title: "Piggy Gold",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Piggy%20Gold_1702651357.webp",
    },
    {
      id: "60531c5534d88c344ce9ac8b",
      code: "25",
      title: "Plushie Frenzy",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Plushie%20Frenzy_1702652091.webp",
    },
    {
      id: "60531c5534d88c344ce9ac95",
      code: "36",
      title: "Prosperity Lion",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Prosperity%20Lion_1702651375.webp",
    },
    {
      id: "60531c5534d88c344ce9acc2",
      code: "84",
      title: "Queen of Bounty",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Queen%20of%20Bounty_1702651379.webp",
    },
    {
      id: "60531c5534d88c344ce9acac",
      code: "20",
      title: "Reel Love",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Reel%20Love_1702651400.webp",
    },
    {
      id: "60531c5534d88c344ce9ac97",
      code: "37",
      title: "Santa's Gift Rush",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Santa%27s%20Gift%20Rush_1702651424.webp",
    },
    {
      id: "60531c5534d88c344ce9acc0",
      code: "90",
      title: "Secret of Cleopatra",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Secret%20of%20Cleopatra_1702652136.webp",
    },
    {
      id: "60531c5534d88c344ce9acae",
      code: "67",
      title: "Shaolin Soccer",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Shaolin%20Soccer_1702652145.webp",
    },
    {
      id: "60531c5534d88c344ce9acbf",
      code: "92",
      title: "Thai River Wonders",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Thai%20River%20Wonders_1702651480.webp",
    },
    {
      id: "60531c5534d88c344ce9aca1",
      code: "53",
      title: "The Great Icescape",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_The%20Great%20Icescape_1702651497.webp",
    },
    {
      id: "60531c5534d88c344ce9acc1",
      code: "58",
      title: "Vampire's Charm",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Vampire%27s%20Charm_1702651526.webp",
    },
    {
      id: "60531c5534d88c344ce9acba",
      code: "83",
      title: "Wild Fireworks",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Wild%20Fireworks_1702652176.webp",
    },
    {
      id: "60531c5534d88c344ce9ac85",
      code: "24",
      title: "Win Win Won",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Win%20Win%20Won_1702652168.webp",
    },
    {
      id: "61af2980e5d289e90f512721",
      code: "105",
      title: "Heist Stakes",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Heist%20Stakes_1702651090.webp",
    },
    {
      id: "61af2980e5d289e90f512722",
      code: "101",
      title: "Rise of Apollo",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Rise%20of%20Apollo_1702651404.webp",
    },
    {
      id: "61af2980e5d289e90f512724",
      code: "110",
      title: "Jurassic Kingdom",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Jurassic%20Kingdom_1702651175.webp",
    },
    {
      id: "61af2980e5d289e90f512725",
      code: "102",
      title: "Mermaid Riches",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Mermaid%20Riches_1702651294.webp",
    },
    {
      id: "61af2980e5d289e90f512727",
      code: "113",
      title: "Raider Jane's Crypt of Fortune",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Raider%20Jane%27s%20Crypt%20of%20Fortune_1702651390.webp",
    },
    {
      id: "61af2980e5d289e90f512728",
      code: "115",
      title: "Supermarket Spree",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Supermarket%20Spree_1702650023.webp",
    },
    {
      id: "61af2980e5d289e90f512729",
      code: "108",
      title: "Buffalo Win",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Buffalo%20Win_1702650079.webp",
    },
    {
      id: "61af2980e5d289e90f51272a",
      code: "107",
      title: "Legendary Monkey King",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Legendary%20Monkey%20King_1702651208.webp",
    },
    {
      id: "61af2980e5d289e90f51272b",
      code: "119",
      title: "Spirited Wonders",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Spirited%20Wonders_1702652202.webp",
    },
    {
      id: "61af2980e5d289e90f51272d",
      code: "114",
      title: "Emoji Riches",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Emoji%20Riches_1702650215.webp",
    },
    {
      id: "60531c5534d88c344ce9ac9b",
      code: "41",
      title: "Symbols of Egypt",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Symbols%20of%20Egypt_1702651474.webp",
    },
    {
      id: "609e78ea4a67b994b50d2a62",
      code: "94",
      title: "Bali Vacation",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Bali%20Vacation_1702650060.webp",
    },
    {
      id: "609e78ea4a67b994b50d2a65",
      code: "100",
      title: "Candy Bonanza",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Candy%20Bonanza_1702650100.webp",
    },
    {
      id: "609e78ea4a67b994b50d2a63",
      code: "103",
      title: "Crypto Gold",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Crypto%20Gold_1702650145.webp",
    },
    {
      id: "609e78ea4a67b994b50d2a64",
      code: "95",
      title: "Majestic Treasures",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Majestic%20Treasures_1702651266.webp",
    },
    {
      id: "6218ca10cc0fd496ed8ae93f",
      code: "126",
      title: "Fortune Tiger",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Fortune%20Tiger_1702650988.webp",
    },
    {
      id: "6218ca73cc0fd496ed8ae943",
      code: "121",
      title: "Destiny of Sun & Moon",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Destiny%20of%20Sun%20&%20Moon_1702650151.webp",
    },
    {
      id: "6218ca2dcc0fd496ed8ae940",
      code: "118",
      title: "Mask Carnival",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Mask%20Carnival_1702651277.webp",
    },
    {
      id: "6218ca5fcc0fd496ed8ae942",
      code: "122",
      title: "Garuda Gems",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Garuda%20Gems_1702651026.webp",
    },
    {
      id: "6218ca4ccc0fd496ed8ae941",
      code: "112",
      title: "Oriental Prosperity",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Oriental%20Prosperity_1702651347.webp",
    },
    {
      id: "6218c884cc0fd496ed8ae93e",
      code: "117",
      title: "Cocktail Nights",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Cocktail%20Nights_1702650133.webp",
    },
    {
      id: "624ebf1d711ab46abc53530a",
      code: "125",
      title: "Butterfly Blossom",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Butterfly%20Blossom_1702650087.webp",
    },
    {
      id: "624ebfccac4e82ccdb2dd3c0",
      code: "123",
      title: "Rooster Rumble",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Rooster%20Rumble_1702651410.webp",
    },
    {
      id: "625d462e711ab46abc535314",
      code: "120",
      title: "The Queen's Banquet",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_The%20Queen%E2%80%99s%20Banquet_1702652223.webp",
    },
    {
      id: "62791f90e9ccc220061c4ad0",
      code: "124",
      title: "Battleground Royale",
      image:
        "https://cdn.sasasa.click/img/sportsbook/game/PGS/L/PGS_Battleground%20Royale_1702650066.webp",
    },
  ];

  const A = document.getElementById("gsrA"),
    B = document.getElementById("gsrB"),
    MARQUEE = document.querySelector(".gsr-marquee");

  // generate random payload according to constraints
  function generatePayload() {
    // username format: AADEx####x (random 4 digits)
    const digits = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
    const username = `AADX${digits}x`;

    // bonusTimes: biased sampling (300-1000 most likely, 1001-10000 very unlikely)
    const bonusTimes = sampleBonusTimes();

    // bet: biased sampling (1-100 most likely, 101-2000 unlikely)
    const bet = sampleBet();

    // Compute base amount: bet * bonusTimes
    const base = bet * bonusTimes;

    // add randomized extras to integer and fractional parts as requested
    // Add random integer offset up to 999 to base to vary higher digits
    const intOffset = Math.floor(Math.random() * 1000); // 0..999
    // fractional cents random between 0.01 and 0.99
    const frac = (Math.floor(Math.random() * 99) + 1) / 100;

    const amount = base + intOffset + frac;

    return {
      username,
      bonusTimes,
      bet,
      amount,
    };
  }

  function makePopup(card) {
    const gameTitle = card.querySelector(".gsr-title")?.textContent || "เกม";
    const imgSrc = card.querySelector("img")?.src || IMAGE_PLACEHOLDER;
    const payload = generatePayload();

    // formatted strings
    const username = payload.username;
    const bonusTimes = payload.bonusTimes;
    const bet = payload.bet;
    const amountFormatted = payload.amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const overlay = document.createElement("div");
    overlay.className = "gsr-popup-overlay";

    const p = document.createElement("div");
    p.className = "gsr-popup";

    // header centered on top
    const header = document.createElement("div");
    header.className = "gsr-popup-header";
    header.innerHTML = `<h3>GRAND899 ยินดีกับยูสเซอร์</h3>`;

    const content = document.createElement("div");
    content.className = "gsr-popup-content";
    // left image
    const left = document.createElement("div");
    left.className = "left";
    const thumb = document.createElement("img");
    thumb.src = imgSrc;
    thumb.alt = gameTitle;
    thumb.onerror = function () {
      this.src = IMAGE_PLACEHOLDER;
    };
    left.appendChild(thumb);

    // right body
    const body = document.createElement("div");
    body.className = "body";
    body.innerHTML = `
      <p><strong>${username}</strong></p>
      <p>ได้ Bonus x ${bonusTimes} เท่า</p>
      <p style="font-size:18px;font-weight:900">${amountFormatted} ฿</p>
      <p>Bet : ${bet} ฿</p>
      <p>จากเกม <span class="game">${gameTitle}</span></p>
    `;

    content.appendChild(left);
    content.appendChild(body);

    p.appendChild(header);
    p.appendChild(content);
    overlay.appendChild(p);

    // attach payload JSON on overlay element (for debugging/demo)
    overlay.dataset.payload = JSON.stringify(payload);

    // allow clicking outside the popup to close immediately
    overlay.addEventListener("click", (ev) => {
      if (ev.target === overlay) {
        if (overlay && overlay.parentNode)
          overlay.parentNode.removeChild(overlay);
      }
    });

    return { overlay, popup: p, payload };
  }

  function makeCard(g) {
    // 🔹 สร้าง element การ์ด
    const wrapper = document.createElement("a");
    wrapper.className = "gsr-link";
    wrapper.href = "#";
    wrapper.target = "_blank";

    // Determine win-rate percentage: prefer provided g.winrate, else biased sample
    let p = 0;
    if (typeof g.winrate === "number" && !isNaN(g.winrate)) {
      p = Math.max(0, Math.min(100, Math.round(g.winrate)));
    } else {
      p = sampleWinrate();
    }

    const el = document.createElement("div");
    el.className = "gsr-card" + (p >= 90 ? " hot" : "");
    const imgSrc = resolveImage(g.image);
    el.innerHTML = `
      <div class="gsr-body">
        <div class="gsr-thumb">
          <img src="${imgSrc}"
               alt="${g.title}" 
               onerror="this.src='${IMAGE_PLACEHOLDER}'">
        </div>
        <div class="gsr-title">${g.title}</div>
        <div class="gsr-pct">${p}%</div>
        <div class="gsr-bar"><div class="gsr-fill" style="width:${p}%"></div></div>
      </div>`;

    wrapper.appendChild(el);

    // 🔥 เมื่อคลิกการ์ด
    wrapper.addEventListener("click", (e) => {
      e.preventDefault(); // ป้องกันลิงก์เดิม
      const sess = getSession();

      if (!sess) {
        // ❌ ยังไม่ได้ล็อกอิน → ไปหน้า Login
        window.location.href = LOGIN_URL;
      } else {
        // ✅ สร้างลิงก์เข้าเกมจริง
        const params = new URLSearchParams({
          s: sess,
          vendor: VENDOR,
          game_id: g.id,
          type: TYPE,
        });
        if (g.code) {
          params.append("game_code", g.code);
        }
        const url = `${API_BASE}?${params.toString()}`;
        window.open(url, "_blank");
      }
    });

    return wrapper;
  }

  // ===============================
  // 🎯 Watcher: detect centered .hot card
  // ===============================
  let lastHotId = null;
  function checkForCenteredHot() {
    const hotCards = MARQUEE.querySelectorAll(".gsr-card.hot");
    if (!hotCards || hotCards.length === 0) return;

    const containerRect = ROOT.getBoundingClientRect();
    const containerCenterX = containerRect.left + containerRect.width / 2;

    for (const card of hotCards) {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const delta = Math.abs(cardCenterX - containerCenterX);
      // consider it centered when within 20px
      if (delta <= 20) {
        // avoid retriggering on same element
        if (lastHotId === card) continue;
        lastHotId = card;
        triggerBigWin(card);
        return;
      }
    }
  }

  function triggerBigWin(card) {
    // pause marquee via adding class on root
    ROOT.classList.add("gsr-paused");

    // enlarge card
    card.classList.add("bigwin");

    // show popup
    const popup = makePopup(card);
    document.body.appendChild(popup.overlay);

    // resume after ~2s
    setTimeout(() => {
      card.classList.remove("bigwin");
      ROOT.classList.remove("gsr-paused");
      if (popup && popup.overlay && popup.overlay.parentNode) {
        popup.overlay.parentNode.removeChild(popup.overlay);
      }
      // allow retrigger later
      lastHotId = null;
    }, 2000);
  }

  // observe scroll / animation frame to check centered hot periodically
  let checkInterval = null;
  function startHotWatcher() {
    if (checkInterval) return;
    checkInterval = setInterval(checkForCenteredHot, 400);
  }

  function stopHotWatcher() {
    if (!checkInterval) return;
    clearInterval(checkInterval);
    checkInterval = null;
  }

  // start after DOM ready and after initial rendering of marquees
  window.addEventListener("load", () => startHotWatcher());

  if (!A || !B) {
    return;
  }

  function applyMarqueeAnimation() {
    if (!MARQUEE) {
      return;
    }
    MARQUEE.style.animation = "none";
    void MARQUEE.offsetWidth; // force reflow so animation restarts
    MARQUEE.style.animation = `gsr-scroll ${SPEED}s linear infinite`;
  }

  // Helper: pick N random games (distinct)
  function pickRandomGames(n) {
    if (!Array.isArray(games) || games.length === 0) return [];
    const copy = games.slice();
    // Fisher-Yates shuffle
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy.slice(0, Math.min(n, copy.length));
  }

  // Helper: render a batch of game cards into a container
  function renderBatch(container, batch) {
    if (!container) return;
    // Clear previous
    container.innerHTML = "";

    const frag = document.createDocumentFragment();
    // Append cards; duplicate once to help continuous marquee length
    for (let repeat = 0; repeat < 2; repeat++) {
      for (const g of batch) {
        try {
          const card = makeCard(g);
          frag.appendChild(card);
        } catch (e) {
          // defensive: skip broken item
          console.error("Failed to render card", g, e);
        }
      }
    }
    container.appendChild(frag);
  }

  // Helper: normalize/resolve image urls with fallback
  function resolveImage(img) {
    if (!img) return IMAGE_PLACEHOLDER;
    try {
      // force https when possible
      if (typeof img === "string") {
        return img.replace(/^http:\/\//i, "https://");
      }
    } catch (e) {
      // noop
    }
    return IMAGE_PLACEHOLDER;
  }

  // Helper: obtain session value from cookies or localStorage
  function getSession() {
    // Check cookies
    if (typeof document !== "undefined" && document.cookie) {
      const parts = document.cookie.split(";").map((s) => s.trim());
      for (const p of parts) {
        const idx = p.indexOf("=");
        if (idx === -1) continue;
        const key = p.slice(0, idx).trim();
        const value = p.slice(idx + 1).trim();
        if (SESSION_KEYS.includes(key)) return decodeURIComponent(value);
      }
    }
    // Check localStorage
    try {
      for (const k of SESSION_KEYS) {
        const v = localStorage.getItem(k);
        if (v) return v;
      }
    } catch (e) {
      // localStorage might be unavailable in some contexts
    }
    return null;
  }

  // ----- Biased samplers requested by user -----
  // winrate: 1-60% least likely, 61-89% most likely, 90-100% medium
  function sampleWinrate() {
    // We'll use weighted buckets: low(1-60) weight 1, mid(61-89) weight 5, high(90-100) weight 3
    const buckets = [
      { min: 1, max: 60, weight: 1 },
      { min: 61, max: 89, weight: 5 },
      { min: 90, max: 100, weight: 3 },
    ];
    const total = buckets.reduce((s, b) => s + b.weight, 0);
    let r = Math.random() * total;
    for (const b of buckets) {
      if (r < b.weight) {
        return Math.floor(Math.random() * (b.max - b.min + 1)) + b.min;
      }
      r -= b.weight;
    }
    // fallback
    return Math.floor(Math.random() * 100) + 1;
  }

  // bonusTimes: 300-1000 most likely, 1001-10000 very unlikely
  function sampleBonusTimes() {
    // We'll use two ranges: common 300-1000 (weight 9), rare 1001-10000 (weight 1)
    const commonWeight = 9;
    const rareWeight = 1;
    if (Math.random() * (commonWeight + rareWeight) < commonWeight) {
      return Math.floor(Math.random() * (1000 - 300 + 1)) + 300;
    }
    return Math.floor(Math.random() * (10000 - 1001 + 1)) + 1001;
  }

  // bet: 1-100 most likely, 101-2000 unlikely
  function sampleBet() {
    const commonWeight = 8;
    const rareWeight = 1;
    if (Math.random() * (commonWeight + rareWeight) < commonWeight) {
      return Math.floor(Math.random() * 100) + 1; // 1..100
    }
    return Math.floor(Math.random() * (2000 - 101 + 1)) + 101; // 101..2000
  }

  function updateBatch() {
    const batch = pickRandomGames(BATCH_SIZE);
    renderBatch(A, batch);
    renderBatch(B, batch);
    applyMarqueeAnimation();
  }

  // แสดงทีละ 10 เกมและสุ่มชุดใหม่เป็นช่วงๆ
  updateBatch();

  if (BATCH_INTERVAL > 0 && games.length > 0) {
    setInterval(updateBatch, BATCH_INTERVAL);
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  let onlineNumberContainer = document.getElementById("onlineNumber");
  let previousNumberString = "";

  // Widget initializer (scoped). We define behaviour but only start it
  // once `onlineNumberContainer` is available.
  function initOnlineNumberWidget() {
    // Function to create the initial number display
    function createNumberDisplay(numberStr) {
      // Guard: make sure container still exists
      if (!onlineNumberContainer) return;

      try {
        onlineNumberContainer.innerHTML = ""; // Clear previous content
      } catch (e) {
        // If DOM suddenly unavailable, bail out safely
        return;
      }

      for (const char of numberStr) {
        const charContainer = document.createElement("div");
        charContainer.className =
          "char-container" + (char === "," ? " comma" : "");

        const charSpan = document.createElement("span");
        charSpan.className = "char";
        charSpan.textContent = char;

        charContainer.appendChild(charSpan);
        onlineNumberContainer.appendChild(charContainer);
      }
      previousNumberString = numberStr;
    }

    // Function to update the number with animations
    function updateNumberDisplay(newNumberStr) {
      if (newNumberStr.length !== previousNumberString.length) {
        createNumberDisplay(newNumberStr);
        return;
      }

      for (let i = 0; i < newNumberStr.length; i++) {
        const oldChar = previousNumberString[i];
        const newChar = newNumberStr[i];

        if (oldChar === newChar) {
          continue;
        }

        const charContainer = onlineNumberContainer.children[i];
        // Defensive: if for any reason the child is missing, rebuild the display
        if (!charContainer) {
          createNumberDisplay(newNumberStr);
          return;
        }
        const oldCharSpan = charContainer.querySelector(
          '.char:not([class*="leave-"])'
        );
        const isOldDigit = !isNaN(parseInt(oldChar));
        const isNewDigit = !isNaN(parseInt(newChar));
        const direction =
          isOldDigit && isNewDigit && parseInt(newChar) > parseInt(oldChar)
            ? "up"
            : "down";

        if (oldCharSpan) {
          oldCharSpan.classList.add(`leave-${direction}`);
          setTimeout(() => oldCharSpan.remove(), 500);
        }

        const newCharSpan = document.createElement("span");
        newCharSpan.className = "char";
        newCharSpan.textContent = newChar;
        newCharSpan.classList.add(`enter-${direction}`);

        charContainer.appendChild(newCharSpan);

        requestAnimationFrame(() => {
          newCharSpan.classList.remove(`enter-${direction}`);
        });
      }
      previousNumberString = newNumberStr;
    }

    function runUpdateCycle() {
      const centerValue = 75000;
      const amplitude = 15000;
      const time = Date.now();
      const wave1 = Math.sin(time * 0.000003);
      const wave2 = Math.sin(time * 0.000005);
      const wave3 = Math.sin(time * 0.000001);
      const combinedWave = wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2;
      const fluctuation = combinedWave * amplitude;
      const currentOnlineUsers = Math.floor(centerValue + fluctuation);
      const newNumberString = currentOnlineUsers.toLocaleString("en-US");

      if (previousNumberString === "") {
        createNumberDisplay(newNumberString);
      } else {
        updateNumberDisplay(newNumberString);
      }
    }

    // start widget cycle
    runUpdateCycle();
    setInterval(runUpdateCycle, 2500);
  }

  // If the container isn't in DOM yet, retry a few times instead of erroring.
  if (!onlineNumberContainer) {
    let tries = 0;
    const maxTries = 20; // retry up to ~10 seconds (20 * 500ms)
    const wait = setInterval(() => {
      onlineNumberContainer = document.getElementById("onlineNumber");
      if (onlineNumberContainer) {
        clearInterval(wait);
        initOnlineNumberWidget();
      } else if (++tries >= maxTries) {
        clearInterval(wait);
        // give up silently
      }
    }, 500);
  } else {
    initOnlineNumberWidget();
  }
});
