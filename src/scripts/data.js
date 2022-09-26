/*
A recept adatok struktúrája
A recept név ami URL paraméterbe megjelenik az meg fog egyezni az id-vel.
A recept kép a public/images/receipts-ből lesz kiszedve

id: string - Ez az object kulcsa, snake case recept neve
--- Object adatai ---
name: string - Recept neve
money: number - 1, 2, 3, mennyire drága 1 a legolcsóbb 3 a drága
type: number - 1, 2, 3 - előétel, főétel, desszert
difficulty: number - 1, 2, 3, mennyire nehéz 1 a könnyű 3 a nehéz (2 a haladó)
description: string - A recept leírása
image: string - Recept képének a neve és kiterjesztése
icon: string - Főoldalon szereplő rajzolt kép neve és kiterjesztése
times: []number - Recept előkészítési és sütési ideje MÁSODPERCBEN
defServing: number - Recept alapértelmezett adag
ingredients: []{count: number, unit: string} - Hozzávalók lista: count azt jelenti, hogy hány kell EGY elkészítéséhez és a unit pedig az ami ezután a szám után oda lesz írva
steps: []string - Lépések lista
*/
const receiptData = JSON.parse(`{
  "tiramisu": {
    "name": "Tiramisu",
    "type": 3,
    "money": 2,
    "difficulty": 1,
    "description": "A muffin tejesen magától értetődő sütemény, tehát pillanatok alatt elkészül.",
    "image": "tiramisu.jpg",
    "icon": "tiramisu.png",
    "times": [1800, 0],
    "defServing": 4,
    "ingredients": [
      {"count": 6, "unit": "db tojás"},
      {"count": 200, "unit": "g porcukor"},
      {"count": 120, "unit": "ml kávé"},
      {"count": 0.5, "unit": "teáskanál só"},
      {"count": 1000, "unit": "g mascarpone"},
      {"count": 1, "unit": "teáskanál amarettó"},
      {"count": 600, "unit": "g babapiskóta"},
      {"count": 6, "unit": "evőkanál cukrozatlan kakaópor"}
    ],
    "steps": [
      "Szétválasztjuk a tojások sárgáját és fehérjét. A porcukor felét hozzákeverjük a sárgájához. Azt vízgőz fölé helyezzük, és folyanatosan keverjük, amíg szép habos, világos nem lesz.",
      "A tojásfehérjét fél teáskanál sóval elkezdjük habbá verni, menet közben, hozzáadjuk a porcukrot, és teljesen kemény habbá verjük.",
      "A szobahőmérsékletű mascarponéhoz hozzákeverjük a tojássárgájás masszát, majd óvatosan, három részletben a fehérjehabot is.",
      "A kávét elkeverjük az amerettóval, majd a babapiskótákat megmártjuk benne, és egy tálba fektetünk egy réteget. Rárakjuk a krém felét, erre jön a megmártott babapiskóták másik fele, végül az utolsó adag krém.",
      "A tiramisut egy éjszakára hűtőbe tesszük. Tálalás előtt megszórhatjuk a tetejét kakaóporral."
    ]
  },
  "almas_lepeny": {
    "name": "Almás lepény",
    "type": 3,
    "money": 1,
    "difficulty": 2,
    "description": "A nagymama almás süteményéhez semmi sem fogható. Íme a legjobb almás lepény recept.",
    "image": "almas_lepeny.jpg",
    "icon": "pie.svg",
    "times": [1800, 2700],
    "defServing": 8,
    "ingredients": [
      {"count": 40, "unit": "dkg finomliszt"},
      {"count": 0.5, "unit": "csomag sütőpor"},
      {"count": 1, "unit": "csipet só"},
      {"count": 13, "unit": "dkg vaj"},
      {"count": 1, "unit": "db tojássárgája"},
      {"count": 13, "unit": "dkg cukor"},
      {"count": 150, "unit": "g tejföl (vagy tej)"},
      {"count": 12, "unit": "alma (savanykás ízű)"},
      {"count": 8, "unit": "ek cukor"},
      {"count": 1, "unit": "teáskanál fahéj"},
      {"count": 2, "unit": "ek zsemlemorzsa (vagy kevés durvára vágott dió)"},
      {"count": 1, "unit": "db tojásfehérje"},
      {"count": 1, "unit": "ek porcukor"}
    ],
    "steps": [
      "A lisztet összekeverjük a sütőporral és sóval, összegyúrjuk a vajjal, tojássárgájával, cukorral és annyi tejföllel, hogy könnyen nyújtható tésztát kapjunk.",
      "Az imént készült tésztát hűtőbe tesszük",
      "Az almákat meghámozzuk majd lereszeljük.",
      "A tészta felét kinyújtjuk, kizsírozott tepsibe rakjuk, és megszórjuk kevés zsemlemorzsával vagy durvára vágott dióval.",
      "Az alma levét kinyomkodjuk, szétterítjük a tepsiben, megszórjuk 8 evőkanál cukorral, meghintjük őrölt fahéjjal.",
      "A tészta másik felét is kinyújtjuk majd rátesszük a sütemény tetejére.",
      "A tojásfehérjét kicsit felverjük, megkenjük vele a tésztát, villával megszurkáljuk a felső tésztaréteget,és már mehet is a tepsi az előmelegített sütőbe.",
      "200 fokon 45 percig sütjük."
    ]
  },
  "muffin": {
    "name": "Muffin",
    "type": 3,
    "money": 1,
    "difficulty": 3,
    "description": "A muffin tejesen magától értetődő sütemény, tehát pillanatok alatt elkészül.",
    "image": "muffin.jpg",
    "icon": "cupcake.svg",
    "times": [600, 1200],
    "defServing": 6,
    "ingredients": [
      {"count": 2, "unit": "bögre finomliszt"},
      {"count": 1, "unit": "bögre cukor"},
      {"count": 250, "unit": "ml tej"},
      {"count": 125, "unit": "ml napraforgó olaj"},
      {"count": 1, "unit": "db tojás"},
      {"count": 1, "unit": "csomag sütőpor"}
    ],
    "steps": [
      "A lisztet a sütőporral elvegyítjük.",
      "A tojást habosra keverjük és hozzáadjuk a cukrot, valamint a tejet és az olajat is.",
      "Végül az egészet elkeverjük.",
      "A muffinformákat kivajazzuk vagy muffinpapírral béleljük.",
      "A masszát a formákba öntjük és 175-180 fokon tűpróbáig sütjük."
    ]
  },
  "csokis_keksz": {
    "name": "Csokis keksz",
    "type": 3,
    "money": 2,
    "difficulty": 2,
    "description": "A világ legnépszerűbb édességei közé tartozik a puha amerikai csokis keksz.",
    "image": "csokis_keksz.jpg",
    "icon": "cookie.svg",
    "times": [900, 720],
    "defServing": 8,
    "ingredients": [
      {"count": 100, "unit": "g nádcukor"},
      {"count": 100, "unit": "g cukor"},
      {"count": 175, "unit": "g vaj"},
      {"count": 2, "unit": "db tojás"},
      {"count": 275, "unit": "g finomliszt"},
      {"count": 1, "unit": "teáskanál vanília kivonat (őrlemény)"},
      {"count": 1, "unit": "tk sütőpor"},
      {"count": 0.5, "unit": "tk szódabikarbóna"},
      {"count": 150, "unit": "g étcsokoládé (pasztilla)"}
    ],
    "steps": [
      "A kétféle cukrot a vajjal habosra keverjük, majd egyesével hozzáütjük a tojásokat is.",
      "Hozzáadjuk a lisztet, a vaníliaőrleményt, a sütőport, valamint a szódabikarbónát, és az egészet csomómentesre keverjük.",
      "Beleszórjuk a csokoládépasztillákat, és összeforgatjuk a tésztával, hogy egyenletesen eloszoljanak.",
      "Egy fagylaltos kanalat olajjal bekenünk, és azzal adagoljuk a tésztát a sütőpapírral bélelt tepsire. Nem kell szétlapogatni: a keksz lényege, hogy a hő hatására magától fog szétfolyni, így nyeri el jellegzetes formáját. Pont ezért ügyeljünk rá, hogy viszonylag messze legyenek egymástól a tésztagombócok.",
      "175°C-ra előmelegített sütőbe tesszük, nagyjából 12 percre. Ezalatt a tésztagombócok szétfolynak, majd a bennük lévő sütőpor miatt picit megdagadnak, végül összeesnek - így lesz tökéletes az állaga.",
      "Hidegen és melegen egyaránt isteni, együk magában, vagy tunkoljuk kedvünk szerint bármibe."
    ]
  },
  "kokuszgolyo": {
    "name": "Kókuszgolyó",
    "type": 3,
    "money": 1,
    "difficulty": 1,
    "description": "A világ legnépszerűbb édességei közé tartozik a puha amerikai csokis keksz.",
    "image": "kokuszgolyo.webp",
    "icon": "kokuszgolyo.svg",
    "times": [1200, 0],
    "defServing": 6,
    "ingredients": [
      {"count": 50, "unit": "dkg kekszmorzsa"},
      {"count": 2, "unit": "Evőkanál cukrozatlan kakaópor "},
      {"count": 1, "unit": "csomag vaníliás cukor "},
      {"count": 20, "unit": "dkg porcukor"},
      {"count": 20, "unit": "dkg vaj"},
      {"count": 2, "unit": "dl tej"},
      {"count": 20, "unit": "csepp rumaroma"},
      {"count": 20, "unit": "dkg kókuszreszelék"}
    ],
    "steps": [
      "A fenti alapanyagokat összedolgozzuk a kókuszreszelék kivételével.",
      "Vizes kézzel kicsi gombócokat formázunk, és belehempergetjük a kókuszreszelékbe.",
      "2 órára a hűtőbe tesszük, majd elfogyasztjuk! "
    ]
  },
  "gofri": {
    "name": "Édes gofri",
    "type": 3,
    "money": 1,
    "difficulty": 1,
    "description": "Ha egyszer is kipróbálod ezt a receptet, soha többé nem akarsz bolti gofrit vásárolni!",
    "image": "gofri.jpeg",
    "icon": "gofri.svg",
    "times": [1500, 0],
    "defServing": 4,
    "ingredients": [
      {"count": 20, "unit": "dkg finomliszt"},
      {"count": 1, "unit": "csomag vaníliás cukor"},
      {"count": 1, "unit": "ek cukor"},
      {"count": 1, "unit": "csomag sütőpor"},
      {"count": 2, "unit": "db tojás"},
      {"count": 2, "unit": "dl tej"},
      {"count": 2, "unit": "ek vaj"},
      {"count": 1, "unit": "csipet só"}
    ],
    "steps": [
      "A száraz hozzávalókat összekeverjük egy tálban.",
      "A tojást, a langyos tejet és az olvasztott vajat pedig egy másik tálban felverjük.",
      "A liszthez hozzáöntjük jó sűrű kevergetés mellett az előzőleg jól felvert tejes keveréket, majd az egészet kikeverjük úgy, hogy egy jó sűrű, de mégis kissé folyós masszát kapjunk.",
      "A gofrisütőt olajjal kikenjük, és belemerjük adagonként a gofri masszáját, és megsütjük. A végén ízlésünknek megfelelően fogyasztjuk!"
    ]
  },
  "nachos": {
    "name": "Nachos",
    "type": 1,
    "money": 1,
    "difficulty": 1,
    "description": "A leggyorsabb nachos, akár egy esti nasinak is elmehet.",
    "image": "nachos.jpeg",
    "icon": "nachos.svg",
    "times": [600, 600],
    "defServing": 2,
    "ingredients": [
      {"count": 20, "unit": "dkg tortilla chips"},
      {"count": 70, "unit": "g szalámi"},
      {"count": 100, "unit": "g vörösbab"},
      {"count": 2, "unit": "ek jalapeño"},
      {"count": 10, "unit": "db fekete olajbogyó"},
      {"count": 100, "unit": "g cheddar sajt"},
      {"count": 3, "unit": "db koktélparadicsom"},
      {"count": 60, "unit": "g tejföl"},
      {"count": 1, "unit": "tk fokhagymapor"},
      {"count": 1, "unit": "ek chiliszósz"}
    ],
    "steps": [
    "Fogjunk egy kisebb tepsit, és a tortillachips felét oszlassuk el szépen az alján. Ezután már kezdhetünk is rétegezni: jöhetnek a szalámifalatok, a vörösbab, a jalapenoszeletek, az olajbogyó-karikák. Ez persze csak ajánlat - bármit tehetünk bele, amit megkívánunk és van otthon.",
    "Amikor a rétegezéssel készen vagyunk, jöhet a sajt: klasszikusan cheddart szokás használni, de bármilyen sajttal isteni a végeredmény, szóval nyugodtan használjuk a kedvencünket.",
    "Végül jöhet a tortillachips másik fele, a tetejére pedig paradicsomkarikákat vágunk. 180°C-os sütőbe tesszük, és 10-15 perc alatt készre sütjük.",
    "Közben egy pohárban összekeverünk egy kevés tejfölt némi fokhagymaporral és srirachaszósszal.",
    "A mártogatóst a kész nachos tetejére kanalazzuk, majd az egészet megszórjuk aprított petrezselyemmel (vagy korianderrel, vagy újhagyma zölddel, vagy ami éppen van otthon), végül rámorzsolunk egy pár szem tortillachipset."
    ]
  },
  "tatar_beefsteak": {
    "name": "Tatár beefsteak",
    "type": 1,
    "money": 1,
    "difficulty": 1,
    "description": "Azoknak, akiknek csak negyed órájuk van a főzésre!",
    "image": "tatar.jpg",
    "icon": "tatar.svg",
    "times": [600, 0],
    "defServing": 2,
    "ingredients": [
      {"count": 20, "unit": "dkg marhabélszín "},
      {"count": 0.5, "unit": "közepes db vöröshagyma "},
      {"count": 1, "unit": "db tojássárgája "},
      {"count": 0.5, "unit": "ek mustár "},
      {"count": 1, "unit": "ek sűrített paradicsom "},
      {"count": 1, "unit": "csipet só"},
      {"count": 1, "unit": "csipet bors"},
      {"count": 1, "unit": "ek fűszerpaprika "}
    ],
    "steps": [
      "A bélszínt kétszer ledaráltatjuk a hentessel.",
      "Az összes hozzávalót tálba tesszük, és összekeverjük.",
      "Szobahőmérsékleten, vajjal, pirítóssal és ízlés szerinti friss zöldségekkel kínáljuk."
    ]
  }
}`);

const typeText = {
  1: "előétel",
  2: "főétel",
  3: "desszert"
};

const moneyText = {
  1: "olcsó",
  2: "átlagos",
  3: "drága"
};

const difficultyText = {
  1: "könnyű",
  2: "haladó",
  3: "nehéz"
};

function secsToText(seconds) {
  const timesMark = ["ó", "p", "mp"];
  let times = [Math.floor(Math.floor(seconds / 60) / 60)];
  seconds -= times[0] * 60 * 60;
  times.push(Math.floor(seconds / 60), seconds % 60);
  let toReturn = [];
  times.forEach((t, i) => {
    if (t > 0) {
      toReturn.push(`${t}${timesMark[i]}`);
    }
  })
  return toReturn.join(" ");
}