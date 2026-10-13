# Parola 6.3.0: prima vittoria, spedizioni e inviti

La release rende più immediato iniziare, più chiaro cosa fare dopo una vittoria e più semplice invitare un amico. Il risultato è un gioco pubblicato e utilizzabile; 50 milioni di download resta un’ambizione, non una misura raggiunta o una previsione verificata.

## Un ingresso breve

Chi apre per la prima volta sceglie lingua di studio, lingua delle spiegazioni e ingresso dall’alfabeto o dalle frasi. Scegliere la stessa lingua attiva il monolingua. L’ingresso dalle frasi avvia tre coppie, con un suggerimento iniziale dichiarato e conteggiato come aiuto. Dopo la vittoria, l’azione principale propone la spedizione. I vecchi salvataggi saltano l’introduzione e conservano le sessioni.

## Un viaggio di tre tavoli

Ogni percorso conserva una spedizione corrente. Abbina introduce una nuova unità con tre coppie; Completa richiede di ricostruire le frasi nell’unità successiva; Scrivi e abbina arriva a nove coppie, includendo materiale precedente. Le spedizioni successive seguono le unità raggiunte, fino all’ultimo gruppo disponibile. Il corso rimane di 24 unità: non vengono promesse nuove lezioni infinite.

Ogni vittoria registra un checkpoint e somma il punteggio una volta. Una partita interrotta riparte dal tavolo salvato, altrimenti dal checkpoint. Importazione e unione dei progressi mantengono il checkpoint più avanzato per la stessa spedizione. La prima spedizione completa assegna il nono traguardo; premi giornalieri e XP continuano a seguire le regole della 6.2.

Il passaporto raccoglie 78 frasi e vocaboli distinti per percorso, sbloccati solo da una risposta corretta autonoma registrata in memoria. Le carte scoperte consentono di riascoltare il testo. Questo è un ricordo di una prova riuscita; i ripassi e gli indicatori di consolidamento restano separati.

## Un invito che si può giocare

Il link contiene unità, modalità, percorso linguistico, formato del tavolo, seme e obiettivo. Per i nuovi tavoli il seme riproduce la disposizione iniziale e la selezione delle coppie. Il destinatario vede l’invito anche nel primo avvio; accettarlo apre il tavolo previsto, senza completare una sfida giornaliera al suo posto. Il risultato confronta il punteggio con l’obiettivo proposto.

L’obiettivo è modificabile nel link, quindi non esiste una classifica verificata. Il link non contiene il salvataggio, non invia messaggi automaticamente e non sincronizza le partite tra dispositivi. La condivisione richiede un gesto dell’utente e usa la funzione del browser quando disponibile; altrimenti compare il link da copiare. Riferimento: [MDN, Navigator.share](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share).

## Caricamento e gioco offline

La versione ospitata ha un HTML iniziale di circa 610 kB, rispetto ai circa 5,44 MB della 6.2. Gli MP3 si caricano separatamente: il tavolo precarica i suoni disponibili delle sue lingue, salvo risparmio dati del browser. La pagina e gli audio caricati con successo restano nella cache del service worker. Un audio mai caricato richiede una connessione o una voce disponibile sul dispositivo. La cache è limitata alla cartella del gioco.

Per portare tutti i 566 MP3 disponibili offline, scaricare **Parola-offline.html**, circa 5,48 MB. È un unico file senza dipendenze esterne necessarie per il gioco. Le voci arabe e degli esercizi di alfabeto restano quelle disponibili sul dispositivo. I progressi tra file e sito si trasferiscono dalle Impostazioni mediante esportazione e importazione.

Il pulsante di installazione usa l’evento del browser se disponibile e altrimenti mostra istruzioni. L’interfaccia di installazione dipende dal browser: [MDN, beforeinstallprompt](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeinstallprompt_event). Su iPhone, Safari permette Aggiungi alla schermata Home dal menu di condivisione: [guida Apple](https://support.apple.com/en-lamr/guide/iphone/iphea86e5236/ios). La release pubblica un sito e un file scaricabile; non crea una distribuzione negli store.

## Verifica proporzionata

Sei test mirati coprono checkpoint e unione, link e dati invalidi, timbri, migrazione dei progressi e premi giornalieri. Lo smoke Chromium controlla primo avvio, tre tavoli, checkpoint dopo ricarica, traguardo, passaporto, invito su profilo nuovo, formato mobile, installazione, audio realmente riprodotto senza rete e contenuti incorporati. Due superfici visive controllate: primo avvio desktop e home mobile. Non si ripete la suite completa storica né si dichiara una verifica su ogni browser reale.

Il rilevatore stilistico segnala tre bordi spessi arrotondati nel CSS storico: sono conservati perché appartengono alle tessere e ai comandi esistenti. Non è stato cambiato il sistema visivo del gioco.
