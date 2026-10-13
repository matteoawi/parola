# Parola 6.7.0 — Tavoli fino a 52 tessere e tasto Invia

## Dimensioni e regole

Cinque formati a coppie: Essenziale 6 tessere, Classico 12, Esploratore 18, Grande 32 e Maratona 52. I nuovi percorsi iniziano su Grande. La vecchia preferenza predefinita Classico viene aggiornata una sola volta; le altre scelte sono mantenute. Una scelta esplicita successiva di Classico rimane salvata. Le partite già avviate conservano layout e dimensioni.

Grande e Maratona hanno sei colonne e tre livelli sovrapposti, con tessere sostenute dal livello inferiore. Le regole di copertura e lati liberi sono quelle già usate dal Mahjong. Suggerimento e mescolamento continuano a funzionare sui materiali rimasti.

Nelle frasi, i tavoli grandi aggiungono materiale di altre unità del percorso, dopo quello corrente e il ripasso. Ogni elemento passa dalla presentazione prima di giocare. Nell’alfabeto, la scelta della dimensione è disponibile nella lezione: il materiale parte dalla lezione scelta, aggiunge elementi dello stesso tipo e poi altro materiale del percorso se necessario. Sono elementi distinti, senza moltiplicare artificialmente gli stessi identificativi. L’abilità viene registrata per ciascun elemento; le lezioni vengono completate soltanto quando tutti i loro elementi risultano padroneggiati.

I salvataggi ammettono fino a 26 coppie. Le code alfabetiche e la validazione delle riprese riconoscono gli elementi canonici dell’intero percorso, mantenendo risposte, coppie e layout. I vecchi link Classico ed Esploratore mantengono le stesse dimensioni e geometrie; i link dei nuovi formati sono accettati. Le spedizioni usano 12, 32 e 52 nelle tappe a coppie. La sfida giornaliera a coppie usa Grande. Primo avvio breve, Completa e Componi conservano il tavolo di parole della loro lezione.

## Mobile e desktop

Vista intera adatta la larghezza al contenitore, tenendo conto di spazi e scorrimento. Ingrandisci ritorna alle tessere più leggibili e permette di scorrere il tavolo in entrambe le direzioni. La pagina non si allarga con il tavolo; i comandi rimangono sotto l’area di gioco sul telefono. Gli indicatori delle 26 coppie vanno a capo nella colonna desktop.

## Tastiera

Righe più compatte e familiari, lettere aggiuntive e segni raggruppati, feedback sui tasti. Un tasto Invia evidente, con etichetta e icona Lucide, resta nella fila inferiore della tastiera del gioco. Controlla la lettera, la frase o la risposta dell’aiuto a seconda del campo attivo. Rimane disabilitato se il campo è vuoto e segue il testo anche dopo un cambio di tastiera.

Anche Invio sulla tastiera di sistema verifica la risposta; Shift+Invio mantiene l’inserimento di una nuova riga nelle frasi. Lo switch esclusivo delle tastiere e la conservazione del testo sono mantenuti. Nessun cambiamento dei provider o dei file audio.

## Verifica locale

Tre nuovi test puri e otto regressioni mirate superati. Verificati geometria sostenuta, soluzione di 32/52 tessere su più semi, code alfabetiche da 26 elementi nelle quattro lingue, layout salvato, mescolamento, formati condivisi e migrazione della preferenza.

Sette gruppi Chromium: default 32, presentazioni complete, 52 tessere su tre livelli, contenimento e zoom mobile, ripresa delle frasi, alfabeto russo con ripresa fuori ordine, Invia per lettera e frase dopo lo switch, invito 52 sul desktop. Report `local-smoke-large-6.7.0.json`. Nessun errore JavaScript nello smoke. Immagini `table-52-mobile-6.7.0.png`, `keyboard-send-mobile-6.7.0.png`, `table-52-desktop-6.7.0.png`.

Ispezione visiva riunita su mobile e desktop, una correzione di contenimento e indicatori e una conferma. Restano i tre avvisi storici sui bordi delle tessere. Le SVG rimangono originali Lucide. Nessuna suite storica completa ripetuta o collaudo dichiarato su tutti i telefoni fisici.
