# Parola 6.8.1 — Priorità alla voce del dispositivo

Correzione provvisoria della pronuncia in tutte e quattro le lingue. I file eSpeak non sono stati rigenerati: nelle release 6.7 e 6.8 erano rimasti invariati, ma continuavano a essere la scelta iniziale. Ora è preferita una voce del dispositivo nella lingua corretta; il file rimane come riserva e come scelta esplicita.

La graduatoria valuta nome e voiceURI: Natural, Neural, Premium, Enhanced, Google, Microsoft, locale coerente e voce predefinita. Compact, eSpeak e MBROLA ricevono priorità inferiore. Questi sono indizi, non una valutazione della qualità ascoltata. In Le tue lingue → Audio puoi scegliere una voce per lingua, provarla e leggere il nome dell’ultima fonte effettivamente usata. La voce salvata viene mantenuta nei salvataggi ed esportazioni; se non esiste sul nuovo dispositivo, viene usata la scelta automatica.

La vecchia preferenza passa una sola volta al dispositivo. Le scelte esplicite successive, incluso il file incluso, rimangono conservate. Le voci vengono aggiornate quando il browser le rende disponibili; la prima riproduzione aspetta al massimo 200 ms se l’elenco è ancora vuoto. Se una voce non parte entro 1,8 secondi o fallisce, la coda viene cancellata prima del file di riserva. Non viene usata una voce nella lingua sbagliata. Il motore di sintesi parte con tono neutro e velocità richiesta, incluso 0,8.

Le cinque correzioni di pronuncia già contenute nelle richieste audio vengono incluse anche per il dispositivo: read al passato e accento russo di Дома́. La scrittura mostrata nelle tessere non viene alterata.

Gli effetti sonori già avviati vengono attenuati fino al silenzio durante la pronuncia, e non ne partono altri finché la voce è attiva. Riprendono alla fine o all’interruzione, senza sovrapporre le pronunce.

La disponibilità e qualità delle voci dipendono dal dispositivo e dal browser; alcune voci del sistema possono usare la rete. Non è stata attivata un’API esterna né aggiunto un file audio. Documentazione Web Speech: [elenco delle voci](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices), [metadati delle voci](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice).

Dieci casi Node mirati: sette su graduatoria, scelta manuale, fallimento, interruzione, caricamento tardivo, migrazione e pronunce contestuali, più riproduzione lenta e due casi sugli effetti/zoom. Quattro gruppi Chromium: UI mobile/desktop, riproduzione reale del file a 0,8 e preferenza conservata, scelta manuale e silenzio degli effetti, fallimento di una voce e recupero del vero file russo. Il provider di dispositivo è simulato nei test delle scelte; la qualità percepita della voce sul telefono dell’utente non è dichiarata verificata. Nel browser Windows di verifica sono state enumerate otto voci di sistema, senza una voce russa. I file eSpeak rimangono recuperabili in quel caso.
