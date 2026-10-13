# Verifiche automatiche e manuali — 13 ottobre 2026

Il controllo inizia sulla versione pubblicata 6.10.2, quindi corregge due difetti circoscritti e aggiunge, su richiesta successiva, l’audio arabo nella 6.11.0. Il piano 7.0 non è implementato e non è valutato come se lo fosse. L’utente ha confermato percorso guidato più laboratorio libero.

## Automatici

- Suite Node completa: prima 59/61; fallimenti storici dovuti alle cinque modalità e al vecchio formato iniziale. Aspettative aggiornate alle sei modalità e al formato Grande, mantenendo le verifiche di migrazione. Alla 6.11.0: 63/63, inclusi due nuovi casi di copertura dell’audio arabo.
- Sito pubblico 6.10.2: otto gruppi di coerenza dei gameplay, quattro di frasi/immagini/cloze, sette di design/progressione, quattro di voce e sei di tessere/zoom. Totale 29 gruppi superati. Le suite di logica simulano le voci; il controllo vocale distingue le fixture dal MP3 realmente riprodotto a 0,8× in 7,36 secondi.
- Test di navigazione e verifica del sito avevano selettori e aspettative delle release precedenti. Adeguati a schede e sezioni espandibili attuali, sei modalità e formato esplicitamente scelto nel test. Nove gruppi di navigazione e 25 casi su storage, dodici direzioni di scrittura, layout, audio e offline superati sul build locale intermedio 6.10.3. Precaricamento completato prima di togliere la rete, evitando errori artificiali da download in corso.
- Due regressioni mirate del laboratorio superate: round concluso ripreso senza cronologia annullabile e annuncio della coppia coerente con il messaggio visibile. Voce simulata solo per isolare queste regole.
- Originali 36 Lucide e otto Twemoji, incorporamento, licenze e sintassi dell’app verificati. Nessuna sostituzione grafica durante il controllo.
- Audio arabo: 247 WAV con segnale, 247 MP3 con durata valida; 328 riferimenti, tutte le frasi/varianti/parole del corso e 134 schede alfabetiche coperte. I 566 riferimenti originali restano identici. Playback e offline vengono verificati con lo script smoke-arabic-audio.cjs, senza audio o voci simulate.

I log iniziali e i report finali conservano gli esiti e l’URL effettivamente verificato. Un test aggiornato non viene presentato come prova della vecchia aspettativa.

## Manuali sul sito pubblico, via browser use

Interazioni sui controlli visibili, senza chiamare le API del gioco o modificare stato e punteggi. Browser integrato su Windows, viewport 390 × 844 e 844 × 390; non hardware telefonico reale.

- Ripreso il laboratorio salvato: frase Я пью воду и Я читаю книгу, sette parole, un risultato e 130 punti conservati. Passaggio al round successivo e a Coppie; raccolte Она, Я, читаю e Он. Tavolo completato, +36 XP e totale 143. Riepilogo Laboratorio · Tavolo libero e ritorno tramite Prossima missione a Completa.
- Avviato il cloze Maratona da 52 tessere. Tre distrattori nuovi introdotti prima del gioco: да, нет, пожалуйста. Vista intera e pulsanti zoom funzionanti; errore нет lascia il tavolo giocabile, risposta Привет corretta. Cambio orientamento, seconda risposta Доброе e terza Спасибо; riepilogo 75%, +23 XP, totale 166.
- Schede Lingue, Audio e Dati raggiungibili. Preview vocale italiana reale: ultima voce Microsoft Cosimo - Italian (Italy). Russo senza voce del dispositivo, riserva eSpeak disponibile; nessuna valutazione sonora dichiarata.
- Screenshot del laboratorio completato e del cloze da 52 conservati in qa-manual-lab-summary-6.10.2.png e qa-manual-52-mobile-6.10.2.png. Le prove manuali precedenti della stessa versione restano in PROVA-DAL-VIVO-6.10.2.md; non sono contate come ripetute in questo controllo.

## Difetti corretti

Nel laboratorio, addResult annunciava una frase anche dopo una coppia. Il messaggio accessibile ora segue il tipo di risultato. Riprendendo un round già concluso, la cronologia veniva ricostruita dalla frase e faceva apparire Annulla attivo, sebbene il comando non fosse eseguibile. Ora cronologia e pulsanti restano correttamente disabilitati fino al round successivo.

## Problemi UX ancora reali

La panoramica del tavolo da 52 riduce il testo a dimensioni troppo piccole; è un controllo dell’ingombro, non una vista leggibile per giocare. Gli strati e le sagome regolari restano difficili da interpretare. Modello non è visibile in tutte le attività; il cloze può consistere in una parola sola per una frase breve. Navigazione e rigenerazione dei round conservano la frammentazione descritta nel piano 7.0. I test funzionali superati non risolvono né certificano questi aspetti di design.

Le verifiche non misurano apprendimento duraturo, qualità acustica su ogni telefono, hardware iOS/Android o comprensione universale delle frasi. Non sono stati azzerati progressi né importati salvataggi nel browser manuale.

## Conferma pubblica 6.11.0

Commit funzionale 7ad470d46697504961ebf57e3a2c62010ee4d116 pubblicato; build Pages completata. Sul sito ufficiale sono passati nove gruppi di navigazione, due regressioni del laboratorio, 26 controlli del sito e la verifica araba senza mock (precaricamento completo, cinque esempi reali, confronto temporale 1×/0,8× e ripresa offline). Nessun errore JavaScript rilevato. Report finali: smoke-navigation-6.11.0.json, smoke-lab-resume-6.11.0.json, pages-verification-6.11.0.json e smoke-arabic-audio-6.11.0.json; i report locali conservano il prefisso local e l’URL locale.

Nel browser manuale: titolo e footer 6.11.0, scelto arabo con supporto italiano, selezionato File incluso e attivato Prova la voce العربية. Ultima voce usata Microsoft Hoda (ar-EG); pacchetti arabo e italiano Suoni pronti. Aperta la prima lezione alfabetica, tutti i pulsanti audio e Ascolta disponibili, attivato il file باء. Screenshot qa-manual-arabic-file-6.11.0.png e qa-manual-arabic-alphabet-6.11.0.png. Console senza errori in questa verifica. Preferenza vocale automatica e percorso russo/italiano ripristinati al termine; viewport temporanea rimossa. Il nome del provider e il playback riuscito non sono una revisione acustica madrelingua.
