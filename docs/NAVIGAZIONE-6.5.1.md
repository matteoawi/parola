# Parola 6.5.1 — Navigazione e coerenza

Il sito ufficiale è https://matteoawi.github.io/parola/, dal repository https://github.com/matteoawi/parola. Il precedente indirizzo florame-ai.github.io/parola-mahjong/ non è il sito pubblicato da questo repository.

## Collegamenti corretti

- Indietro e Avanti del browser seguono le schermate interne. I pulsanti Indietro delle pagine secondarie usano la provenienza effettiva, con home come recupero se manca la cronologia.
- Si recuperano la sezione Gioca/Percorso/Oggi, lo scorrimento, la lezione, il contesto della sfida e il comando che aveva il focus. Gioco libero e ripasso mantengono la propria sezione di navigazione anche nelle lezioni.
- Prima di lasciare una partita, progressi e risposte vengono salvati e la riproduzione audio interrotta. Avanti riprende soltanto la sessione ancora corrispondente, passando sempre dal controllo delle presentazioni.
- Le presentazioni completate vengono sostituite dal gioco nella cronologia; il riepilogo sostituisce la partita conclusa. Nessun ritorno a un tavolo completato o a una schermata di presentazione ormai vuota.
- Una vecchia schermata di un altro percorso linguistico recupera la home del percorso attuale. Vecchie sessioni dell’alfabeto non mostrano sotto un vecchio titolo la nuova sessione di un’altra lezione.
- Rigioca conserva il seme e il formato del tavolo, il bersaglio di un invito e il contesto giornaliero o della spedizione. Il replay di una tappa già conclusa non fa avanzare nuovamente la spedizione.
- Spedizione e prima vittoria usano il proprio pulsante principale di continuazione, senza proporre contemporaneamente una missione ordinaria incoerente.
- Etichetta Indietro generica in tutte e quattro le lingue: non promette un ritorno al percorso quando la provenienza è il riepilogo o le impostazioni. Il changelog dell’edizione offline usa l’indirizzo pubblico, evitando un file locale mancante.
- Gli inviti monolingua impostano anche la lingua dell’interfaccia. Anche l’anteprima delle impostazioni allinea lingua di supporto, interfaccia e audio al target monolingua prima di salvare. Esc chiude e rimuove i dialoghi, restituisce il focus e annulla gli aiuti o la scrittura pendenti quando pertinente.

## Limiti precisi

La cronologia dettagliata vive nella scheda aperta, con al massimo 100 contesti per limitare la memoria. Dopo una ricarica, le vecchie voci recuperano la home e i tavoli restano riprendibili dai salvataggi persistenti. Gli inviti condivisi restano gli URL portabili; la cronologia interna non crea deep link pubblici delle schermate. Il file offline rimane compatibile e incorpora gli stessi sorgenti.

## Verifica locale

- Nove gruppi Chromium con azioni sui pulsanti reali, presentazioni reali, cronologia, focus, invito monolingua completato e rigiocato sullo stesso tavolo, condivisione, passaporto e seconda tappa di spedizione: `local-smoke-navigation-6.5.1.json`.
- Undici gruppi di regressione per mobile, tutte le modalità, RTL, vecchi salvataggi, scorrimento e presentazioni obbligatorie: `local-smoke-mobile-6.5.1.json`.
- Tre test mirati per introduzioni, invalidazione del materiale e movimento con velocità conservata.
- Ispezione visiva riunita su lezione mobile 390 px e home desktop 1360 px: controlli leggibili, nessuno scorrimento orizzontale e focus sul titolo.
- Rilevatore UI: soltanto tre avvisi preesistenti sui bordi delle tessere nella CSS storica; identità visiva mantenuta, nessuna nuova decorazione.

La verifica riguarda Chromium emulato, non un collaudo su ogni dispositivo reale.

## Pubblicazione verificata

Commit funzionali `15fde04` e `990ee5d`, inviati a master dopo fetch/merge senza modifiche concorrenti. GitHub Pages ha completato la build del commit `990ee5d`. Sul sito ufficiale, tutti e nove i gruppi di navigazione sono passati: `smoke-navigation-6.5.1.json`. Verificati versione pubblica, azioni reali, ritorni, riprese, lingue, dialoghi, invito, condivisione, passaporto e continuazione della spedizione; nessun errore JavaScript nello smoke. Non è stata ripetuta la suite storica completa.
