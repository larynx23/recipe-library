# RecipeLibrary tesztterv
## 1. Manuális tesztek
### 1.1 Felhasználó kezelés
#### 1.1.1 Belépés
- A be nem jelentkezett felhasználónak a megfelelő főoldal jelenik meg
- Csak a be nem jelentkezett felhasználó éri el a bejelentkezés oldalt
- Adatok nélkül nem lehet elküldeni a bejelentkezés formot
- Helytelen vagy nem létező adatoknál nem enged tovább, megfelelő hibát ír ki
#### 1.1.2 Regisztráció
- Csak a be nem jelentkezett felhasználó éri el a regisztráció oldalt
- Adatok nélkül nem lehet elküldeni a regisztrációs formot
- A névnek még az adatbázisban nem létező string-nek kell lennie, és minimum 3 karakternek
- Helytelen regisztrációnál jelzi a felhasználónak a hibát, visszadobja
#### 1.1.3 Kilépés
- Csak bejelentkezett fehasználó tud kijelentkezni
- Visszadobja a felhasználót a főoldalra
- Elfelejti a session token-t
#### 1.1.4 Profil szerkesztése
- Csak bejelentkezett felhasználó éri el az oldalt
- A saját adatai jelennek meg
- Nem tudja kitörölni a saját adatait, muszáj valamilyen értéknek lennie amire változna
- Adatbázisban frissül a felhasználó adata
### 1.2 Receptek
#### 1.2.1 Receptek megjelenítése
- Csak a felhasználóhoz hozzárendelt receptek jelennek meg
- A receptkártyán a nehézség, típus, ár és idő megfelelő formátumként jelenik meg
- Az idő az előkészületi és elkészítési idő összeadva
- A szűrés működőképes, csak a kijelölt típúsú recepteket jelenít meg az oldal
#### 1.2.2 Receptek törlése
- Csak létező azonosítóju, felhasználóhoz hozzárendelt receptet törölhet a felhasználó
- Az adatbázisból törlődik, a hozzá tartozó lépések és hozzávalók is törlődnek
- Nem jelenik meg többet a recept
#### 1.2.3 Receptek hozzáadása
- A hozzáadott recept csak a felhasználóhoz rendelődik hozzá
- Minden adat, kivéve a lépések, kép és hozzávalók, ki van töltve és választva, különben nem küldi el
- Az idő csak számjegy lehet
- A hozzávaló mennyisége és adag csak szám lehet
- Hozzávaló és lépés törlésénél a számozás és sorrend helyes marad
- A kép sikeresen feltöltődik és megjelenik
- Kép nélkül a típusához tartozó alap svg fájlt rendeli magához
#### 1.2.4 Receptek szerkesztése
- Csak a saját receptjét tudja szerkeszteni a felhasználó
- Törölhet lépést és hozzávalót a felhasználó, a sorrend helyes marad
- Az átírt adatok frissülnek az adatbázisban
- A képet kitörölheti a felhasználó
- Az időt, mennyiséget és adagot csak más számjegyre lehet frissíteni
### 1.3 Megjelenés
- Az oldal reszponzív a képernyő arányaira és nagyságára
- A sötét és világos mód működik
- Minden elem mind a sötét, mind a világos témához is van igazítva
## 2. API tesztek
### 2.1 Recipe Endpoints
- `/recipes - GET` - visszaadja az összes receptet ami a meghívó felhasználóhoz tartozik
- `/recipes/{id} - GET` - visszaadja a megadott azonosítójú receptet, ha a meghívó felhasználóhoz tartozik
- `/recipes - POST` - eltárolja a meghívó felhasználóhoz a receptet, a lépések és hozzávalókat
- `/recipes/{id} - PUT` - szerkeszti a megadott azonosítójú receptet, lépéseit és hozzávalóit, ha a meghívó felhasználóhoz tartozik
- `/recipes/{id} - DELETE` - kitörli a receptet az azonosítóval, ha a meghívó felhasználóhoz tartozik
### 2.2 User Endpoints
- `/register - POST` - új felhasználót regisztrál, ha nincsen ilyen név az adatbázisban, encrypteli a jelszót
- `/login - POST` - megfelelő adatoknál visszaad egy session token-t a felhasználóhoz, ha helytelenek az adatok visszadob
- `/logout - POST` - kitörli a sesson token-t az adatbázisból