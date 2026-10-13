# Parola 6.9 — Interfaccia e percorso mobile

Il gioco mantiene l’identità di Parola: tessere in avorio e lilla, verde bosco per la navigazione e il tavolo, corallo per il passo successivo, oro per le ricompense. Font Nunito distribuito dal repository Google Fonts con licenza OFL; originale e impronte in assets/fonts. Carattere incorporato nel file offline e incluso nella cache del sito. Tutte le SVG conservano i 36 disegni originali Lucide.

## Dove si trova ogni cosa

- Gioca: prossimo tavolo o ripresa della sessione, ingresso dall’alfabeto, tavolo libero, tre obiettivi giornalieri e sfida del giorno. Le spedizioni e le opzioni di installazione/condivisione stanno nella sezione secondaria espandibile.
- Impara: scelta tra alfabeto, frasi e monolingua, poi capitoli con numero di missioni completate. Il capitolo corrente è aperto; nessun blocco artificiale sugli altri.
- Progressi: livello di gioco e XP reali, ultimi sette giorni di pratica, obiettivi, passaporto delle parole e traguardi. I nove traguardi mostrano anche quanto manca per ottenerli.
- Navigazione principale: Gioca, Tavoli, Ripasso, Parole, Profilo. I percorsi esistenti e i ritorni della cronologia sono conservati.
- Profilo: Lingue, Audio e Dati. Cambiare sezione mantiene la scelta delle voci e rende raggiungibili le quattro lingue, esportazione e importazione.

## Ciclo di apprendimento e ricompense

Ogni nuovo elemento deve attraversare la presentazione prima di apparire sul tavolo. I cinque formati 6, 12, 18, 32 e 52 sono visibili insieme anche sul telefono. La selezione della modalità mostra una sola descrizione; l’avvio resta raggiungibile. Ripresa e replay mantengono le proprietà della sessione.

Le ricompense restano legate alle attività vere. Il calendario legge i giorni registrati, il passaporto legge i richiami autonomi, i traguardi usano gli stessi criteri di assegnazione e visualizzazione. Esploratore accetta i formati da almeno 18 tessere. Un tavolo alfabetico completato registra una sola attività del giorno, anche dopo ripresa/importazione: può completare l’obiettivo del tavolo e concorrere al bonus giornaliero esistente da 30 XP. Il bonus non viene moltiplicato dal rendering, dai replay o dal merge dello stesso salvataggio.

Il riepilogo mette prima XP e avanzamento del livello, poi continuazione e replay. Le parole scoperte sono espandibili. Le cifre e il riempimento della barra animano brevemente il risultato reale; movimento ridotto lascia il valore finale senza spostamenti. Nessun controllo viene bloccato dall’animazione.

## Mobile

Navigazione inferiore con etichette brevi, safe area, tocchi da almeno 44 px nei comandi principali, pannelli compatti e accesso diretto all’azione. L’anteprima decorativa resta separata dal titolo. Il tavolo conserva le proporzioni e lo zoom della 6.8; il contenitore non cattura lo scorrimento programmatico della tastiera.

Nella scrittura alfabetica in orizzontale il tavolo e la tastiera stanno affiancati. Tutte e tre le righe di lettere, i segni, Invia e gli aiuti restano raggiungibili. La vecchia regola CSS sul campo #alpha-answer è stata superata con dimensioni esplicite: Invia è verificato interamente dentro il pannello visibile, con invio reale del segno russo in orizzontale. La tastiera del gioco tiene chiusa quella del dispositivo; lo switch esistente rimane disponibile. L’area Audio conserva le voci del dispositivo preferite nella 6.8.1, il fallback dichiarato e il silenzio degli effetti durante la pronuncia.

## Verifiche

Dodici casi Node mirati superati: nuovi traguardi, calendario e completamento alfabetico, più limiti dello zoom, effetti e selezione delle voci. Sette gruppi Chromium per home, lezioni e ritorni, profilo, completamento alfabetico e bonus, tastiera in verticale/orizzontale con digitazione e invio, ricompensa/replay e desktop/arabo RTL/movimento ridotto. Telefono 390 × 844 e 360 × 740, orizzontale 844 × 390, desktop 1360 × 950. Le presentazioni sono attraversate davvero; il provider vocale è disattivato nel test dell’interfaccia. Nessuna suite storica completa ripetuta.

Ispezione mobile e desktop riunita, una correzione e una conferma. Detector senza segnalazioni nel passaggio sullo scope CSS/app e provenienza delle SVG verificata. Font e licenza controllati con impronte SHA-256. Report locale e pubblico conservati separatamente.
