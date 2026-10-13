# Parola — Mahjong delle lingue

Gioco di lingue con 24 unità, sei modalità e 12 direzioni bilingui, quattro percorsi monolingua e 45 lezioni di alfabeto tra italiano, inglese, arabo e russo.

**Gioca:** https://matteoawi.github.io/parola/

**Versione:** 6.11.0 · [Aggiornamenti pubblici](https://matteoawi.github.io/parola/changelog.html)

Audio incluso nelle quattro lingue. Il nuovo pacchetto arabo usa Microsoft Hoda, copre parole, frasi e i 134 materiali dell’alfabeto, e si precarica scegliendo la lingua. La pagina iniziale è leggera; Parola-offline.html incorpora tutti gli audio. Dettagli: [Audio arabo 6.11](docs/AUDIO-ARABO-6.11.0.md).

Primo avvio guidato, spedizioni di tre tavoli, passaporto delle parole, sfide condivisibili, sfida del giorno, tavoli da 6/12/18/32/52 tessere, obiettivi, nove traguardi e progressione XP. Dettagli: [Dinamiche 6.3](docs/GIOCO-6.3.0.md).

Verifica automatica e manuale 6.11: [Risultati e limiti](docs/QA-COMPLETA-6.11.0.md).

Coerenza dei gameplay e verifiche: [Revisione 6.10.1](docs/COERENZA-GAMEPLAY-6.10.1.md).

Interazioni sul sito pubblico, audio reale e correzioni: [Prova dal vivo 6.10.2](docs/PROVA-DAL-VIVO-6.10.2.md).

Laboratorio, frasi con parola mancante e immagini: [Modalità 6.10](docs/MODALITA-6.10.0.md).

Home, colori, progressi, ricompense e mobile: [Design 6.9](docs/DESIGN-6.9.0.md).

Priorità alle voci del dispositivo e scelta per lingua: [Audio 6.8.1](docs/VOCE-6.8.1.md).

Nuove tessere, pinch, zoom e suoni di gioco: [Release 6.8](docs/TESSERE-E-ZOOM-6.8.0.md).

Tavoli fino a 52 tessere e tasto Invia: [Release 6.7](docs/TAVOLI-GRANDI-6.7.0.md).

Alfabeto sul tavolo Mahjong, switch delle tastiere e velocità audio: [Release 6.6](docs/ALFABETO-MAHJONG-6.6.0.md).

SVG originali Lucide in tutto il gioco: [Icone e provenienza 6.5.2](docs/ICONE-6.5.2.md) · [Licenze pubbliche](https://matteoawi.github.io/parola/credits.html).

Navigazione, ritorni e sfide collegati: [Coerenza 6.5.1](docs/NAVIGAZIONE-6.5.1.md).

Home mobile compatta, comandi di partita in vista e presentazioni obbligatorie di tutto il materiale prima di giocare: [Mobile e presentazioni 6.5](docs/MOBILE-E-PRESENTAZIONI-6.5.0.md).

## Ricostruzione e verifiche

```sh
python scripts/create-literacy-content.py
python scripts/build.py --standalone Parola-offline.html
node --test test/*.test.mjs
python scripts/update-checksums.py
```

`VERSION` è la versione della release; aggiornarla insieme alla cache in `sw.js` e a `CHANGELOG.md`, quindi ricostruire `index.html`, `Parola-offline.html` e `changelog.html`.

Il percorso dell’alfabeto contiene 294 elementi e sessioni da massimo sei esercizi. Riconoscimento, scrittura e ascolto hanno progressi separati. Si può iniziare dall’alfabeto o dalle frasi; nel monolingua si usano indizi nella stessa lingua. I nuovi audio di lettere e parole dipendono da una voce del dispositivo nella lingua corretta. Dettagli e fonti: [Alfabeto e monolingua](docs/ALFABETO_E_MONOLINGUA.md).

Gli audio disponibili della lingua scelta si caricano integralmente e vengono decodificati prima dell’ascolto: [Audio 6.4](docs/AUDIO-6.4.0.md). La qualità dei 566 MP3 di base non è stata ancora sostituita.

Per un controllo breve della release, eseguire `node scripts/smoke-mobile-6.5.cjs`. Per la verifica completa sul sito reale, eseguire `node scripts/verify-pages.cjs` e `node scripts/verify-learning.cjs` con Playwright disponibile. `PAROLA_URL` permette di indicare un indirizzo alternativo; `PLAYWRIGHT_MODULE_PATH` permette di indicare il percorso del pacchetto Playwright.

## Pubblicazione e lavoro da più computer

GitHub Pages pubblica automaticamente la radice del ramo `master`. Il repository conserva anche i sorgenti e le verifiche. Prima di modificare da un altro computer, eseguire `git pull --ff-only origin master`. Prima di inviare modifiche, eseguire `git fetch origin` e `git merge origin/master`, risolvere eventuali conflitti e ripetere le verifiche. Eseguire quindi commit e `git push origin master`, senza forzare il push.

La prima importazione conserva la versione originale 6.0.0 in un commit separato. La documentazione dettagliata e i limiti delle verifiche precedenti si trovano in [LEGGIMI.md](LEGGIMI.md).

Esportare i progressi dalle Impostazioni prima di passare dal file locale al sito: gli indirizzi hanno salvataggi distinti.
