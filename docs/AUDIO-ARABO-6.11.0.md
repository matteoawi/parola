# Audio arabo — Parola 6.11.0

247 MP3 generati localmente con la voce araba Microsoft Hoda (ar-EG), per 328 voci di inventario. Copertura: frasi del corso e varianti accettate, vocabolario illustrato, parole componenti e tutti i 134 materiali alfabetici, con contesti distinti per suoni e segni vocalici. Anche il connettivo e il nome della porta aggiunti successivamente al vecchio inventario sono inclusi.

Metodo gratuito su questo PC: System.Speech seleziona la voce araba già installata, salva WAV senza riprodurli e FFmpeg li converte in MP3 mono 22.050 Hz a 48 kbit/s. Nessuna chiave, account, richiesta a un provider o motore vocale distribuito al visitatore. La documentazione ufficiale descrive [SpeechSynthesizer](https://learn.microsoft.com/en-us/dotnet/api/system.speech.synthesis.speechsynthesizer) e [l’esportazione WAV](https://learn.microsoft.com/en-us/dotnet/api/system.speech.synthesis.speechsynthesizer.setoutputtowavefile).

Rigenerazione: scripts/generate-arabic-audio.ps1 e scripts/arabic-audio-inventory.py. Cache di lavoro ignorata da Git in .venv/ar-hoda-cache. La pubblicazione dell’inventario avviene solo dopo il controllo di tutti gli MP3. Il manifest espone testo, lingua, voce, provider, dimensione e qualità sintetica; non dichiara registrazioni umane o voce neurale.

Il pacchetto pesa 2.881.062 byte, circa 2,75 MiB. Scegliendo l’arabo viene scaricato e preparato insieme ai soli pacchetti selezionati. I 328 riferimenti condividono 247 file quando la pronuncia è identica. Il file Parola-offline.html incorpora tutti gli audio: 813 MP3 unici complessivi per 894 riferimenti. I 566 riferimenti precedenti conservano esattamente i loro metadati; gli audio delle altre lingue non sono sostituiti.

La voce del dispositivo resta la preferenza automatica quando disponibile. File incluso forza la registrazione; un dispositivo privo di voce araba può usare il pacchetto. Il rallentamento 0,8× usa il motore di riproduzione esistente. Nel laboratorio, una frase coordinata nuova può avere solo l’ascolto delle parti registrate se manca una voce del dispositivo capace di leggerla per intero.

Verifiche: tutti i WAV contengono segnale, nessun file silenzioso; durata valida per tutti i MP3; due test di copertura per parole, alternative e 134 schede; riproduzione reale di cinque esempi, controllo temporale del rallentamento e ricarica offline nel browser. Report locale e pubblico separati. La prova acustica madrelingua resta da fare: file decodificabile e pulsante funzionante non dimostrano da soli la correttezza di ogni fonema isolato, diacritico o inflessione.

Il nuovo pacchetto risponde alla richiesta urgente di includere gli audio arabi. Il redesign grafico e il percorso 7.0 restano un lavoro distinto.
