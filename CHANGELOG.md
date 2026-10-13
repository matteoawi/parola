# Aggiornamenti di Parola

## 6.6.0 — 13 ottobre 2026

- Tutti gli esercizi dell’alfabeto usano ora un tavolo Mahjong, con coppie, sovrapposizioni e lati liberi: riconoscimento, ascolto e scrittura. Ascolta prima di abbinare; nella scrittura digita per sbloccare il segno e poi libera la coppia.
- Stato del tavolo, tessere abbinate, risposte e progressi salvati per lingua e abilità. Presentazioni del materiale obbligatorie anche prima delle riprese; vecchie sessioni migrate senza perdere i risultati. Indizi e mescolamento registrati come pratica assistita.
- Switch esplicito tra tastiera del gioco e tastiera del dispositivo in alfabeto, scrittura delle frasi e aiuti. La tastiera del gioco usa un campo di sola lettura con inputmode none per tenere chiusa quella del telefono; la tastiera di sistema nasconde quella del gioco. Scelta salvata, lettere maiuscole, spazio, cancellazione e segni supportati.
- Velocità audio riapplicata al caricamento e all’avvio della riproduzione, con mantenimento del tono anche sui browser che usano il prefisso WebKit. Web Audio segue la frequenza del dispositivo. Nessun nuovo file vocale pubblicato e nessuna nuova voce naturale dichiarata.

## 6.5.2 — 13 ottobre 2026

- Tutte le icone SVG del gioco sostituite con 36 disegni originali della libreria Lucide, versione fissata 1.56.0: navigazione, modalità, audio, aiuti, premi, risultati, logo e icona installabile.
- Geometrie originali conservate, con dimensioni e colori adattati al gioco. Nessuna icona SVG disegnata appositamente e nessun caricamento da CDN durante il gioco.
- Fonti, file SVG originali, licenze ISC/MIT e impronte dei file conservati nel repository. Pagina pubblica Icone e licenze accessibile dal gioco; licenze incluse anche nel file offline.
- Generazione ripetibile delle icone dalla copia locale, per mantenere coerenti il sito e l’edizione offline negli aggiornamenti successivi.

## 6.5.1 — 13 ottobre 2026

- Navigazione Indietro e Avanti del browser collegata alle schermate del gioco. I ritorni recuperano la sezione della home, la lezione, il contesto della sfida e lo scorrimento; le partite in corso vengono salvate prima di cambiare schermata.
- I pulsanti Indietro di presentazioni, lezioni, passaporto, condivisione e installazione tornano alla schermata di provenienza. Le schermate transitorie di presentazione e partita conclusa non si accumulano nella cronologia.
- Rigiocare conserva seme, formato, obiettivo degli inviti e contesto giornaliero o di spedizione. I riepiloghi di spedizione e prima vittoria hanno un solo percorso principale per continuare.
- Inviti monolingua con interfaccia nella stessa lingua. Nelle impostazioni, anche l’anteprima delle lingue e del pacchetto audio si allinea subito al percorso monolingua. La sezione attiva nella navigazione resta coerente anche nei flussi di gioco libero e ripasso.
- Etichette Indietro coerenti in tutte le lingue; il file offline collega gli aggiornamenti pubblici anche quando aperto da solo.
- Dialoghi chiusi correttamente con Esc e focus restituito al comando di provenienza. Le schermate nuove portano il focus sul titolo, senza aprire la tastiera del telefono.

I progressi e le presentazioni già salvate restano compatibili. Tornare a una vecchia schermata di un altro percorso linguistico porta alla home del percorso attuale, evitando di mescolare le lingue.

## 6.5.0 — 13 ottobre 2026

- Home mobile divisa in Gioca, Percorso e Oggi, con navigazione in basso. Sfida e continuazione sono compatte; capitoli, regole, esempi, catalogo dell’alfabeto e strumenti secondari si aprono su richiesta.
- Partita mobile dedicata al tavolo, con comandi sempre raggiungibili e regola disponibile dal pulsante informativo. Il tavolo scorre internamente quando il materiale è ampio; i testi lunghi mantengono l’altezza necessaria per essere letti. Supportati schermi piccoli e orientamento orizzontale.
- Le parole del tavolo vengono introdotte prima della partita, comprese quelle aggiunte dai formati grandi. Una scheda alla volta presenta frase, significato o indizio monolingua e parole nel contesto; occorre confermarla prima di giocare.
- Presentazioni salvate per contenuto e percorso, separate da parole viste, partite e padronanza. Il materiale già introdotto non si ripete; contenuti cambiati, un’altra direzione linguistica o vecchi salvataggi senza presentazioni richiedono il passaggio pertinente.
- Il controllo si applica alle cinque modalità, alle spedizioni, agli inviti, alle riprese e ai tavoli di ripasso. Anche gli esercizi di alfabeto presentano prima i modelli e le possibili forme da distinguere della sessione. Nessun premio o avanzamento di abilità viene assegnato per la sola presentazione.
- Tessere ed elemento di scorrimento conservati durante gli aggiornamenti del gioco. Spostamenti che ripartono dalla posizione visibile e mantengono la velocità, raccolta delle coppie verso il punteggio, feedback al tocco e movimento ridotto rispettato.

Tre test mirati e undici gruppi Chromium sui nuovi flussi, compresi profilo nuovo, vecchia sessione, 320 px, mobile orizzontale e RTL. Verificati layout emulati e continuità degli elementi; non viene dichiarata una misura del frame rate su ogni telefono reale. I progressi precedenti sono mantenuti.

## 6.4.0 — 13 ottobre 2026

- Gli audio disponibili delle lingue scelte vengono caricati integralmente, con avanzamento visibile. Il caricamento parte alla scelta della lingua o alla riapertura di un percorso già avviato, senza bloccare il gioco.
- I suoni caricati sono decodificati in memoria: l’ascolto normale usa Web Audio senza richieste HTTP al tocco. Il rallentamento usa il file già in memoria mantenendo il tono della voce.
- Pacchetti conservati nella cache, riutilizzabili dopo una ricarica offline. Cambiare lingua libera gli audio decodificati delle lingue inattive. Download concorrenti limitati, rispetto del risparmio dati e comando esplicito per completare o riprovare un caricamento.
- Stato distinto per suoni pronti, download parziale e lingue prive di pacchetto. I nomi dei segni russi e delle varianti arabe sono esplicitati nei relativi esercizi di ascolto.
- Preparato un generatore opzionale di file neurali tramite edge-tts, separato dal sito. Quattro campioni ottenuti; la generazione completa non è riuscita e non ha sostituito i file pubblicati.

Questa release migliora il caricamento e la latenza, ma mantiene i 566 MP3 sintetici di base già disponibili. L’arabo continua a usare una voce del dispositivo quando presente. Le nuove voci naturali richiedono ancora un pacchetto generato con successo. Nel controllo Chromium locale, 377 file italiani e inglesi decodificati, riproduzione normale e lenta offline e zero richieste audio durante l’ascolto. Non è una garanzia di latenza acustica nulla su ogni dispositivo.

## 6.3.0 — 13 ottobre 2026

- Primo avvio con scelta delle lingue e ingresso dall’alfabeto o dalle frasi. La prima partita parte subito con tre coppie e una coppia evidenziata; quell’aiuto viene registrato come assistito. Chi ha già progressi continua senza ripetere l’introduzione.
- Spedizioni di tre tavoli: abbina, ricostruisci e scrivi. Le unità avanzano lungo il corso; tavoli, checkpoint e punteggio si salvano per ciascun percorso. Nuovo traguardo per la prima spedizione completata.
- Passaporto delle parole con 78 timbri per percorso. Una frase si scopre dopo almeno una risposta autonoma: la semplice apertura del tavolo o un aiuto non la sbloccano.
- Sfide tra amici tramite link: stessa lingua, modalità, dimensione e disposizione iniziale delle tessere, con obiettivo di punteggio e risultato finale. Condivisione del browser quando disponibile, altrimenti copia del link. Nessun salvataggio personale viene incluso.
- Nuova home con viaggio, accesso al passaporto, inviti raggiungibili anche al primo avvio e comandi per installazione e download. Layout mobile, tastiera, RTL e movimento ridotto mantenuti.
- Pagina iniziale alleggerita di circa l’89% rispetto alla 6.2.0: audio separati e precaricamento dei suoni del tavolo. La cache permette il gioco offline dopo un caricamento riuscito, con gli MP3 già caricati. Corretto il recupero dei segmenti audio e il rischio che il changelog sostituisse il gioco nella cache.
- Edizione Parola-offline.html scaricabile: gioco, corso e tutti i 566 MP3 disponibili incorporati in un solo file. Installazione sul dispositivo con comando nativo quando supportato o istruzioni per il browser.

Le sfide condivise usano un obiettivo proposto nel link, senza classifica verificata. Il passaporto registra una prova autonoma, non la padronanza definitiva della lingua. L’audio arabo e le nuove lettere continuano a dipendere dalle voci del dispositivo. Test mirati sui nuovi flussi, senza ripetere l’intera suite storica.

## 6.2.0 — 13 ottobre 2026

- Nuova home con sfida del giorno, livello di gioco, avanzamento XP e tre obiettivi giornalieri. I capitoli del corso possono essere richiusi e la partita in corso resta raggiungibile.
- Tre dimensioni negli abbinamenti: Essenziale con 6 tessere, Classico con 12 ed Esploratore con 18. Nei tavoli più ampi si incontrano anche parole ed espressioni precedenti.
- Sfida giornaliera riproducibile per giorno e percorso, scelta tra le unità vicine ai progressi reali. Può essere salvata e ripresa; il bonus di 15 XP viene assegnato una sola volta per giorno e percorso.
- Obiettivi: completare un tavolo, dare cinque risposte autonome e fare sei esercizi di alfabeto oppure tre ripassi dovuti. Completare i tre passi assegna 30 XP una volta al giorno; gli eventi ripetuti e le importazioni non duplicano i premi.
- Otto traguardi legati a missioni, monolingua, lingue studiate, alfabeto, scrittura, serie, tavoli grandi e giorni di pratica. La serie giornaliera distingue i giorni consecutivi dal totale dei giorni giocati.
- Tessere con uscita e riposizionamento animati, conservazione dello scorrimento e del focus, risposta immediata al tocco e navigazione tra tessere libere con le frecce della tastiera. Movimento ridotto rispettato.
- Etichette Frase/Indizio nel monolingua, riepilogo dei premi e interfaccia aggiornata nelle quattro lingue. I progressi e le sessioni precedenti restano compatibili.

Il livello di gioco e i traguardi descrivono l’attività nel gioco; non rappresentano una certificazione linguistica. Verifica della release limitata ai nuovi flussi e ai layout principali per mantenere rapido il lavoro.

## 6.1.0 — 13 ottobre 2026

- Quattro percorsi monolingua, uno per ogni lingua: frasi abbinate a indizi nella stessa lingua, con progressi distinti dai dodici percorsi bilingui. Accesso diretto dalla home e dalle Impostazioni.
- Due ingressi: dall’alfabeto per chi inizia a leggere oppure dalle frasi per chi sa già leggere. Saltare una lezione non la segna come completata.
- Alfabeto trasformato in un percorso di 45 lezioni e 294 elementi, con sessioni di massimo sei esercizi e progressi separati per riconoscimento, scrittura e ascolto.
- Italiano: 21 lettere, cinque lettere dei prestiti, accenti, C/G/H, gruppi di lettere, doppie e apostrofo. Inglese: 26 lettere, nome e suono, vocali, gruppi consonantici e parole irregolari.
- Russo: 33 lettere, somiglianze con il latino, е/ё, и/й/ы, segni morbido e duro, accento. Arabo: 28 lettere, forme collegate, sei lettere che interrompono il collegamento, vocali brevi e lunghe, sukun, shadda, tanwin, hamza e varianti.
- Tastiere virtuali, direzione RTL, salvataggio della sessione e delle risposte, importazione/esportazione e contenuti disponibili offline.
- Negli esercizi di alfabeto accenti e vocali arabe vengono valutati senza essere eliminati. Risposte assistite ed errori richiedono una nuova prova autonoma. L’ascolto viene registrato solo dopo una riproduzione riuscita.

I nuovi audio di lettere e parole usano una voce della lingua sul dispositivo, se disponibile; gli esercizi visivi restano accessibili. Non sono inclusi nuovi MP3 arabi. La tastiera non valuta la grafia manoscritta o la pronuncia dell’utente.

## 6.0.3 — 13 ottobre 2026

- Pubblicazione sull’account GitHub matteoawi: repository matteoawi/parola e sito https://matteoawi.github.io/parola/.
- Conservati tutti i commit precedenti. Per trasferire i progressi tra indirizzi usare esportazione e importazione nelle Impostazioni.

## 6.0.2 — 13 ottobre 2026

- Nome del repository corretto in florame-ai/parola e indirizzo GitHub Pages corretto in https://florame-ai.github.io/parola/.
- Cronologia Git e progressi compatibili conservati. Il nuovo indirizzo ha un salvataggio distinto: per trasferire una partita esportarla dal vecchio indirizzo e importarla nelle Impostazioni.

## 6.0.1 — 13 ottobre 2026

- Prima pubblicazione del gioco su GitHub Pages, con sorgenti nel repository pubblico florame-ai/parola-mahjong e ramo principale master.
- Versione visibile nel gioco e changelog pubblico raggiungibile dal piè di pagina.
- Ricostruzione dell'edizione ospitata con i 566 MP3 disponibili incorporati, manifest per l'installazione e percorsi relativi alla cartella del gioco.
- Cache aggiornata alla versione 6.0.1, con aggiornamenti pubblici disponibili anche dopo il caricamento offline.
- Ricostruzione compatibile con Windows grazie alla lettura esplicita dei sorgenti UTF-8.
- Conservati i progressi e la compatibilità con i salvataggi v5/v6 sullo stesso indirizzo.

L'audio MP3 arabo non è incluso: per l'arabo il gioco usa una voce del dispositivo, se disponibile. Un cambio di indirizzo richiede l'esportazione e l'importazione manuale dei progressi.

## 6.0.0 — versione ricevuta prima della pubblicazione

- Cinque modalità per unità, compresa Scrivi e abbina.
- Ripasso con scadenze conservate quando si risponde in anticipo.
- Copia di recupero dei salvataggi e importazione/esportazione dei progressi.
- 24 unità e 12 direzioni di apprendimento tra italiano, inglese, arabo e russo.
