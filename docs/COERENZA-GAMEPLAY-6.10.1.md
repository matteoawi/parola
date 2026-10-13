# Revisione dei gameplay — 6.10.1

La revisione distingue funzionamento, coerenza delle regole e opportunità di esercizio. Non misura apprendimento, divertimento o fidelizzazione su giocatori reali. Il laboratorio verifica strutture definite; non è un giudice universale della grammatica o del significato.

## Problemi trovati e correzioni

**Continuazioni del laboratorio.** Nella 6.10.0, una simulazione del primo modello coordinato su 25 seed per lingua (100 tavoli Grande) si fermava in 40 casi scegliendo la prima tessera libera con la parola richiesta. Il giocatore poteva recuperare con un rimescolamento, ma questo introduceva attrito anche seguendo una frase prevista. Ora, quando una continuazione riconosciuta è bloccata, il tavolo ne riapre una, mantenendo testo, tessere raccolte e regole di selezione. Il messaggio spiega il riallineamento e non consuma un aiuto. La stessa simulazione sul modello provato termina con zero stalli osservati; 49 riallineamenti complessivi. Questo non garantisce che ogni frase immaginata sia costruibile su ogni tavolo.

**Indizi lunghi.** Il verificatore accettava quattro parti, ma il suggeritore cercava soltanto una o due. Ora cerca fino a quattro parti distinte, rispetta il prefisso già composto, la disponibilità delle parole e le frasi già premiate. Se una frase è completa, suggerisce un’estensione possibile oppure invita a verificarla. Non definisce sbagliata una frase semplicemente perché esce dal repertorio: lo comunica e propone modello, annullamento o Svuota frase.

**Materiale e recupero.** Il riempimento casuale era dominato dalle parole frequenti e comprendeva parole della frase negativa sul caffè che non appartenevano ai modelli montabili. Il riempimento ora varia fra parole distinte e include solo forme presenti nelle strutture riconosciute o la congiunzione. I formati 24/32/52 garantiscono rispettivamente gli ingredienti per due/tre/quattro parti coordinate, oltre a una coppia libera nuova. Svuota frase restituisce le tessere e funziona dopo salvataggio e ripresa; gli eventuali aiuti restano registrati.

**Percorso.** Immagini e laboratorio usavano sempre lo stesso repertorio, ma comparivano fra i requisiti di ognuna delle 24 unità. Ora le unità hanno quattro attività pertinenti: Coppie, Ascolta, Completa e Scrivi. Contatori e capitoli mostrano 96 missioni. Immagini e Laboratorio restano selezionabili insieme alle altre modalità nei Tavoli, con un miglior punteggio unico per direzione linguistica. I punteggi e i progressi storici non vengono cancellati. Prossima missione cerca l’attività realmente incompleta anziché saltare un requisito o ripetere una modalità già conclusa.

**Completa.** I distrattori potevano richiedere fino a 26 frasi da introdurre, molte lontane dall’unità. Il gruppo ora comprende sei materiali: l’unità e un piccolo contesto precedente o di base. L’errore lascia intatto il tavolo; una risposta corretta riempie il buco e viene pronunciata. La frase visualizzata funge da contesto di abbinamento; questa modalità è ricerca della parola sul Mahjong, non eliminazione completa di tutte le tessere. Il modello ha una risposta definita, non tutte le alternative linguisticamente possibili.

**Immagini.** Regole e riepilogo mostravano la regola grammaticale dell’unità selezionata anche per semplici nomi. Ora spiegano il match parola–disegno. Il ripasso che sblocca altri aiuti usa parole effettivamente introdotte nella partita. Il formato di otto coppie si chiama Completo, senza confonderlo con il traguardo per almeno 18 tessere. Immagini, testi alternativi e audio nella lingua studiata restano disponibili; i disegni non cambiano.

**Ricompense.** Il delta XP ora corrisponde alla differenza fra i totali prima e dopo il miglioramento, anche attraversando una soglia di arrotondamento. Le tre stelle richiedono assenza di aiuti. Rimescolare le coppie marca le risposte rimanenti come guidate, impedendo bonus di autonomia e padronanza impropri. I traguardi del tavolo dipendono dal numero reale di tessere: 16 immagini non valgono come 18, mentre 24/32/52 parole possono contribuire a Esploratore.

**Leggibilità.** I formati delle parole mostrano solo 24/32/52; quelli delle immagini 6/12/16. Le etichette delle sei modalità si adattano al telefono. Le parole sulle tessere riducono il corpo prima di spezzarsi a fine riga, conservando il testo completo e lo zoom. Contatori distinguono frasi/coppie, coppie e parole mancanti.

## Ruolo delle attività

| Attività | Esercizio offerto | Limite |
|---|---|---|
| Coppie | Associazione fra parola/frase e significato o indizio monolingua | Il riconoscimento non dimostra produzione autonoma |
| Immagini | Associazione visiva di otto nomi concreti, con pronuncia | Repertorio piccolo; non insegna da solo la struttura delle frasi |
| Ascolta | Associazione dopo evidenza di ascolto, con trascrizione guidata alternativa | L’efficacia dipende anche dalla qualità della voce disponibile |
| Completa | Ricerca contestuale della forma mancante | Risposta del modello; non analisi di ogni alternativa possibile |
| Laboratorio | Ordine delle parole, forme compatibili e coordinazione; coppie per riconoscimento visivo | 22 parti per lingua, fino a quattro coordinate; nessuna comprensione universale |
| Scrivi | Produzione scritta prima di abbinare, con tastiera di gioco o del dispositivo | Accetta i modelli e le alternative previste dal corso |
| Alfabeto | Riconoscimento, ascolto o scrittura sul Mahjong, con progressi separati | Non è una misura di acquisizione della lettura in una sessione |

## Verifiche

Dieci test Node mirati, comprendenti 100 continuazioni senza aiuti a pagamento, suggerimenti a tre/quattro parti nelle quattro lingue, disponibilità del materiale, punteggi, soglie XP, traguardi e gate delle introduzioni. Verifica separata degli SVG originali Lucide/Twemoji e dell’inclusione offline.

Otto gruppi Chromium su partite complete: coppie e aiuti, ascolto prima del match, scrittura con pulsanti della tastiera e Invia, immagini e ripasso pertinente, cloze con errore e tre risposte, laboratorio lungo e risultati misti con ripresa, percorso/formati, alfabeto monolingua completato. Controllo visivo mobile e desktop, overflow della pagina, errori JavaScript e traduzioni mancanti. La voce è simulata con esito positivo per isolare la logica: non è una verifica della sua qualità sul telefono.

Una seconda verifica mantiene la copertura cloze nelle quattro lingue, immagini russo bilingue/arabo monolingua, presentazioni, riepiloghi e salvataggi. Report locali e pubblici sono conservati insieme alla release.
