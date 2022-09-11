/*
A recept adatok struktúrája
A recept név ami URL paraméterbe megjelenik az meg fog egyezni az id-vel.
A recept kép a public/images/receipts-ből lesz kiszedve

id: string - Ez az object kulcsa, snake case recept neve
--- Object adatai ---
name: string - Recept neve
image: string - Recept képének a neve és kiterjesztése
times: []number - Recept előkészítési és sütési ideje MÁSODPERCBEN
ingredients: []{count: number, unit: string} - Hozzávalók lista: count azt jelenti, hogy hány kell EGY elkészítéséhez és a unit pedig az ami ezután a szám után oda lesz írva
steps: []string - Lépések lista
*/
const receiptData = JSON.parse(`{
  "tiramisu": {
    "name": "Tiramisu",
    "image": "tiramisu.jpg",
    "times": [1800, 0],
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
    "image": "almas_lepeny.jpg",
    "times": [1800, 2700],
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
    "image": "muffin.jpg",
    "times": [600, 1200],
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
  }
}`);