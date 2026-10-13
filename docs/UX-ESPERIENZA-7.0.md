# Parola 7.0 — specifica dell’esperienza

Revisione 1 · 13 ottobre 2026 · approfondimento del [piano generale](PIANO-ESPERIENZA-7.0.md). Proposta da prototipare; il sito attuale resta 6.10.2.

## Priorità

1. Capire che cosa fare e quali tessere si possono usare.
2. Giocare una partita consistente, con profondità spaziale e scelte reali.
3. Trovare un aiuto e recuperare senza perdere il lavoro.
4. Continuare senza tornare a configurare l’attività.
5. Capire che cosa si è incontrato, che cosa si è ricordato e che cosa va ripassato.

La completezza è la copertura di questi passaggi, comprese le difficoltà, non il numero di pannelli e ricompense aggiunti. Colori e stile cartoon devono rendere il tavolo più leggibile e invitante.

## 1. Schermate con un compito preciso

| Schermata | Informazione dominante | Azione principale | Accessi secondari |
| --- | --- | --- | --- |
| Primo ingresso | Lingua da allenare, lingua degli indizi e ingresso lettere/frasi | Inizia | Cambia le scelte prima dell’avvio |
| Home | Tavolo salvato oppure prossima missione; un solo stato di avanzamento sintetico | Riprendi / Gioca | Percorso, Gioco libero, Ripasso quando pronto |
| Percorso | Capitolo attuale, obiettivo prossimo e tappe vicine | Gioca questa missione | Rivedi capitoli, cambia punto d’ingresso |
| Introduzione | Una novità con disegno/esempio, parola o segno e ascolto disponibile | Avanti; nell’ultima scheda Gioca | Riascolta / Torna |
| Partita | Obiettivo, pezzi e loro disponibilità | Mossa sul tavolo; Invia frase quando pertinente | Modello, Indizio, Annulla, Altro |
| Riepilogo | Tavolo completato, ricompensa e una scoperta concreta | Continua | Rigioca / Rivedi risultati |
| Collezione | Materiale incontrato e stato del ricordo | Apri parola o lettera | Cerca, filtra, avvia un ripasso |
| Profilo | Preferenze e progressi del percorso selezionato | Azione della sezione aperta | Lingue, audio, salvataggi, accessibilità |

Home: eliminare le schede Gioca/Impara/Progressi interne, i doppioni della navigazione e la competizione fra checklist, spedizioni e sfide. Un eventuale invito giornaliero resta sotto l’azione principale, senza modali automatiche.

Percorso: la mappa si muove al capitolo attuale; dettagli di tutte le 24 unità non occupano la prima schermata. Mostrare titoli comunicativi come Prime conversazioni, con sottotitolo concreto della missione. La struttura esatta dei capitoli dipende dal materiale effettivamente disponibile.

Gioco libero: tre scelte in una sola superficie — attività, dimensione e argomento/materiale. Preferenze conservate, anteprima della sagoma e un solo Gioca. Modalità non disponibile spiegata prima dell’avvio, per esempio mancanza di audio. Dopo l’avvio non ripetere la configurazione.

## 2. Contratto della schermata di gioco

Disposizione mobile, dall’alto al basso:

1. Salva ed esci, obiettivo breve e avanzamento del tavolo.
2. Frase da completare o raccolta provvisoria, solo quando necessaria.
3. Tavolo: prende tutto lo spazio restante, con livelli, bordi e pezzi liberi leggibili.
4. Barra fissa degli aiuti. Zoom +/−/Centra ancorato al tavolo, non nel menu della pagina.

La navigazione globale scompare durante la partita; Salva ed esci riporta sempre alla home con Riprendi. Punteggio e combo sono piccoli segnali di gioco: non sostituiscono l’obiettivo. Un solo indicatore rappresenta il tavolo; un eventuale obiettivo linguistico ha nome e unità propri, senza barre duplicate di significato ambiguo.

Il testo dei pezzi rimane nella lingua studiata. La lingua degli indizi compare nella fascia di spiegazione quando serve; evitare un bollino di lingua ripetuto su ogni tessera di un tavolo monolingue. Etichette grammaticali visibili nel laboratorio solo se aiutano la costruzione e spiegabili al tocco: nome/verbo/aggettivo, senza codici interni.

Non mostrare più di un messaggio contestuale alla volta. Un errore non aumenta l’altezza della pagina né copre Modello. Dettagli, audio e motivo del blocco condividono una fascia di dettaglio; il tavolo non viene ricostruito a ogni aggiornamento del testo.

### Tessera: contenuto e stato

| Stato | Aspetto e comportamento |
| --- | --- |
| Libera | Faccia leggibile, bordo distinto, area di tocco della superficie visibile |
| Bloccata lateralmente | Aspetto attenuato ma testo leggibile; il tocco spiega quali lati sono chiusi |
| Coperta | Si vede il bordo inferiore quando fisicamente esposto; non si può selezionare attraverso un pezzo superiore |
| Selezionata | Contorno e lieve sollevamento; secondo tocco annulla la selezione |
| Raccolta provvisoria | Evidenziata nella frase e riservata nella posizione originale; niente rifornimenti o spostamenti del tavolo |
| Raccolta confermata | Pezzo rimosso, stack scoperto e disponibilità aggiornate |
| Indicata da un aiuto | Segnale distinto dalla selezione, con spiegazione breve |

Una tessera è un pezzo, non un piccolo pannello con più bottoni. Il tocco principale serve a giocare. Ascolta la selezione usa un comando visibile nella fascia di dettaglio. Per il riconoscimento alfabetico restano segno dominante, nome ed esempio, come richiesto; questi tre contenuti devono funzionare a dimensione reale senza forzare miniature illeggibili.

Il modello geometrico distingue disponibilità confermata e disponibilità provvisoria nella frase: una raccolta temporanea può liberare i pezzi sotto per continuare la costruzione; annullarla ripristina disponibilità e ordine precedenti. Se si toglie o si riordina un elemento intermedio, ricalcolare la sequenza di raccolta e ripristinare l’eventuale suffisso non più legalmente raccoglibile, spiegandolo. Riordinare parole già raccolte cambia l’ordine linguistico senza inventare una nuova sequenza di rimozione geometrica. Questa distinzione va verificata nel prototipo del laboratorio.

## 3. Aiuti senza ricerca e senza sorprese

Barra mobile: **Modello · Indizio · Annulla · Altro**. Pulsanti con icona e parola. Invia frase resta accanto alla raccolta; la tastiera ha il suo Invia, con la stessa funzione di verifica e senza pulsanti che producano esiti diversi.

- Modello: nella costruzione mostra un esempio completabile con i pezzi rimasti, oppure una continuazione del prefisso. Nel cloze mostra la frase completa; in scrittura mostra la risposta; nelle coppie mostra la relazione da cercare. Stessa posizione, contenuto coerente con l’attività.
- Se il prefisso non ha continuazioni supportate, spiegare dove si interrompe il modello e offrire Annulla l’ultima parola; non scambiare pezzi né sostituire la frase automaticamente.
- Indizio: prima spiega una mossa utile; un secondo passo può evidenziare i pezzi. Non fa la mossa da solo.
- Annulla: torna all’azione precedente, compresa una coppia rimossa, ripristinando pezzi, risultati e punti associati senza duplicare premi. L’ultima frase inviata è annullabile mentre il tavolo è aperto; il riepilogo chiude la partita.
- Altro: regola, rimescola, preferenze audio e vista. Uno stallo offre anche Rimescola direttamente nella fascia di stato.

Un aiuto segna i materiali interessati come assistiti, non tutti gli elementi del tavolo indiscriminatamente. Il punteggio può premiare la partita, ma la prova indipendente deve essere riproposta in seguito. Un modello mostrato non fa apparire Imparato.

## 4. Laboratorio: meno interruttori, più controllo

Una scelta Coppie/Frasi visibile sopra il tavolo. Per la missione il modo iniziale è già selezionato; nel gioco libero si conserva l’ultima preferenza.

In Frasi: raccogli parole → vedi la frase → invii quando vuoi. Invia disabilitato solo se vuota o durante la verifica, non perché la frase non corrisponde al prefisso di un modello: il giocatore deve poter sperimentare. Nessuna lista di tre risposte tra cui scegliere.

La verifica distingue:

- Accettata: risultato e bonus breve; i pezzi vengono consumati; il tavolo resta visibile.
- Errore riconoscibile: indicare il punto e la regola pertinente, lasciando frase e selezione modificabili. Esempio curato: in Я читаю книга evidenziare la forma dell’oggetto e proporre il modello con книгу.
- Fuori repertorio: Questa costruzione non è ancora supportata; puoi modificarla o vedere un modello. Non attribuire una diagnosi grammaticale inventata.

Passare a Coppie con una frase aperta la conserva come bozza e restituisce i pezzi al tavolo, con un annuncio breve. Tornando a Frasi si ripristina solo se tutti i pezzi e la sequenza sono ancora disponibili; altrimenti la bozza testuale resta visibile e indica che cosa va raccolto di nuovo. Il cambio non cancella il lavoro senza dirlo.

Vittoria di gioco e obiettivo linguistico sono separati. Nel laboratorio libero puoi svuotare il tavolo con coppie e frasi. In una missione di costruzione, l’obiettivo linguistico viene dichiarato prima, per esempio costruire due frasi diverse. Se si libera tutto senza raggiungerlo, riconoscere il tavolo completato e proporre la pratica mancante come prossimo passo; non assegnare una competenza non dimostrata e non togliere la vittoria di gioco.

## 5. Continuità dell’apprendimento

- Ogni materiale giocabile, inclusi distrattori, flessioni e connettivi, deve avere un’introduzione effettivamente completata. La sola esposizione in un errore non vale come introduzione.
- All’inizio di una missione mostrare soltanto le novità mancanti. Materiali già incontrati restano rivedibili attraverso Modello o Collezione.
- Introduzioni brevi con contenuto reale: immagine o situazione, forma scritta, significato/indizio e pronuncia quando disponibile. Niente muri di teoria prima del gioco.
- Riconoscere una lettera, ricordare una parola, completare una frase e scriverla sono capacità distinte. La mappa non chiede tutte le modalità per forza a ogni unità; le sceglie in base all’obiettivo e alle prove mancanti.
- Il ripasso riutilizza materiali dovuti nello stesso linguaggio di gioco. Non compare come interruzione obbligatoria durante una partita né cambia una missione già avviata.
- Collezione: Incontrata, Da ripassare, Ricordata in autonomia. La definizione di quest’ultimo stato deve dipendere da verifiche indipendenti e differite, non da una singola coppia con modello.
- Nel monolingua, contesto e immagini devono spiegare il compito senza richiedere la traduzione nella lingua di supporto. Lingua dell’interfaccia e lingua studiata restano scelte distinte.

## 6. Stati necessari per un’esperienza completa

| Caso | Informazione e recupero |
| --- | --- |
| Pezzo bloccato | Coperto dall’alto / chiuso sui lati; evidenziare chi lo blocca senza svelare contenuti nascosti |
| Coppia errata | Relazione non corretta, pezzi ancora disponibili; selezione ripristinabile, nessuna vita persa |
| Nessuna mossa | Nessuna mossa disponibile; Annulla oppure Rimescola esplicito |
| Frase errata / non supportata | Esiti distinti, bozza conservata, modello coerente con il tavolo |
| Audio assente o fallito | Disponibilità per il testo; Riprova quando pertinente oppure pratica visiva equivalente. Ascolto non certificato senza riproduzione riuscita |
| Ricarica / chiusura | Ripresa di tavolo, modalità, bozza, aiuti e inquadratura, senza nuovo tutorial |
| Cambio lingua | Salvare il percorso corrente, aprire il progresso della nuova lingua e mostrare l’eventuale partita salvata di quella lingua |
| Nuovo tavolo con uno aperto | Preservare la sessione precedente in un archivio recuperabile oppure avvisare della sostituzione con recupero; mai perdita silenziosa |
| Offline | Continuare con materiali disponibili; segnalare i soli audio mancanti, evitando blocchi generici del gioco |
| Salvataggio fallito | Avviso persistente ma contenuto, Riprova / Esporta progresso; la partita corrente resta in memoria |
| Collezione vuota | Qui compariranno le parole incontrate; Gioca apre la prima missione |
| Nessun ripasso pronto | Il ripasso arriverà quando serve; Continua il percorso, senza esercizi inventati solo per riempire la schermata |
| Salvataggio 6.x | Riprendi con le regole originali oppure conserva e avvia una nuova sessione 7.0, senza conversione a metà tavolo |

Modali solo per impostazioni complesse o conseguenze che richiedono una decisione. Errori, regole brevi e aiuti stanno vicino al compito. Conferme superflue non interrompono azioni reversibili.

## 7. Semplicità visiva e mobile

La palette cartoon proposta nel piano resta ricca, ma ogni schermata ha una gerarchia: fondale tranquillo, un colore dominante dell’ambiente, colori semantici coerenti per selezione e feedback. Niente colori casuali per ogni parola che suggeriscano abbinamenti inesistenti. Testi scuri su facce chiare; bordi degli strati più forti delle decorazioni. Una famiglia di caratteri per l’interfaccia con font adatti alle scritture, pochi pesi e ruoli tipografici definiti.

Due forme principali di tessera, un sistema di pulsanti, un pannello degli aiuti e un riepilogo riutilizzabile. Evitare eccezioni visive per ciascuna modalità. Movimento e audio rinforzano una mossa, non trattengono il controllo del tavolo dopo la conferma.

Su mobile: safe area, viewport effettiva con tastiera, orientamento e testo ingrandito fanno parte del layout. Il tavolo si sposta e si ingrandisce dentro il proprio spazio. Se una frase diventa lunga, la raccolta ha spazio limitato ed espandibile; Invia e aiuti restano raggiungibili. Vista dettagliata e lettura accessibile rendono disponibile l’intero testo, senza troncamenti che cambino il significato.

Tocchi sul pezzo visibile, drag del tavolo e pinch hanno soglie e comportamento separati. Il dettaglio non si apre accidentalmente durante lo spostamento. Zoom e indicazioni di blocco funzionano anche con controlli espliciti. Navigazione da tastiera e screen reader permettono selezione, audio e aiuti con nomi coerenti; non si annunciano ad alta frequenza animazioni o contatori intermedi.

## 8. Cosa tagliare, cosa mantenere

| Elemento | Decisione proposta |
| --- | --- |
| Due livelli di navigazione della home | Sostituire con tre destinazioni stabili e accessi contestuali |
| Selezione ripetuta di formato/modalità | Nel percorso automatica; nel gioco libero una sola configurazione |
| Sei tessere come partita ordinaria | Eliminare dal percorso normale; dimostrazione breve dentro un tavolo/tutorial consistente |
| Tante statistiche prima di giocare | Sintesi della posizione attuale; dettagli in Collezione/Profilo |
| Nuovi sistemi di monete, vite, negozi e classifiche | Fuori dal primo rilascio 7.0: non risolvono il problema di continuità |
| Modello e Indizio | Sempre visibili e gratuiti |
| Immagini, ascolto, scrittura, monolingua | Conservare e integrare nella stessa esperienza |
| Sfide e partite condivise | Conservare come accesso secondario, con layout e regole riproducibili |
| Import/export e progressi esistenti | Conservare, con migrazione verificata |
| Scelta del provider audio | Lavoro separato; nessun nuovo servizio implicito nel redesign |

## 9. Criteri verificabili del prototipo

Il primo prototipo deve essere una sequenza interattiva dall’ingresso al secondo tavolo, con parole reali, tre sagome, una coppia che scopre un pezzo e un aiuto utilizzabile. Le due varianti delle tessere si confrontano sullo stesso contenuto e sulla stessa sagoma.

Obiettivi di progetto, da misurare e non da dichiarare già raggiunti:

- Dalla home al tavolo salvato: un’azione.
- Da una vittoria alla preparazione del prossimo tavolo: un’azione, senza riconfigurazione.
- Modello e Indizio raggiungibili senza aprire menu.
- Un nuovo giocatore sa indicare un pezzo libero, un pezzo coperto e il motivo del blocco; una breve prova osservata deve verificare la comprensione.
- Nessuno scroll della pagina necessario per raggiungere Invia o gli aiuti durante il gioco; pan del tavolo e scroll interno della frase restano disponibili quando necessari.
- Nessun contenuto nuovo prima dell’introduzione; nessun audio simulato nella prova finale di ascolto.
- Ogni recupero nella matrice precedente conserva il lavoro o spiega come recuperarlo.
- Risultato di gioco, assistenza e verifica del ricordo non vengono confusi nel riepilogo.

Usare prove brevi con giocatori principianti e persone che conoscono già il Mahjong, oltre ai controlli tecnici. Rilevare passaggi inutili, primi tocchi sbagliati, tempo per trovare l’aiuto e capacità di continuare. Un calo degli errori di navigazione indica miglioramento UX; apprendimento duraturo richiede verifiche successive e non si deduce da animazioni, XP o completamento di una partita.
