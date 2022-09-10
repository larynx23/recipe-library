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
  "klasszikus_madartej": {
    "name": "Klasszikus madártej",
    "image": "klasszikus_madartej.jpeg",
    "times": [300, 360],
    "ingredients": [
      {"count": 4, "unit": "db tojásfehérje"},
      {"count": 1, "unit": "csipet só"},
      {"count": 2, "unit": "ek porcukor"},
      {"count": 800, "unit": "ml tej"},
      {"count": 1, "unit": "db vanília"},
      {"count": 4, "unit": "db tojássárgája"},
      {"count": 70, "unit": "g cukor"}
    ],
    "steps": [
      "A tojásfehérjét egy csipet sóval kezdjük el kemény habbá verni, majd adjuk hozzá a két evőkanál porcukrot, és verjük teljesen keményre.",
      "A tejhez adjuk hozzá a vaníliarúd kikapart magjait, majd forraljuk fel fel, és kanállal szaggassuk bele a tojáshabból galuskákat. Két-három percig főzzük, majd óvatosan for- dítsuk meg, újabb két-három perc, és már szedhetjük is ki egy üres tálba.",
      "A tojássárgáját egy csipet sóval és a cukorral keverjük jó habosra, öntsük hozzá egy keveset a langyos tejből, majd azonnal keverjük simára. Adjuk hozzá a maradék tejet, keverjük el, és öntsd vissza az egészet az edénybe.",
      "Alacsony lángon, folyamatosan kevergetve addig főzzük, amíg szépen be nem sűrűsödik, majd hagyjuk kihűlni. Tegyük a tetejére a galuskákat, és az egészet rakjuk be a hűtőbe legalább 2-3 órával azelőtt, hogy tálalni szeretnénk."
    ]
  }
}`);