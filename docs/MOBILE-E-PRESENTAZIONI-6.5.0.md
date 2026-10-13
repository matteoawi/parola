# Parola 6.5.0: mobile, continuità e parole introdotte

La home mobile presenta una sezione alla volta: Gioca, Percorso e Oggi. La navigazione principale è in basso, con etichette e aree di tocco. Sfida e prossima lezione restano sulla prima sezione; corso e obiettivi sono raggiungibili senza una lunga pagina iniziale. Regole, esempi, capitoli e catalogo dell’alfabeto usano sezioni espandibili. Sul desktop i tre blocchi della home restano visibili insieme.

## Una pagina di partita stabile

Su telefono la partita occupa la schermata disponibile e lascia i comandi in vista. Lo scorrimento eventuale appartiene al contenitore del tavolo, soprattutto con molti elementi, frasi monolingua lunghe o parole su più righe. Il testo non viene tagliato per farlo entrare: l’altezza delle tessere si adatta al materiale. La regola è disponibile dal pulsante informativo. Le aree sicure del dispositivo sono considerate.

Il rendering conserva le tessere identificate per contenuto e il contenitore di scorrimento. Se uno spostamento viene interrotto, il successivo parte dalla posizione effettivamente visibile, con la velocità precedente. La raccolta di una coppia usa copie non interattive che viaggiano al punteggio e poi vengono rimosse. I tocchi restano disponibili durante il movimento; non si attende la fine dell’animazione per accettare la scelta successiva. Con movimento ridotto si mantiene un feedback breve senza traiettorie delle tessere.

## Prima presentare, poi giocare

La precedente introduzione mostrava soltanto l’unità scelta: i formati più grandi potevano aggiungere vocaboli o altre unità, e spedizioni e inviti potevano aprire direttamente il tavolo. Ora il tavolo è preparato una sola volta con il suo seme e il suo insieme effettivo di elementi; il gioco parte dopo la presentazione di ogni elemento ancora mancante.

Ogni scheda mostra il testo nella lingua di studio, la traduzione o l’indizio monolingua e le parole della frase. La conferma registra la presentazione esatta nel percorso linguistico. Il tavolo conserva il materiale e la disposizione già preparati: la presentazione non rigenera una partita diversa. I cinque modi e tutti gli ingressi di partita condividono questo controllo. I ripassi aprono tavoli attraverso lo stesso ingresso; i piccoli esercizi per ottenere un aiuto usano materiale già introdotto nel tavolo o nell’unità.

Il registro introduced è separato da seen, memoria e missioni. Avere aperto o giocato un vecchio tavolo non dimostra una presentazione. Un salvataggio precedente conserva i propri progressi e, alla ripresa, presenta il materiale mancante prima di continuare la stessa sessione, quando il testo del tavolo è ancora coerente con il corso. Tessere salvate con testo o lingua alterati non vengono accettate come una partita valida; i progressi del corso rimangono disponibili. Importazione ed esportazione conservano il registro, con confronto esatto del contenuto: cambi di parole, significato, indizio o percorso non passano grazie a una vecchia firma.

Anche l’alfabeto presenta i modelli della coda e le forme che possono comparire tra le risposte, prima di riconoscimento, scrittura o ascolto. Il modello letto prima dell’esercizio è studio iniziale; richiedere un modello durante la prova continua a essere registrato come aiuto. La presentazione non assegna XP, missioni, timbri del passaporto o padronanza. Il gioco può assicurare che il materiale sia stato mostrato e confermato; non misura se il giocatore lo abbia effettivamente imparato.

## Evidenze e limiti

Tre test puri: migrazione e unione delle presentazioni, invalidazione per cambi di contenuto/percorso, continuità della funzione di movimento. Undici gruppi Chromium mirati: tre sezioni, tavolo effettivo, ripresa e presentazioni persistenti, cinque modalità, alfabeto, nuovo invito e vecchia sessione, nodi delle tessere e scorrimento conservati, animazione delle coppie, controllo mobile, RTL e movimento ridotto, desktop.

Viewport emulati: 390×844, 320×667, 844×390 con input touch configurato, desktop 1360×950. La home iniziale misurata è circa 849 px; i comandi della partita sono dentro il viewport. Un tap sintetico abbina una coppia tramite gli eventi reali del browser; uno swipe sintetico Chromium scorre un tavolo ampio anche durante un aggiornamento, senza aprire una tessera di scrittura. Il contenitore e il suo elemento padre restano gli stessi. Il report distingue questi controlli da una misura delle prestazioni su hardware mobile reale. Due passaggi visivi limitati, con correzione delle etichette e spaziatura; tre avvisi del rilevatore appartengono ai bordi delle tessere e dei comandi storici, mantenuti nel sistema visivo.

I verificatori storici possono confermare automaticamente le nuove schede grazie a scripts/legacy-introductions.cjs, per mantenere il loro focus sui comportamenti precedenti. Questa release usa scripts/smoke-mobile-6.5.cjs per verificare il passaggio obbligatorio senza quel supporto. La suite completa storica non è stata rieseguita.
