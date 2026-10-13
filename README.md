# Parola — Mahjong delle lingue

Gioco di lingue con 24 unità, cinque modalità e 12 direzioni bilingui, quattro percorsi monolingua e 45 lezioni di alfabeto tra italiano, inglese, arabo e russo.

**Gioca:** https://matteoawi.github.io/parola/

**Versione:** 6.1.0 · [Aggiornamenti pubblici](https://matteoawi.github.io/parola/changelog.html)

I 566 MP3 inclusi coprono italiano, inglese e russo. Per l'arabo serve una voce disponibile sul dispositivo.

## Ricostruzione e verifiche

```sh
python scripts/create-literacy-content.py
python scripts/build.py --standalone index.html
node --test test/*.test.mjs
python scripts/update-checksums.py
```

`VERSION` è la versione della release; aggiornarla insieme alla cache in `sw.js` e a `CHANGELOG.md`, quindi ricostruire `index.html` e `changelog.html`.

Il percorso dell’alfabeto contiene 294 elementi e sessioni da massimo sei esercizi. Riconoscimento, scrittura e ascolto hanno progressi separati. Si può iniziare dall’alfabeto o dalle frasi; nel monolingua si usano indizi nella stessa lingua. I nuovi audio di lettere e parole dipendono da una voce del dispositivo nella lingua corretta. Dettagli e fonti: [Alfabeto e monolingua](docs/ALFABETO_E_MONOLINGUA.md).

Per la verifica sul sito reale, eseguire `node scripts/verify-pages.cjs` e `node scripts/verify-learning.cjs` con Playwright disponibile. `PAROLA_URL` permette di indicare un indirizzo alternativo; `PLAYWRIGHT_MODULE_PATH` permette di indicare il percorso del pacchetto Playwright.

## Pubblicazione e lavoro da più computer

GitHub Pages pubblica automaticamente la radice del ramo `master`. Il repository conserva anche i sorgenti e le verifiche. Prima di modificare da un altro computer, eseguire `git pull --ff-only origin master`. Prima di inviare modifiche, eseguire `git fetch origin` e `git merge origin/master`, risolvere eventuali conflitti e ripetere le verifiche. Eseguire quindi commit e `git push origin master`, senza forzare il push.

La prima importazione conserva la versione originale 6.0.0 in un commit separato. La documentazione dettagliata e i limiti delle verifiche precedenti si trovano in [LEGGIMI.md](LEGGIMI.md).

Esportare i progressi dalle Impostazioni prima di passare dal file locale al sito: gli indirizzi hanno salvataggi distinti.
