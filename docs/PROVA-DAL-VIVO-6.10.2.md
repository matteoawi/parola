# Parola 6.10.2 — prova dal vivo

13 ottobre 2026, sito pubblico https://matteoawi.github.io/parola/, browser integrato di Codex su Windows. Interazioni effettuate sui controlli visibili, senza modificare lo stato del gioco via JavaScript e senza simulare il provider vocale. Dimensioni mobile 390 × 844 e orizzontale 844 × 390: sono viewport nel browser desktop, non prove su hardware iPhone/Android.

## Casi effettivamente giocati

| Attività | Prova e risultato osservato |
| --- | --- |
| Avvio e coppie | Russo con supporto italiano; introduzioni obbligatorie, tre coppie completate. Dopo la prima coppia, ricarica e ripresa conservano 30 punti e progresso 1/3. |
| Immagini | Libro, casa e scuola introdotti con disegno e audio; tre coppie completate. Ripetizione dopo le correzioni: etichette nella lingua studiata, audio del libro attivato, contatore finale al singolare e riepilogo dell’attività libera. |
| Completa | Abitudini quotidiane: risposta errata книга, corretta книгу in Я читаю ____, poi пью e по-английски. Tavolo completato, 75% di precisione e 23 XP. |
| Scrivi e abbina | Digitato привет con i tasti russi del gioco, inviato e abbinato a Ciao!. Una coppia verificata, non una partita completa. Switch di sistema: campo modificabile e tastiera del gioco nascosta; switch inverso: campo readonly e inputmode none. |
| Tastiera orizzontale | Prima correzione: bordo inferiore di Invia a 400 px su 390 px di altezza. Dopo correzione: bordo inferiore a 313 px; digitazione e invio riusciti sul sito aggiornato. |
| Laboratorio | Frase Я читаю книгу и Я пью воду и Я говорю по-английски: 11 parole, tre parti, 214 punti. Nella stessa prova, una coppia Я = Я porta il totale a 264. Non completate tutte le cinque risposte del tavolo. |
| Laboratorio, verifica finale | Я пью воду и Я читаю книгу: sette parole, due parti, 130 punti. Espanso Ascolta le parti registrate e attivata realmente la registrazione Я пью воду. Entrambe le parti hanno comandi normali e lenti. Nessun errore JavaScript registrato in questa verifica finale. |
| Ascolta | Tre coppie completate dopo aver attivato Mostra le parole; riepilogo Con supporto e 11 XP. È una prova guidata dei controlli, non una misura della comprensione uditiva autonoma. |
| Alfabeto | Tavolo da 12 tessere: Г Д Е Ё Ж З introdotte con maiuscola, minuscola ed esempi, poi sei coppie identiche completate. Successiva sessione И Й К: tre coppie completate, titolo Tavolo misto, audio indisponibile disabilitato e XP della barra superiore e interni entrambi a 107 senza ricarica. |

## Correzioni pubblicate durante la prova

- Abbinamento di riconoscimento alfabetico fra lettere identiche nella stessa scrittura, con nome ed esempio sotto. Esempi ricavati dai materiali del corso e introdotti prima del tavolo; disegno esistente quando disponibile.
- Tastiera di scrittura affiancata al campo in orizzontale, con Invia raggiungibile.
- Audio delle immagini e nomi accessibili coerenti con la parola pronunciata; progressi e contatori corretti, annunci di successo aggiornati e riepiloghi senza unità estranee.
- Congiunzione del laboratorio nella lingua studiata, anche con interfaccia italiana. Per frasi nuove prive di voce completa, ascolto separato delle parti registrate con spiegazione esplicita.
- Tavoli alfabetici misti identificati; pulsanti senza audio disabilitati. XP e giorni di pratica sincronizzati nella barra superiore.

## Audio: disponibilità e limiti osservati

Questo PC espone voci Microsoft italiane, inglesi e arabe, ma nessuna voce russa. Attivando Prova la voce Italiano, il profilo riporta Microsoft Cosimo - Italian (Italy). Per i materiali russi registrati, il profilo riporta eSpeak ru. I file russi esistenti di Я читаю книгу, Я пью воду e Я говорю по-английски sono disponibili; la frase coordinata nuova e le lettere alfabetiche non hanno una registrazione completa. La lettura continua richiede una voce russa sul dispositivo. Nessun file audio o servizio vocale aggiunto.

La prova verifica l’attivazione dei provider e i controlli; non include una registrazione sonora e non giudica la qualità acustica, la latenza percepita sul telefono, l’efficacia dell’apprendimento o la fidelizzazione.

## Evidenze e verifiche mirate

- [Tastiera mobile prima della correzione](live-keyboard-mobile-6.10.2.png): cattura della 6.10.1 durante la revisione, conservata con il numero della release di correzione.
- [Tastiera orizzontale corretta](live-keyboard-landscape-6.10.2.png): Invia visibile sulla 6.10.2.
- [Alfabeto con lettere identiche ed esempi](live-alphabet-mobile-6.10.2.png): cattura intermedia della 6.10.2, prima dell’ultimo aggiornamento delle etichette e della disponibilità audio.
- [Frase riconosciuta e parti audio disponibili](live-lab-recorded-parts-6.10.2.png): verifica finale sul sito pubblico.

Quattordici test Node mirati per voce e frasi, quattro per Mahjong alfabetico, controllo sintattico dell’app e verifica degli originali 36 Lucide/8 Twemoji superati. Le verifiche automatiche completano la prova dal vivo; non la sostituiscono. Nessuna suite storica completa ripetuta.

Commit funzionali conservati su master: 8ca30eb, d3fd764, f5d4943, 4430e62 e 2ec3f72. Build GitHub Pages del commit 2ec3f7240135cd5b36e3d789cc24d6d78ab57560 completata. Fetch e merge di origin/master prima dei push, senza forzature. Versione, cache, corso, manifest, changelog pubblico e standalone alla 6.10.2.
