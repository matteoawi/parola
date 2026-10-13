# Parola 6.6.0 — Alfabeto Mahjong e tastiere esclusive

La richiesta attiva riparte soltanto dal Mahjong per tutti gli esercizi dell’alfabeto e dallo switch delle tastiere. Non aggiunge nuove immagini, parole illustrative o il successivo schema lettera uguale lettera, perché queste estensioni sono state ritirate. Include la correzione della velocità audio e le indicazioni per una futura API gratuita, richieste durante il lavoro.

## Gioco

Le tre abilità utilizzano la stessa geometria del Mahjong delle frasi, con fino a sei coppie, tessere sovrapposte e almeno un lato libero. Riconoscimento: abbina il segno al suo indizio già presente nel corso. Ascolto: ascolta la tessera sonora prima di abbinare il segno. Scrittura: digita il segno per sbloccare la tessera, poi abbina la coppia libera. Non restano quiz a scelta multipla come esercizi dell’alfabeto.

Geometria e associazioni del tavolo, tessere rimosse, risposte, sblocchi e aiuti sono salvati per lingua e abilità. Indizi e mescolamento registrano pratica assistita. La padronanza viene aggiornata quando si libera la coppia; digitare soltanto il modello non assegna risultati. Vecchie risposte completate migrano al tavolo senza nuovi premi.

Tutto il materiale del tavolo passa dalla presentazione, compresa la ripresa. Le coppie abbinate possono essere completate in ordine libero: la presentazione dei materiali rimanenti usa i loro identificativi e non una posizione sequenziale. I testi delle tessere derivano dai dati canonici del corso.

## Tastiere

Lo switch è disponibile nella scrittura dell’alfabeto, nella scrittura delle frasi e negli aiuti. La scelta viene salvata. Tastiera del gioco: campo readonly con inputmode none, lettere complete, maiuscole, spazio, cancellazione e segni. Tastiera del dispositivo: campo editabile con inputmode text e tastiera del gioco rimossa. Cambiare mantiene la risposta e la selezione del testo. Sul telefono l’etichetta identifica esplicitamente la tastiera del telefono; sul desktop indica quella di sistema.

Il layout russo usa righe cirilliche. I controlli e la verifica restano raggiungibili nel viewport mobile emulato 390×844. La verifica automatica conferma gli attributi che impediscono la tastiera software e l’esclusività dei due controlli; non simula il pannello nativo di ogni telefono fisico.

## Audio attuale

La riproduzione dei suoni esistenti reimposta defaultPlaybackRate e playbackRate dopo caricamento e avvio, reagisce a un reset del lettore e applica preservesPitch anche con prefissi WebKit. Web Audio segue la frequenza nativa del dispositivo invece di imporre 24 kHz. La velocità non può superare 1× attraverso il player.

Misura locale Chromium: file di 2,471791 secondi, rate effettivo 0,8 e mantenimento del tono, riproduzione di circa 3,17 secondi inclusa la partenza. Non è una verifica della qualità della voce su tutti i dispositivi. I 566 suoni precedenti restano invariati: nessun nuovo MP3 o pacchetto naturale viene pubblicato. I temporanei rallentati sono stati esclusi dal progetto pubblico. Le lettere russe non hanno file dedicati: l’ascolto richiede una voce russa del dispositivo; senza una voce corretta la modalità resta indisponibile. Il test del flusso di ascolto usa un provider simulato per verificare il blocco prima di un ascolto riuscito.

## API gratuita proposta, ancora da collegare

Gemini 2.5 Flash Preview TTS ha un piano gratuito con quote. Crea una chiave in Google AI Studio e controlla lì i limiti del progetto. Cloudflare Workers Free può ospitare il proxy, con 100.000 richieste giornaliere incluse; la quota TTS rimane separata. La chiave va nel secret del Worker. Il gioco richiederà l’audio delle sole tessere del tavolo e terrà i buffer nel browser: nessun nuovo file da distribuire nel repository. Dopo il primo caricamento il buffer è riutilizzabile; la prima generazione ha latenza di rete. Servizio e qualità vanno provati prima di sostituire le voci attuali.

Fonti ufficiali consultate il 13 ottobre 2026:
- https://ai.google.dev/gemini-api/docs/pricing#gemini-2.5-flash-preview-tts
- https://ai.google.dev/gemini-api/docs/rate-limits
- https://ai.google.dev/gemini-api/docs/api-key
- https://ai.google.dev/gemini-api/docs/speech-generation
- https://developers.cloudflare.com/workers/platform/pricing/

## Verifica

Quattordici test puri mirati superati: tutte le 45 lezioni nelle tre abilità, soluzione geometrica, salvataggi, migrazione, normalizzazione delle lingue, presentazioni e reset della velocità. Undici gruppi Chromium locali per tavoli in quattro lingue, tessere bloccate, ripresa, scrittura, ascolto, completamento, tastiera nelle frasi, riproduzione 0,8× e desktop. Report `local-smoke-alphabet-6.6.0.json`.

Immagini `alphabet-mobile-6.6.0.png`, `keyboard-mobile-6.6.0.png`, `alphabet-desktop-6.6.0.png`. I tre avvisi sui bordi storici delle tessere sono mantenuti; le nuove SVG continuano a provenire dagli originali Lucide. Nessuna suite storica completa ripetuta.
