# Parola 6.8.0 — Tessere, zoom e feedback

Le tessere hanno ora dimensioni di base coerenti: frasi 120 × 148 px, alfabeto 108 × 132 px, parole 104 × 124 px. Lo zoom scala insieme geometria, testo e comandi. Avorio per il contenuto da imparare, lilla per l’indizio; le tessere bloccate mantengono un testo leggibile. Il testo lungo si riduce nella singola tessera invece di allungare tutto il tavolo.

La vista iniziale privilegia la lettura, con scorrimento interno quando necessario. Vista intera considera entrambe le dimensioni del contenitore. Due dita ingrandiscono e riducono; un dito sposta il tavolo. I pulsanti − / + funzionano anche senza gesti, mostrano la percentuale e arrivano fino al 220%. Su desktop si può usare anche Ctrl/⌘ + rotella. Il gesto non attiva le tessere. Lo zoom resta durante le azioni e viene ricalcolato al cambio dello spazio disponibile, anche aprendo la tastiera.

Nove effetti di gioco sintetizzati con Web Audio: selezione, coppia, serie, errore, indizio, mescolamento, sblocco, annullamento e vittoria. Un solo AudioContext riutilizzato, volume contenuto, nodi disconnessi dopo la nota, sospensione in background. La preferenza Effetti audio li disabilita. Nessun nuovo file audio e nessuna modifica al provider delle voci.

Le coppie raggiungono il punteggio; il contatore reagisce e le tessere appena liberate ricevono un breve segnale. Le animazioni conservano la geometria anche con zoom; movimento ridotto senza volo, oscillazione o rimbalzo. SVG Lucide originali conservate.

Verifiche mirate: nove test Node per geometria, alfabeto, velocità della voce, limiti dello zoom e suoni; sei gruppi Chromium per telefono 390 × 844 e 360 × 740, desktop 1360 × 950, pinch reale CDP, pan con un dito, coppie, muto, alfabeto, tastiera Invia, movimento ridotto e limite 220%. Report locale e pubblico separati. Le presentazioni obbligatorie restano attive e vengono attraversate nello smoke.
