# Frasi, parola mancante e immagini — 6.10.0

Tavoli presenta sei modalità esplicite: Coppie, Immagini, Ascolta, Completa, Laboratorio e Scrivi. Il laboratorio e le immagini hanno un titolo proprio anche quando si entra da un’unità del corso.

## Laboratorio

Tavolo Mahjong di parole, con etichette grammaticali, pronuncia, annullamento, zoom e tessere libere. La banca deriva da 19 materiali del corso più la congiunzione, tutti presentati prima di giocare. Le combinazioni non sono più limitate alle tre frasi dell’unità selezionata.

Il verificatore offline accetta 22 parti di frase per lingua: modelli del corso e sei combinazioni soggetto/verbo/bevanda (alcune coincidenti con modelli). Per italiano, inglese, russo e arabo mantiene le forme della lingua: per esempio `Io bevo tè`, `He drinks water`, `Я пью кофе`, `هو يشرب الماء`. Non scambia arbitrariamente nomi tra verbi: `Io leggo acqua`, `He drink water` e `Я пьёт чай` vengono rifiutati.

Si possono coordinare fino a quattro parti distinte con e/and/و/и, fino a 48 parole. Sono molte combinazioni possibili, non comprensione universale della grammatica o della coerenza semantica. Il repertorio esclude frasi identitarie e negative dal montaggio, evitando contraddizioni elementari come attribuire nomi diversi alla stessa persona. Le frasi ripetute e le parti ripetute non danno punti aggiuntivi.

Punteggio base: 30 + 8 per parola + quadrato delle parole oltre cinque + 20 per collegamento, massimo 1.500 per risposta. Si applicano anche i bonus di autonomia e serie esistenti. Le coppie semplici valgono 25 punti base e una stessa parola conta una volta per tavolo. Cinque risultati diversi completano la partita; si può alternare fra frasi e coppie dopo aver annullato una frase in corso.

Ogni round rifornisce il tavolo con almeno un modello lungo costruibile e una coppia libera nuova. Formati di 24, 32 e 52 tessere. Sono necessarie le regole Mahjong: una tessera coperta o bloccata sui due lati non può essere usata. Un modello e gli indizi aiutano a proseguire; se la frase esce dal repertorio, si torna indietro con annullamento. L’annullamento della selezione funziona anche dopo ripresa dal salvataggio.

Il riepilogo conserva il testo effettivamente creato. La partita dà XP, serie, obiettivi e traguardi, ma non promuove artificiosamente la memoria di una frase canonica del corso usando un identificativo di round.

## Completa

In alto appare la frase nella lingua studiata, con esattamente una parola mancante. Il testo di supporto o l’indizio monolingua resta sotto. Il giocatore seleziona la parola fra le tessere libere con distrattori. Il modello ha una risposta definita; non pretende di riconoscere tutte le alternative grammaticali possibili per quel contesto.

Tre round, errore che lascia il tavolo intatto, tessera corretta raccolta, buco riempito e pronuncia della frase dopo la risposta. Nuovo tavolo al round successivo, indizi e rimescolamento conservati. Anche i distrattori sono introdotti prima della partita.

## Immagini

Parola ↔ immagine per libro, casa, scuola, acqua, tè, caffè, porta e penna. Tavoli da 6, 12 o 16 tessere, quattro lingue, monolingua e bilingua. L’immagine non stampa la soluzione, ma ha un nome accessibile e un pulsante che pronuncia la parola nella lingua studiata. Presentazione iniziale con disegno, parola, significato o indizio e audio.

Otto SVG originali Twemoji 17.0.3, commit `b6b55fef1e8636b540a6d016a4729ca8cdf2e60b`, senza modifica dei disegni. CC BY 4.0; crediti, fonte, licenza e SHA256 pubblici. Asset locali, cache del sito e incorporamento nel file offline. Nessuna nuova registrazione audio, API o chiave introdotta.

## Compatibilità e verifiche

Le nuove partite di frasi hanno `sentenceVersion: 2`. I salvataggi senza questo marcatore continuano con la ricostruzione e le tre frasi delle release precedenti, senza conversione di un tavolo in corso. Le sfide con immagini sono riconosciute dai link; i parametri delle sfide e dei replay vengono conservati.

Verifiche mirate: grammatica e punteggi in quattro lingue, 100 tavoli laboratorio con parole provenienti dai materiali introdotti, risposta cloze raggiungibile, provenienza degli otto disegni, partite effettive mobile/desktop, salvataggio e ripresa, cinque risultati misti, tre round cloze in quattro lingue e due partite immagini complete. I report locali e pubblici accompagnano la release.
