# Parola — piano dell’esperienza 7.0

Revisione 2 · 13 ottobre 2026 · proposta da realizzare, non funzionalità già pubblicate.

La versione del gioco resta 6.10.2. Questo piano riguarda una ricostruzione dell’esperienza, delle tessere e dei gameplay, non una nuova passata di rifinitura dell’interfaccia attuale. La struttura proposta assume un percorso guidato principale con laboratorio libero sempre disponibile; la preferenza tra percorso e gioco libero è stata chiesta all’utente e resta aperta al momento della stesura. Il resto del piano funziona anche invertendo i due accessi.

## 1. Diagnosi concreta

La home combina schede Gioca/Impara/Progressi con cinque voci di navigazione, accessi paralleli all’alfabeto e al tavolo libero, obiettivi e spedizioni. Le selezioni di modalità e dimensione possono ripetersi prima dell’avvio. Il giocatore deve interpretare la struttura del prodotto prima di giocare.

Le modalità non hanno la stessa unità di gioco: coppie e immagini svuotano un tavolo; il cloze cambia tavolo dopo ogni risposta; il laboratorio termina dopo cinque risultati e rifornisce il tavolo fra i round. La geometria c’è, ma la continuità di una partita Mahjong si perde. Il repertorio del laboratorio è finito: 22 parti di frase per lingua, alcune combinabili, non un sistema generale di costruzione grammaticale.

I formati generali includono sei tessere; le immagini hanno solo otto soggetti e arrivano a 16 tessere. L’alfabeto presenta gruppi piccoli, utili didatticamente, ma la quantità di novità viene confusa con la dimensione della partita. Le tessere contengono testo, etichette e audio dentro una superficie piccola; il tavolo compete con istruzioni e comandi per lo spazio mobile. Il verde tenue e le superfici crema non corrispondono alla richiesta di un gioco più colorato e cartoon.

Questa diagnosi deriva dall’implementazione e dalle prove pubbliche della 6.10.2, non da dati di abbandono o da ricerca su giocatori.

## 2. Promessa e continuità

La promessa: impari pochi elementi, li usi per liberare un vero tavolo Mahjong e li ritrovi nelle parole e frasi successive.

Flusso principale:

**Riprendi/Gioca → poche novità → tavolo → risultato breve → prossimo tavolo.**

- Primo ingresso: lingua studiata, lingua degli indizi o monolingua, ingresso dall’alfabeto o dalle frasi. Scelte avanzate dopo la prima partita.
- Home: una sola azione principale, Riprendi se c’è una partita salvata, altrimenti Gioca. Sotto: prossimo traguardo, percorso e laboratorio libero.
- Nessun ritorno obbligato al catalogo per scegliere di nuovo modalità, formato o lezione. Il bottone successivo avvia la preparazione del prossimo tavolo.
- La mappa indica dove sei, che cosa hai già incontrato e che cosa arriva dopo; non obbliga a passare quattro modalità identiche per ogni unità.
- Prima di uscire il gioco salva automaticamente tavolo, selezione, frase incompleta, bozza, zoom e ultimo obiettivo. Al rientro riprendi esattamente da lì.
- Alfabeto → parole → frasi sono tappe dello stesso percorso. Una lettera riconosciuta torna in parole note; una parola torna in frasi, immagini e ascolto.
- Nel monolingua, immagini, situazioni e indizi nella stessa lingua sostituiscono la traduzione. Il principio Mahjong resta identico.

Architettura proposta: tre destinazioni principali **Gioca, Collezione, Profilo**. Gioca contiene percorso, ripresa, ripasso e tavolo libero; Collezione contiene parole, lettere, esempi e traguardi; Profilo contiene lingue, audio, preferenze e salvataggi. Ripasso resta un invito contestuale quando utile, accessibile anche dal percorso. Desktop e mobile hanno gli stessi nomi e lo stesso ordine. Il cambio lingua mostra il progresso pertinente e non mescola i percorsi.

## 3. La partita è il tavolo

Regole visibili e stabili in tutte le attività: tessere sovrapposte, tessere libere solo con un lato aperto, azioni che consumano tessere e liberano quelle sottostanti. Il tavolo resta al suo posto e si svuota progressivamente.

| Formato proposto | Uso |
| --- | --- |
| 16 tessere | Solo tutorial iniziale o sessione breve scelta esplicitamente |
| 24 tessere | Partita breve standard |
| 32 tessere | Partita classica predefinita dopo il tutorial |
| 52 tessere | Partita lunga opzionale |

Sei tessere possono essere una dimostrazione dentro il tutorial, non un livello completo né il formato iniziale del gioco normale. Più tessere non significa presentare 26 novità insieme: proporre inizialmente 3–5 novità, completando il tavolo con elementi già introdotti. Il numero di novità è un parametro separato dalla quantità di tessere. I valori vanno regolati con prove su giocatori, non dichiarati didatticamente ottimali.

Ripetizioni mirate sono possibili, ma i conteggi distinguono tessere e contenuti diversi. Una partita da 32 tessere con tre lettere nuove non viene descritta come 16 lettere imparate. Niente aumento artificiale dei traguardi per copie identiche.

### Forma del tavolo, profondità e leggibilità degli strati

Correzione richiesta dall’utente: oggi non si capisce se ci siano pezzi sotto, e le composizioni sono troppo uniformi. Nel codice i tavoli comuni sono griglie da quattro o cinque colonne con un piccolo blocco superiore; quelli da 32/52 pezzi usano un rettangolo di base e blocchi centrali. Lo scostamento fra livelli è di soli 5 px orizzontali e 6 px verticali. Aumentare ombre e numero di pezzi senza cambiare questa struttura non risolve il problema.

**Composizioni progettate:** creare una biblioteca di sagome, con versioni per 24/32/52 pezzi: tartaruga compatta, farfalla, ponte con vuoto centrale, terrazze sfalsate, due isole collegate e corona. Ali, bracci, rientranze, vuoti, larghezze diverse per fila e livelli distribuiti devono produrre percorsi di liberazione differenti. Anche una sagoma simmetrica può funzionare; ciò che va eliminato è il rettangolo riproposto quasi identico. Obiettivo iniziale: almeno sei sagome distinguibili alla dimensione classica, non sei semplici mescolamenti delle stesse posizioni. Sono adattamenti al Mahjong educativo, non repliche dichiarate del tradizionale tavolo da 144 pezzi.

**Strati leggibili:** faccia superiore, fianco e bordo inferiore separati; prospettiva leggera e costante, con gli strati inferiori che sporgono quanto basta per essere riconoscibili. Ombra di contatto sotto il pezzo che copre, distinta dall’ombra sul fondale. Il disegno deve mostrare dove finisce una tessera e comincia quella sottostante. Non usare solo il colore per distinguere l’altezza. Niente decorazioni che assomiglino a pezzi reali.

**Informazione sullo stack:** al tocco o al focus di una tessera bloccata, spiegare Coperta dall’alto oppure Bloccata sui due lati ed evidenziare brevemente il bordo dei pezzi responsabili. Quando c’è una pila, il dettaglio può indicare il numero effettivo di strati rimasti, senza svelare la parola nascosta. Quando una raccolta scopre una tessera, la faccia emerge con una breve animazione e resta al proprio posto: è il momento che rende comprensibile la struttura.

**Geometria coerente:** posizioni a mezze unità per terrazze sfalsate e sovrapposizioni parziali. Render, blocco superiore, contatto laterale, indicazione degli aiuti e hit testing devono derivare dalla stessa impronta geometrica. L’attuale controllo di vicinanza su righe intere non basta per queste sagome. Un pezzo che sembra scoperto non può essere bloccato da una regola invisibile; un bordo decorativo non deve diventare una zona cliccabile della tessera sotto. Nessuna rotazione casuale che renda ambiguo il contatto.

**Progressione spaziale:** primo tavolo con due livelli e blocchi chiaramente leggibili; poi tre livelli, rientranze e più fronti di apertura. La difficoltà geometrica è separata da nuove parole e grammatica. Evitare di introdurre contemporaneamente una lingua più difficile e una nuova struttura complessa. Scelta della sagoma deterministica dal seed, con varietà fra le partite e ripresa identica al salvataggio. Per le sfide condivise si conservano layoutId e layoutVersion.

**Solvibilità e stalli:** distribuire i contenuti a partire da un piano completo di rimozione valido per la sagoma. Per frasi e cloze il generatore deve considerare anche vincoli linguistici e pezzi residui, non soltanto la geometria. Le decisioni del giocatore possono creare uno stallo: indicarlo e proporre aiuti espliciti, senza cambiare la struttura di nascosto.

**Mobile:** adattare zoom e inquadratura all’ingombro reale della sagoma e alla profondità, non al solo numero di colonne. Panoramica più vista leggibile per i tavoli grandi; bordi degli strati riconoscibili anche nella vista normale. L’allargamento dei fianchi non può ridurre parole e zone di tocco fino a renderle inutilizzabili.

Criteri del prototipo: un nuovo giocatore distingue una tessera con altri pezzi sotto, spiega perché un pezzo è bloccato e vede quale pezzo viene liberato; riconosce tre sagome come diverse prima di leggere le parole. Controlli geometrici mirati per copertura parziale, lati liberi, ordine dei livelli, selezione del pezzo visibile e rimozione completa. Confronto visivo su telefono con una coppia prima/dopo che scopre un livello inferiore.

## 4. Gameplay ricostruiti

| Attività | Esperienza proposta |
| --- | --- |
| Coppie | Parola ↔ significato, parola ↔ immagine o indizio monolingua; tavolo completo e persistente. |
| Alfabeto | Lettera identica ↔ lettera identica nella prima fase, con esempio e audio quando disponibile. In seguito maiuscola/minuscola, distinzione fra segni simili e suono ↔ segno, dichiarati come obiettivi diversi. |
| Ascolto | Tessera sonora ↔ parola/immagine; la riproduzione deve riuscire prima della risposta. Trascrizione sempre accessibile come aiuto esplicito. |
| Scrittura | Si sblocca una tessera digitando, poi si completa la coppia sullo stesso tavolo. Campo, tastiera e Invia convivono con la partita. |
| Parola mancante | Frase in una fascia superiore compatta; trovi la parola nel tavolo, poi la sua gemella libera per completare la raccolta. La frase successiva arriva sullo stesso tavolo, senza rigenerarlo. |
| Laboratorio | Sullo stesso tavolo puoi costruire frasi o fare coppie. Le parole accettate si consumano, le coppie liberano spazio; obiettivo principale svuotare il tavolo. |

Per il cloze la doppia selezione è una proposta di regola da validare nel prototipo: mantiene la richiesta originale di trovare la parola mancante e rende significativa la geometria Mahjong. Se rallenta inutilmente, provare raccolta singola con un sistema di sblocco equivalente, non un quiz a tre bottoni.

Le attività possono condividere una shell senza cambiare casualmente regola a metà partita. Una missione indica chiaramente che cosa stai allenando. Le eventuali partite miste si sbloccano dopo la comprensione delle regole.

## 5. Laboratorio: libertà con regole linguistiche vere

Superare il confronto con tre frasi predefinite e il catalogo corrente. Il limite non si risolve aggiungendo cento frasi da memorizzare nel verificatore.

1. Creare un lessico strutturato per lingua: significato, forma, lemma, categoria, accordi, flessioni, costruzioni compatibili, pronuncia disponibile e materiali d’introduzione.
2. Definire una grammatica di costruzioni: soggetto/verbo, articoli e gruppi nominali dove pertinenti, oggetti compatibili, aggettivi, luogo, negazione, coordinazione; espansione graduale per capitolo.
3. Usare le forme effettivamente studiate: per esempio in russo distinguere книга e книгу; l’arabo e l’inglese non ereditano le regole italiane sugli articoli o sull’ordine.
4. Il verificatore restituisce tre esiti distinti: frase riconosciuta, errore specifico, costruzione ancora fuori dal repertorio. Fuori repertorio non equivale a grammaticalmente sbagliata.
5. La coerenza viene valutata solo entro vincoli semantici dichiarati e curati: oggetto leggibile, bevanda, luogo, riferimento compatibile. Nessuna promessa di capire ogni frase umana.

Esempio illustrativo di espansione futura in italiano: Io leggo un libro → Io leggo un libro nuovo → Io leggo un libro nuovo a casa. I nuovi elementi devono essere prima introdotti e verificati; questo esempio non descrive una capacità della 6.10.2.

Interazione: tocchi tessere libere, le vedi nella frase sopra il tavolo, puoi riordinarle nella frase, togliere l’ultima o annullare l’intera bozza. Finché non invii, la raccolta è provvisoria e reversibile. Dopo una frase accettata, le tessere si consumano definitivamente. Per fare una coppia si usa una scelta chiara Coppie/Frasi nella stessa posizione, senza perdere la bozza accidentalmente.

Il tavolo contiene copie compatibili sia con coppie sia con frasi. Il generatore costruisce una soluzione completa prima di distribuire le parole e controlla la possibilità di chiudere i residui. Le scelte libere possono comunque creare stalli: mostrarli e offrire annulla/rimescola espliciti. Eliminare il riordinamento silenzioso che oggi ripara automaticamente una continuazione; un aiuto non deve spostare tessere all’insaputa del giocatore.

Punteggio: base per frase valida, bonus moderato per parti diverse e strutture studiate, massimo esplicito. La lunghezza da sola non basta; ripetizioni e riempitivi non moltiplicano i punti. Coppie sempre utili, ma senza consentire di evitare tutta la pratica prevista in una missione linguistica. Il laboratorio libero permette entrambe le strategie senza fingere acquisizione di competenze.

## 6. Direzione visiva proposta

Cartoon da gioco da tavolo: colori pieni, contorni netti, tessere con spessore evidente, immagini grandi e feedback fisico breve. La direzione verrà resa concreta con un prototipo di home, tavolo e riepilogo prima di rifare tutte le schermate.

- Palette candidata: blu acceso, corallo, giallo sole e viola, con superfici chiare e testo scuro. È una proposta da provare, non una palette già approvata. Fondale più calmo delle tessere per non affaticare la lettura.
- Forme tonde e robuste, meno pannelli uno dentro l’altro e meno superfici tutte verdi. La personalità sta nei pezzi e nelle ricompense, non nella quantità di decorazioni.
- Tessera compatta per lettera/immagine e formato più largo per parola. Rapporto indicativo 4:5 per i pezzi compatti e 5:4 per quelli di parole, da confrontare con testi reali. Geometria, profondità e stati devono restare coerenti.
- Lettera o parola dominante; una sola informazione secondaria. Categoria grammaticale come piccolo segnale, non come riga aggiuntiva obbligatoria. Frasi intere nella fascia obiettivo, non stipate nei pezzi piccoli.
- Libera: faccia luminosa e bordo netto. Bloccata: arretrata e desaturata, con motivo leggibile al tocco. Selezionata: contorno forte e sollevamento. Corretta/errata: forma, movimento breve e messaggio, oltre al colore.
- Audio: sulla tessera selezionata o in un punto costante della barra di dettaglio. Evitare un piccolo bottone annidato su ogni tessera che sottrae spazio e provoca tocchi involontari.
- Segni russi chiaramente leggibili, ё/е distinti; font e diacritici arabi verificati a dimensione minima, direzione della frase distinta dall’ordine della navigazione.
- Icone e disegni da collezioni esistenti con licenza e provenienza; mantenere il vincolo sugli SVG. Ampliare il vocabolario illustrato con almeno 24 soggetti curati prima di promettere varietà nei tavoli grandi con immagini.

## 7. Tavolo mobile e aiuti sempre visibili

Schermata di partita: sopra obiettivo/frase e avanzamento; al centro il tavolo; sotto una barra stabile. La pagina non si allunga a ogni parola o messaggio. La collezione e la mappa possono scorrere normalmente.

Barra sempre raggiungibile: **Modello · Indizio · Annulla · Altro**. Nel laboratorio, **Invia frase** accanto alla frase o immediatamente sopra la barra. Rimescola, regola e uscita sono in Altro; rimescola diventa anche un invito diretto quando viene rilevato uno stallo. Gli aiuti essenziali non sono nascosti in Altro.

Modello apre un pannello breve sopra il tavolo e mostra una continuazione costruibile nelle condizioni attuali, con pronuncia se disponibile. Indizio evidenzia prima il tipo di mossa, poi su richiesta il pezzo; il risultato resta indicato come assistito. Aiuti gratuiti e senza vite consumate. Si può provarci di nuovo in autonomia in una verifica successiva.

Zoom iniziale calcolato da spazio utile, formato dei pezzi, livelli e dimensione minima leggibile. Una tavola da 52 pezzi non può stare tutta leggibile in ogni telefono: offrire panoramica e zoom di lettura. Pinch, trascinamento e pulsanti +/−/Centra hanno la stessa funzione; il gesto di spostamento non seleziona tessere. Salvataggio di zoom e posizione; focus sul pezzo selezionato senza spostamenti continui del tavolo.

Tasti e zone di tocco principali almeno 44 px nella vista di gioco leggibile; dettaglio espanso per parole lunghe. Mobile orizzontale con frase/pannello e tavolo affiancati quando utile. Tastiera del gioco oppure tastiera di sistema, una sola attiva; Invia sempre visibile e verifica della visual viewport reale, compresa la tastiera nativa. Non rivendicare quest’ultima prova usando soltanto un viewport desktop.

## 8. Animazioni, audio e ricompense

- Selezione: compressione e sollevamento brevi; raccolta: movimento verso frase o coppia; tessere appena liberate: segnale breve. Niente spostamenti del layout sotto il dito.
- Errori: feedback contenuto e recupero immediato. Successo: combo visibile e suono breve, senza bloccare la prossima mossa.
- Riepilogo: una ricompensa principale, una scoperta concreta, un bottone Continua. Dettagli e statistiche secondari espandibili.
- Collezione di parole e lettere, ambientazioni del tavolo e traguardi legati a azioni diverse. Completamento della mappa, XP di gioco e memoria verificata sono indicatori separati.
- Partita libera, sfida giornaliera e ripasso condividono materiali e interazioni; niente tre sistemi di obiettivi concorrenti sulla home.
- Suoni di gioco e voce hanno volumi/preferenze distinti. Riproduzioni vocali cancellabili, velocità effettiva coerente con il controllo, disponibilità per singolo testo. La modalità ascolto non viene proposta come obbligatoria se manca audio.
- Il nuovo design conserva il servizio audio attuale: il salto a un provider migliore resta una decisione separata. Nessun nuovo file o API implicito in questo piano e nessuna promessa di latenza zero sul web.
- Animazioni brevi e interrompibili, movimento ridotto rispettato, conferme testuali leggibili con screen reader. Priorità alla risposta al tocco durante pan, zoom e raccolta.

## 9. Costruzione tecnica e migrazione

Separare il coordinamento oggi concentrato in src/app.mjs: shell e navigazione, sessione, componenti del tavolo, introduzioni, aiuti, raccolta, ricompense. Condividere lo stesso componente di tavolo fra tutte le modalità.

Modello persistente della sessione: percorso, missione, lingua, regola, formato, seed, tavolo, raccolta provvisoria, azioni/annullamento, materiali introdotti, risultati assistiti, viewport e versione dello schema. Navigazione esplicita fra preparazione, gioco e riepilogo; errori di storage gestiti senza perdere la partita corrente.

Riutilizzare e adattare engine.mjs, board-viewport.mjs, storage.mjs, audio.mjs e introduction.mjs; rifare l’orchestrazione e sentence-games.mjs dove servono regole nuove. Lessico, forme ed esempi hanno identificativi e provenienza; introduzioni dipendono dal materiale e dalla sua versione, non da una schermata visitata genericamente.

Migrare progressi e XP senza azzerarli. Le partite 6.x aperte si possono concludere con le vecchie regole o archiviare esplicitamente prima di iniziare la nuova esperienza; non convertire a metà una soluzione in corso. Import/export, sfide e uso offline mantengono compatibilità o un messaggio chiaro. Nessun framework nuovo necessario per ottenere questi risultati.

## 10. Ordine di realizzazione e criteri di uscita

| Tappa | Risultato concreto | Criterio prima di proseguire |
| --- | --- | --- |
| A — prototipo dell’esperienza | Home, tavolo 32 tessere, aiuti e riepilogo, con contenuti reali; due varianti delle tessere cartoon e tre sagome con strati leggibili | Su mobile si capisce che cosa c’è sotto, perché un pezzo è bloccato e che cosa viene liberato; si trova Modello e si continua senza riaprire il catalogo; direzione visiva scelta dall’utente |
| B — motore e sessione | Tavolo persistente, biblioteca di sagome, geometria condivisa fra render e regole, formati comuni, raccolta/annullamento, navigazione e salvataggio | Ricarica e ripresa conservano ogni azione e sagoma; coperture parziali e lati coerenti con il disegno; gesti corretti; niente riordino silenzioso |
| C — percorso completo | Nuovo ingresso, introduzioni brevi, alfabeto→parole→frasi, coppie/immagini, collezione | Nessun contenuto nuovo nel tavolo prima dell’introduzione; una sequenza completa senza scelte duplicate; immagini sufficienti per la varietà promessa |
| D — costruzioni linguistiche | Primo capitolo compositivo per ciascuna lingua, grammatica strutturata, diagnostica e modelli | Più soluzioni effettivamente diverse, accordi/casi corretti, esiti fuori repertorio distinti dagli errori; revisione dei materiali per lingua |
| E — cloze, ascolto e scrittura | Tutte le attività nella stessa shell e sul tavolo persistente | Partite complete, aiuti chiari, disponibilità audio reale e tastiera nativa verificata su telefono |
| F — rilascio 7.0 | Colori, animazioni, ricompense, accessibilità, migrazione e changelog | Prova completa su mobile/desktop, progressi 6.x conservati, sito pubblico aggiornato e commit dettagliati |

Non ricolorare subito le sei modalità mantenendo l’attuale flusso: rendere prima concreto il ciclo intero con una partita e usarlo come riferimento per le altre.

Verifiche circoscritte per tappa: proprietà del motore per solvibilità e annullamento, grammatica nelle quattro lingue, introduzione obbligatoria, compatibilità dei salvataggi; poi una passata visiva mobile/desktop e una conferma dopo le correzioni. Prova finale sul sito pubblico e su telefono reale per gesti e tastiera. Metrica di progetto: passaggi per riprendere/continuare, reperibilità degli aiuti, comprensione dei pezzi liberi e quantità di scroll fuori dal tavolo. Efficacia didattica e fidelizzazione richiedono giocatori reali, non un punteggio automatico di QA.

## Decisioni ancora aperte

- Percorso guidato o laboratorio libero come ingresso principale: struttura sopra proposta, non ancora confermata.
- Aspetto esatto delle tessere e palette: da scegliere sul prototipo A, evitando di rifare l’intero gioco prima di vedere il tavolo.
- Regola di raccolta del cloze, quantità di novità e durata delle sessioni: da verificare nel prototipo.
- Estensione delle costruzioni e revisione linguistica: dipendenza contenutistica della tappa D, non capacità universale già presente.

Il piano è completo come sequenza di prodotto, gameplay, design e implementazione. Le scelte aperte sono isolate e non impediscono di valutare la ricostruzione proposta.
