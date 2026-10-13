# Audio di Parola 6.4.0

Gli MP3 attuali sono generati con eSpeak: questa release corregge il trasporto e la riproduzione, senza dichiarare sostituzioni delle voci che non sono state completate.

## Caricare una lingua una sola volta

Alla scelta delle lingue o alla riapertura di un percorso, il gioco scarica tutti i file disponibili delle lingue selezionate: 195 italiani, 182 inglesi, 189 russi. Nel monolingua si scarica solo una lingua. Le richieste sono limitate a quattro per volta e i percorsi duplicati vengono eliminati. Ogni download riuscito è conservato in cache; i file sono anche convertiti in buffer audio prima che il pacchetto sia indicato come pronto.

L’ascolto normale usa un buffer Web Audio già decodificato, senza richiesta HTTP al tocco. L’ascolto lento usa un URL del file in memoria tramite HTML Audio, con preservesPitch. Cambiare lingua libera buffer e URL delle lingue inattive; i file in cache restano recuperabili. Download falliti e risparmio dati hanno uno stato distinto e un comando per riprovare. La mancanza del pacchetto arabo viene dichiarata; non viene usata una voce in un’altra lingua.

Il test locale ha caricato e decodificato tutti i 377 file delle due lingue iniziali, eseguito ascolto normale e lento senza rete, verificato zero richieste audio durante l’ascolto e ripetuto l’avvio offline dalla cache. Ha poi selezionato il russo liberando gli altri buffer e verificato il messaggio arabo con layout RTL. Il tempo misurato è tra invocazione e programmazione del buffer, non tra tocco fisico e suono percepito. Due test puri coprono deduplicazione, cambio lingua, risparmio dati e recupero da un download fallito.

## Voci più naturali: alternative verificate

- **Google Cloud TTS:** API ufficiale con quote gratuite per alcune voci. Richiede fatturazione attiva e addebita il superamento della quota: [prezzi ufficiali](https://cloud.google.com/text-to-speech/pricing), [configurazione](https://docs.cloud.google.com/text-to-speech/docs/get-started). Il sito dovrebbe servire i file pregenerati; la chiave rimarrebbe solo nell’ambiente di generazione.
- **Piper:** motore neurale locale con API Python e HTTP. Generazione senza un servizio cloud a consumo; si scelgono modelli e relative licenze adatti al progetto. Il repository contiene già scripts/generate_neural_audio.py per pacchetti con un modello locale: [API HTTP ufficiale](https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/API_HTTP.md).
- **ElevenLabs:** piano gratuito per prove, con restrizioni commerciali e attribuzione richiesta: [condizioni pubblicate](https://help.elevenlabs.io/hc/en-us/articles/13313564601361-Can-I-publish-the-content-I-generate-on-the-platform).
- **Hugging Face:** crediti gratuiti molto piccoli, attualmente 0,10 dollari al mese per un account gratuito, soggetti a cambiamenti: [prezzi ufficiali](https://huggingface.co/docs/inference-providers/pricing). Non viene presentato come hosting gratuito illimitato.
- **Edge tramite edge-tts:** client non ufficiale senza chiave API: [progetto](https://github.com/rany2/edge-tts). Quattro campioni nelle lingue del gioco sono stati ottenuti, ma più tentativi di generazione completa hanno fallito con WSServerHandshakeError. Nessuna sostituzione dei 566 MP3 è stata pubblicata. Non viene assunto un contratto di API o una licenza commerciale dal solo fatto che il client sia open source.

scripts/generate-edge-audio.py rimane una preparazione sperimentale: usa registrazioni in blocco e allineamenti delle frasi, riutilizza i campioni locali, include i contesti dell’alfabeto e modifica manifest e audio pubblicati solo dopo una generazione completa riuscita. Non viene eseguito nel browser. I campioni intermedi restano nella directory ignorata .venv/neural-cache. L’accesso al servizio non è necessario per giocare.

L’architettura permette di sostituire i file con un pacchetto naturale completo senza introdurre un’API runtime: generazione una volta, distribuzione statica, precaricamento per lingua e riproduzione locale. L’audio dell’edizione Parola-offline.html resta incorporato nel file.
