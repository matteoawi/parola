# Pubblicazione di Parola 6.0.1

Data: 13 ottobre 2026.

- Repository pubblico: https://github.com/florame-ai/parola-mahjong
- Gioco: https://florame-ai.github.io/parola-mahjong/
- Aggiornamenti: https://florame-ai.github.io/parola-mahjong/changelog.html
- GitHub Pages: ramo master, cartella radice, HTTPS attivo.
- Primo caricamento verificato: risposta HTTP 200 e metadati versione 6.0.1.

## Verifiche eseguite in questa pubblicazione

18 test Node superati, compresi motore, persistenza, migrazione e ripasso anticipato. Le simulazioni del motore hanno prodotto 4.320 scenari e 2.000 partite con scelte casuali valide senza stalli osservati.

25 controlli Chromium superati prima sull'origine locale reale, poi sull'indirizzo pubblico GitHub Pages:

- Avvio, numero versione, 24 unità e cinque modalità.
- Riproduzione effettiva di MP3 in italiano, inglese e russo.
- Persistenza della partita dopo ricarica con localStorage reale.
- Recupero del salvataggio principale danneggiato dalla copia di backup.
- 12 partite Scrivi e abbina completate, una per direzione linguistica.
- Layout mobile nelle quattro lingue dell'interfaccia, con controllo RTL arabo e assenza di overflow orizzontale.
- Ricarica del gioco e riproduzione MP3 con rete disattivata.
- Apertura del changelog pubblico con rete disattivata.
- Assenza di errori JavaScript e traduzioni mancanti durante la suite.

Report: `local-pages-verification-6.0.1.json` e `pages-verification-6.0.1.json`. Schermate: `pages-desktop-6.0.1.png` e `pages-mobile-6.0.1.png`. Questi controlli verificano Chromium in questo ambiente; i report originali della versione 6.0.0 restano conservati come evidenza storica e non descrivono la verifica attuale.

## Limiti mantenuti

Gli MP3 arabi sono ancora assenti. Il gioco usa una voce araba del dispositivo, se disponibile. Non è stata eseguita una revisione madrelingua dei contenuti. Per spostare i progressi dal file locale al sito occorre esportarli e importarli dalle Impostazioni.

## Conservazione e aggiornamenti

Il commit iniziale conserva integralmente la versione 6.0.0 ricevuta. Un secondo commit prepara la release 6.0.1 e un terzo conserva la verifica pubblica. I push avvengono su master dopo aver recuperato e integrato gli aggiornamenti remoti, senza forzature. `CHECKSUMS.sha256` elenca i file attualmente conservati.


## Release 6.3.0 e 6.4.0 — 13 ottobre 2026

Repository ufficiale: https://github.com/matteoawi/parola. Sito: https://matteoawi.github.io/parola/. Il ramo master e tutti i commit precedenti sono conservati. Fetch e merge di origin/master eseguiti prima dei due aggiornamenti; nessun aggiornamento remoto da integrare e nessun push forzato.

La 6.3.0, commit f27e9f1, introduce primo avvio, spedizioni di tre tavoli, checkpoint, passaporto e inviti riproducibili. HTML iniziale ridotto da 5.438.799 a 609.574 byte prima della successiva release. Build GitHub Pages completata. Sei test puri mirati e otto gruppi Chromium locali superati; report local-smoke-6.3.0.json. Non è stata ripetuta la suite completa e non viene dichiarato un risultato di 50 milioni di download.

La 6.4.0, commit 99761f9, introduce pacchetti audio completi delle lingue selezionate, buffer decodificati, cache e download recuperabile. Build Pages completata e cinque gruppi Chromium superati sia in locale sia sul sito pubblico. Report local-smoke-audio-6.4.0.json e smoke-audio-6.4.0.json: 377 file iniziali pronti, riproduzione normale e lenta senza rete, zero richieste audio durante l’ascolto, ricarica offline, selezione russa e stato arabo dichiarato. Il tempo di programmazione del buffer misurato sul browser pubblico è 2,5 ms; non è una misura della latenza acustica su tutti i dispositivi. Due test puri mirati superati.

I 566 MP3 eSpeak restano pubblicati. I quattro campioni naturali Edge sono riusciti, ma la generazione completa è fallita prima di sostituire file e manifest. Il generatore sperimentale è conservato e le alternative sono descritte in AUDIO-6.4.0.md. Le credenziali cloud non sono presenti nel sito o nel repository.


## Release 6.5.0 — 13 ottobre 2026

Commit della release: d777a06. GitHub Pages ha completato la build di master e il sito ufficiale https://matteoawi.github.io/parola/ ha superato gli undici gruppi dello smoke mobile/presentazioni. Il vecchio indirizzo Florame non identifica questa pubblicazione.

Tre test puri mirati superati. Report locali e pubblico: local-smoke-mobile-6.5.0.json e smoke-mobile-6.5.0.json. Verificati home in tre sezioni, tessere presentate prima del tavolo, registri persistenti, cinque modalita, invito su profilo nuovo, vecchia sessione e rifiuto di parole alterate nel salvataggio senza cancellare i progressi. Anche l’alfabeto presenta modelli e alternative prima dell’esercizio.

Gli elementi delle tessere, il contenitore di scorrimento e il suo elemento padre mantengono la loro identita durante l’aggiornamento. Un tap sintetico abbina una coppia; uno swipe sintetico Chromium scorre il tavolo anche quando viene aggiornato, senza attivare una tessera di scrittura. Verificati 390x844, 320x667, 844x390, RTL, movimento ridotto e desktop. I comandi di partita restano nel viewport. Le schermate sono home-mobile-6.5.0.png, game-mobile-6.5.0.png e home-desktop-6.5.0.png. Nessuna dichiarazione di frame rate misurato su telefoni fisici.

Fetch e merge di origin/master eseguiti senza aggiornamenti concorrenti da integrare; push normali, changelog e numero versione pubblico coerenti. Sorgenti, file offline, registri di verifica e checksum conservati. La suite completa storica non è stata ripetuta.


## Release 6.5.1 — 13 ottobre 2026

Commit funzionali 15fde04 e 990ee5d. GitHub Pages ha completato la build di 990ee5d; il sito ufficiale https://matteoawi.github.io/parola/ ha superato nove gruppi Chromium sui collegamenti e sulla coerenza dei flussi. Report pubblico smoke-navigation-6.5.1.json; risultati locali conservati in local-smoke-navigation-6.5.1.json e local-smoke-mobile-6.5.1.json.

Indietro/Avanti del browser e pulsanti di ritorno collegati a schermata, sezione, lezione, focus e scorrimento. Partite salvate prima di cambiare schermata, riprese con lo stesso identificativo e presentazioni obbligatorie mantenute. Rigioca conserva il tavolo dell’invito e il suo obiettivo; spedizioni e primo successo hanno una continuazione principale coerente. Inviti e anteprima impostazioni monolingua allineano interfaccia, supporto e audio. Changelog offline collegato alla pagina pubblica.

Verifiche locali: nove gruppi di navigazione, undici di mobile/presentazioni e tre test mirati. Ispezione mobile/desktop riunita, con una correzione delle etichette Indietro. Nessun collaudo dichiarato su hardware fisico o ripetizione della suite completa. Versione, cache, manifest, sorgenti, standalone, changelog e checksum aggiornati; fetch/merge e push normali su master.


## Release 6.5.2 — 13 ottobre 2026

Commit funzionale 1bd9e9d. Build Pages completata e confronto pubblico superato su https://matteoawi.github.io/parola/: 21 superfici con geometrie coincidenti con gli originali, tutti i 36 disegni renderizzati, favicon Lucide e pagina credits.html con licenze ISC/MIT disponibile. Report pubblico smoke-icons-6.5.2.json e locale local-smoke-icons-6.5.2.json; nessun errore JavaScript nei due smoke.

Tutte le SVG del gioco corrente provengono dal pacchetto ufficiale lucide-static 1.56.0. Originali e licenze in assets/icons/lucide, con provenienza del pacchetto e impronte per file. Logo e icona installabile condividono layers-2; sito e standalone incorporano la stessa libreria, senza CDN. Il file offline incorpora anche il favicon. Provenienza verificabile e build ripetibile dalla copia locale, senza modificare i disegni.

Versione, cache, manifest, changelog, sorgenti, artefatti, report e checksum aggiornati. Fetch/merge e push normali su master; nessuna suite storica ripetuta. Ispezione visiva mobile/desktop e tavola completa riunita in una sola passata.


## Release 6.6.0 — 13 ottobre 2026

Commit funzionale 8e4c7f4. GitHub Pages compilato e sito ufficiale https://matteoawi.github.io/parola/ verificato con undici gruppi Chromium: tavoli alfabetici per riconoscimento, ascolto e scrittura, coppie e tessere bloccate nelle quattro lingue, salvataggio, ripresa, completamento e desktop. Switch esclusivo delle tastiere in alfabeto e scrittura delle frasi, risposte conservate e controlli mobile nel viewport. Report locale local-smoke-alphabet-6.6.0.json e pubblico smoke-alphabet-6.6.0.json.

Quattordici test puri mirati superati. Il requisito di ascolto è verificato con provider simulato; non viene dichiarata una nuova voce per le lettere. La velocità del file reale è verificata a 0,8× con mantenimento del tono: 2,47 secondi di contenuto riprodotti in circa 3,31 secondi nel browser pubblico, inclusa la partenza. Nessun nuovo file audio pubblicato o API TTS dichiarata attiva. Proposta gratuita documentata: Gemini Flash Preview TTS tramite proxy Cloudflare e buffer del tavolo nel browser, con quote da verificare nel progetto dell’account.

Manifest, cache, corso, numero versione, sito, standalone e changelog allineati alla 6.6.0. Build delle licenze reso atomico dopo un blocco OneDrive. Sorgenti, immagini e verifiche conservati; push normali su master, nessuna suite storica completa ripetuta.


## Release 6.7.0 — 13 ottobre 2026

Commit funzionale 345d7c1. GitHub Pages ha completato la build; sette gruppi dello smoke passati sul sito ufficiale https://matteoawi.github.io/parola/. Report pubblico smoke-large-6.7.0.json e locale local-smoke-large-6.7.0.json.

Nuovi formati Grande 32 e Maratona 52, con 26 coppie, sei colonne e tre livelli sostenuti. Frasi e alfabeto ampliano il materiale, mantenendo le presentazioni obbligatorie. La ripresa conserva layout e coppie rimosse; i vecchi link mantengono le dimensioni precedenti. Nuovo default Grande con migrazione unica della preferenza, senza alterare le sessioni in corso. Completa e Componi conservano il tavolo di parole della lezione.

Tastiera compatta con tasto Invia chiaro e verifica nel contesto corretto. Testato invio del segno russo e della frase dopo lo switch di tastiera. Vista intera, ingrandimento e contenimento: pagina mobile 390 px, tavolo ingrandito interno 546 px e comandi raggiungibili. Indicatori delle 26 coppie a capo nel desktop. Nessun errore JavaScript nello smoke.

Tre nuovi test puri e otto regressioni mirate superati; ispezione mobile/desktop riunita con una correzione e conferma. Fonti SVG originali Lucide verificate. Versione, corso, manifest, cache, changelog, sorgenti, standalone, report e checksum aggiornati. Fetch/merge e push normali su master; nessuna suite storica completa ripetuta.


## Release 6.8.0 — 13 ottobre 2026

Tessere ridisegnate con rapporto altezza/larghezza tra 1,19 e 1,23, tipografia adattata al contenuto, audio dedicato in basso e contrasto conservato anche sui pezzi bloccati. Zoom uniforme, vista iniziale leggibile, Vista intera su entrambi gli assi, pinch, scorrimento con un dito, − / + e limite 220%. Contenitore dello zoom ritaglia lo spazio di layout non scalato, evitando scorrimento vuoto.

Nove effetti sonori procedurali con un solo AudioContext; rispetto del muto e sospensione in background. Animazioni di raccolta corrette allo zoom, riscontro del punteggio e tessere liberate; movimento ridotto rispettato. Nessun nuovo file audio o servizio vocale.

Nove test Node mirati e sei gruppi dello smoke Chromium locale superati. Pinch e pan verificati con eventi touch CDP reali. Due formati di telefono, desktop, coppie, presentazioni obbligatorie, alfabeto, tastiera Invia, muto, movimento ridotto e limiti zoom. L’automazione attende la fine dell’inerzia dello scorrimento prima di toccare una coppia. Ispezione visiva mobile/desktop riunita con una correzione e conferma; due segnalazioni storiche del detector su controlli fuori dal tavolo conservate. SVG originali Lucide verificate. Report locale local-smoke-tiles-6.8.0.json.


Commit funzionale a59e5e2 pubblicato su master; GitHub Pages ha completato la build senza errori. Sei gruppi dello smoke superati anche su https://matteoawi.github.io/parola/, versione 6.8.0 confermata dal meta pubblico. Report smoke-tiles-6.8.0.json separato dal report locale. Verificati anche gli ingombri effettivi dello scorrimento: in Vista intera non rimane spazio vuoto dovuto alla geometria originale non scalata. Sorgenti, artefatti offline, versione, changelog, documentazione e checksum conservati su GitHub con push normale.


## Release 6.8.1 — 13 ottobre 2026

Priorità ripristinata alla voce del dispositivo in tutte e quattro le lingue, con scelta manuale per lingua, nome della fonte effettiva, graduatoria basata anche sui metadati e migrazione unica dei vecchi valori iniziali. eSpeak rimane riserva/opzione; nessun file audio sostituito o API attivata. Gli effetti sono silenziosi durante la pronuncia. Velocità e tono espliciti, code cancellate prima del recupero dal fallimento, pronunce contestuali conservate.

Dieci casi Node mirati superati e quattro gruppi Chromium locali, con ispezione dell’area Audio su mobile/desktop. Riproduzione reale a 0,8 verificata; scelte e fallimenti del provider di dispositivo simulati, senza dichiarare verificata la qualità percepita dal telefono dell’utente. Report locale local-smoke-voice-6.8.1.json; documentazione VOCE-6.8.1.md. Nessuna suite storica completa ripetuta. Versione, manifest, cache, corso, changelog pubblico, sito, standalone e checksum allineati.


Commit funzionale 9047d15 pubblicato su master e compilato da GitHub Pages senza errori. Quattro gruppi dello smoke superati anche sul sito ufficiale, versione 6.8.1 confermata. Report pubblico smoke-voice-6.8.1.json separato dal locale. La riproduzione del vero file lento mantiene 0,8 e termina; il provider di dispositivo per scelta manuale/fallimento è simulato. Il browser di verifica enumera otto voci per quattro lingue, senza russo. La release non dichiara una nuova voce russa dove il browser non la offre.


## Release 6.9.0 — 13 ottobre 2026

Home, gerarchia e percorso riorganizzati: prossimo tavolo/ripresa in primo piano, accesso diretto ad alfabeto e tavolo libero, obiettivi giornalieri azionabili; Gioca, Impara e Progressi coerenti anche sul desktop. Profilo diviso in Lingue, Audio e Dati. Palette bosco, avorio, corallo, lilla e oro; Nunito locale con licenza e fonte, incorporato nello standalone e nella cache. SVG originali Lucide conservate.

Traguardi con progresso reale, calendario di pratica, passaporto e riepilogo con XP animati e continuazione accessibile. Esploratore accetta 18/32/52 tessere. I tavoli alfabetici completati contano per il giorno una sola volta, senza duplicare il bonus da 30 XP. Ricompense, voci e salvataggi conservati; ogni materiale nuovo resta presentato prima di giocare.

Mobile: cinque formati visibili, avvio del tavolo raggiungibile, navbar breve, zoom con comandi più grandi. Scrittura alfabetica orizzontale con tavolo e tutte le righe della tastiera affiancati: digitazione del segno russo e Invia verificati anche al ritorno in verticale. Profilo e progressi arabi contenuti con RTL e tastiera di navigazione coerenti. Animazioni brevi e movimento ridotto rispettato.

Dodici casi Node mirati e sette gruppi Chromium locali superati. Immagini prima/dopo e report local-smoke-design-6.9.0.json conservati. Ispezione unica mobile/desktop, correzione delle interferenze titolo/anteprima e della tastiera orizzontale, poi conferma; detector senza segnalazioni sullo scope e SVG originali verificate. Nessuna suite storica completa ripetuta.

Controllo funzionale aggiuntivo circoscritto alla tastiera orizzontale: la vecchia regola sul campo #alpha-answer prevaleva per specificità. Dimensioni del campo rese esplicite; Invia è ora interamente nel pannello visibile e il segno russo viene realmente inviato e sbloccato. Nessuna nuova passata di rifinitura visiva.


Commit funzionale 9740aa2 pubblicato su master; GitHub Pages ha completato la build senza errori. Sette gruppi dello smoke superati anche sul sito ufficiale, versione 6.9.0 confermata. Report pubblico smoke-design-6.9.0.json separato dal locale. Verificati font locale, obiettivi e record alfabetico reali, navigazione e ritorni, tutti i formati, schede del profilo, righe della tastiera e Invia interamente nel pannello, replay e RTL. Lo script audio precedente è stato adattato al nuovo accesso alla scheda Audio, senza ripetere la suite vocale completa. Sorgenti, artefatti, licenze, versione, changelog, report e checksum conservati; fetch/merge e push normali su master.

## 6.10.0 — laboratorio, cloze e immagini

Pubblicazione su `matteoawi/parola`, ramo master: commit funzionale `6fa4bff40de949b540efb392a4d8007d14fcb6f4`. Build GitHub Pages completata senza errori. Gioco pubblico: https://matteoawi.github.io/parola/.

Sette test Node mirati superati (grammatica nelle quattro lingue, punteggi, 100 tavoli laboratorio, provenienza delle parole e dei disegni, risposte cloze raggiungibili e presentazioni). Quattro gruppi Chromium superati sull’origine locale e sul sito pubblico: introduzioni, frase lunga e coppie miste, rifornimenti e punteggio, ricarica/ripresa/annullamento, riepilogo senza falsa padronanza, cloze nelle quattro lingue, immagini russo bilingue e arabo monolingua, sei modalità e layout mobile/desktop. Nessun errore JavaScript o traduzione mancante osservato. Verifica di originalità per 36 Lucide e otto Twemoji, con incorporamento offline.

Report: `docs/local-smoke-sentence-games-6.10.0.json` e `docs/smoke-sentence-games-6.10.0.json`. Documentazione e limiti: `docs/MODALITA-6.10.0.md`. Il test disabilita la riproduzione vocale per isolare la logica di gioco; non misura la qualità delle voci sul telefono. Nessun nuovo file audio o servizio vocale introdotto.

Fetch e merge di origin/master prima del push; nessun aggiornamento remoto da integrare. Changelog, crediti, cache, manifest, corso, pagina e standalone aggiornati alla versione 6.10.0.

## 6.10.1 — revisione della coerenza dei gameplay

Commit funzionale `ec31765e6d3396832c286b0ce090ed351c6d4767`, pubblicato su master dopo fetch e merge di origin/master (già aggiornato). Build Pages completata senza errori. Metadati pubblici versione 6.10.1.

Dieci test Node mirati superati e originalità Lucide/Twemoji verificata. Otto gruppi Chromium superati sia in locale sia su https://matteoawi.github.io/parola/: partite complete delle sei modalità e alfabeto, ascolto richiesto prima del match, invio dalla tastiera di gioco, ripresa e svuotamento, indizio su tre parti coordinate, ricompense guidate, traguardi fisici, percorso da 96 missioni e formati distinti. Quattro gruppi aggiuntivi superati in locale per cloze e immagini nelle quattro lingue, inclusi arabo monolingua e russo bilingue. Nessun errore JavaScript o traduzione mancante osservato.

Report: `docs/local-smoke-gameplay-coherence-6.10.1.json`, `docs/smoke-gameplay-coherence-6.10.1.json`, `docs/local-smoke-sentence-games-6.10.1.json`. Resoconto e limiti: `docs/COERENZA-GAMEPLAY-6.10.1.md`. La voce è simulata nei test di gameplay; qualità vocale, efficacia dell’apprendimento e fidelizzazione non sono misurate da queste verifiche. Nessun nuovo file audio o API introdotto.

Versione, manifest, cache, corso, README, LEGGIMI, changelog pubblico, crediti e standalone coerenti alla 6.10.1. Due attività libere continuano a essere selezionabili insieme alle quattro attività del percorso. Server locale di verifica arrestato al termine.
