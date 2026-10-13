# Alfabeto e monolingua — Parola 6.1.0

Il sito ufficiale è https://matteoawi.github.io/parola/ e il repository è https://github.com/matteoawi/parola. La cronologia delle precedenti pubblicazioni resta conservata.

## Due punti di ingresso

Chi inizia a leggere può aprire “Dall’alfabeto”; chi conosce già i segni può aprire “Dalle frasi”. Nel percorso dell’alfabeto “Conosco già le lettere” porta al ponte verso le prime frasi. Tutte le lezioni sono accessibili: la scelta dell’ingresso non certifica e non completa automaticamente le lezioni saltate.

## Il livello monolingua

Si sceglie dalla home o dalle Impostazioni. La lingua di studio e quella degli indizi coincidono, e per impostazione iniziale coincide anche la lingua dell’interfaccia. Le 24 unità e le cinque modalità restano utilizzabili. L’abbinamento collega una frase a un compito comunicativo nella stessa lingua, anziché mostrare due copie della stessa frase. Per esempio “Saluta al mattino” si abbina a “Buongiorno!”. Scrivi e abbina e Completa usano gli stessi indizi.

I dodici percorsi bilingui e i quattro monolingua hanno chiavi di progresso distinte. I progressi dell’alfabeto appartengono invece alla lingua studiata: cambiare lingua di supporto non obbliga a reimparare gli stessi segni. I progressi v5/v6 esistenti vengono conservati.

## Progressione per scrittura

| Lingua | Copertura e progressione |
| --- | --- |
| Italiano | 21 lettere tradizionali in piccoli gruppi; J/K/W/X/Y nei prestiti; accenti; C/G/H; gn/gli/sc/sch nel contesto; doppie; apostrofo; prime frasi. |
| Inglese | 26 lettere; distinzione tra nome e suono; vocali brevi; e finale e gruppi vocalici; sh/ch/th; lettere mute; eccezioni e pronuncia dipendente dal contesto; prime frasi. |
| Russo | 33 lettere; omografi visivi con il latino; и/й, е/ё e и/ы; vocali e morbidezza; Ь/Ъ; accento scritto a scopo didattico; prime frasi. |
| Arabo | 28 lettere; famiglie in piccoli gruppi; forme iniziali, mediane e finali; ا د ذ ر ز و e interruzione del collegamento; fatha/kasra/damma/sukun; vocali lunghe; shadda/tanwin; hamza e supporti; ة/ه e ى/ي; لا; parole vocalizzate e prime frasi. |

I nomi delle lettere inglesi sono indicazioni per riconoscerle, non trascrizioni fonetiche universali. Le note descrivono esempi e limiti delle regole; non presentano ogni lettera come un unico suono invariabile. Le forme arabe sono mostrate tramite caratteri ordinari e collegamento tipografico, evitando di insegnare forme inventate per lettere che non si collegano in quella posizione.

## Esercizi e verifica

Ogni sessione contiene fino a sei elementi. Riconoscimento, produzione digitata e ascolto sono competenze separate. Gli elementi non acquisiti hanno precedenza; nei ripassi si considerano le scadenze. Una risposta dopo un errore o dopo aver aperto il modello è assistita e richiede una nuova prova indipendente. Il modello è un aiuto gratuito; non produce una falsa acquisizione.

La normalizzazione Unicode consente varianti canoniche equivalenti e forme arabe contestuali, ma conserva accenti, punti, hamza, segni vocalici e identità dei caratteri. In particolare, una a latina non sostituisce una а cirillica; е non sostituisce ё; ب non sostituisce بَ quando la vocale viene valutata. Nelle prime frasi la punteggiatura finale è facoltativa.

L’ascolto richiede un file effettivamente disponibile o una voce del dispositivo nella lingua corretta. Una lingua con alcuni MP3 non viene considerata automaticamente coperta per ogni nuova lettera. Senza audio, il pulsante di ascolto relativo agli elementi mancanti è disabilitato; la lettura e la scrittura continuano. La risposta a un esercizio di ascolto è bloccata fino alla riproduzione riuscita. Dopo una ricarica occorre ascoltare di nuovo la domanda attiva.

La sessione conserva posizione e bozza. L’esportazione include sessioni e competenze. I risultati di ascolto non certificano la pronuncia dell’utente e i risultati di scrittura non valutano la grafia a mano. Non sono stati aggiunti MP3 arabi o una revisione madrelingua certificata.

## Verifiche della release

23 test Node superati: compatibilità dei salvataggi, quattro percorsi monolingua, copertura delle lettere, unicità delle scelte, valutazione dei segni e contabilità delle risposte assistite. Le simulazioni del motore comprendono 5.280 scenari di tavolo e 2.000 partite con scelte casuali valide, senza stalli osservati.

90 controlli Chromium nella suite di apprendimento: tutte le 45 lezioni completate in riconoscimento e scrittura (588 risposte di base), 16 partite monolingua testuali complete, abbinamenti monolingua con MP3 effettivamente riprodotti nelle tre lingue dotate di registrazioni, blocco dell’ascolto arabo quando l’audio manca, tastiera virtuale araba, contrasto delle vocali, persistenza della bozza, importazione/esportazione, layout desktop/mobile e ricarica offline. Le simulazioni delle partite testuali disattivano l’audio; i controlli di ascolto usano separatamente la riproduzione effettiva.

Altri 25 controlli della suite precedente verificano le dodici direzioni bilingui, gli MP3 italiano/inglese/russo, salvataggi, recupero backup, mobile e changelog offline. I report distinguono l’indirizzo locale dalla verifica sul sito pubblico. I risultati riguardano Chromium nell’ambiente di verifica, senza certificare ogni browser, voce o dispositivo.

## Riferimenti

Le distinzioni tecniche dell’arabo seguono la descrizione delle forme e dei collegamenti nel [capitolo 9 dello standard Unicode](https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-9/). I diacritici vengono mantenuti e normalizzati canonicamente secondo il modello Unicode.

Per l’italiano, la presenza di digrammi e trigrammi e la loro dipendenza dal contesto è descritta da [Treccani, Digramma](https://www.treccani.it/enciclopedia/digramma_%28Enciclopedia-dell%27Italiano%29/).

Per l’inglese, la distinzione tra lettere e suoni e il lavoro su parole intere è coerente con i materiali [Speak and spell del British Council](https://learnenglishkids.britishcouncil.org/speak-spell) e con [Sounds Right](https://learnenglish.britishcouncil.org/apps/learnenglish-sounds-right).

Per il russo, il riferimento introduttivo è la lezione sull’alfabeto nei [materiali didattici della Cornell University](https://russian.cornell.edu/russian.web/courses/121/Leed_Less_1-21.pdf).

Sessioni da sei elementi, ingresso libero, indizi monolingua e criterio di acquisizione sono scelte di progetto, non risultati sperimentali o dichiarazioni di efficacia didattica certificata.

La verifica delle due suite è stata completata sia in locale sia su https://matteoawi.github.io/parola/, con 115 controlli browser pubblici superati in totale. I report locali restano separati in `local-learning-verification-6.1.0.json` e `local-pages-verification-6.1.0.json`.
