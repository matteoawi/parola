# Parola 6.5.2 — SVG da disegni esistenti

Tutte le SVG attive del gioco provengono da Lucide, pacchetto ufficiale `lucide-static` fissato alla versione 1.56.0. I 36 disegni sostituiscono tutte le vecchie geometrie: navigazione, cinque modalità, audio, aiuti, premi, risultati, logo nell’app e icona installabile. Le forme non sono state ridisegnate; il renderer applica dimensioni e classi, mentre il favicon modifica soltanto dimensioni, colori e superficie CSS. La sua geometria è quella di `layers-2`.

## Provenienza e riproducibilità

- Originali upstream, byte per byte: `assets/icons/lucide/*.svg`.
- Pacchetto, versione, archivio, integrità SHA-512, mappa dei 36 nomi applicativi e SHA-256 di ogni originale: `assets/icons/lucide/sources.json`.
- Licenza upstream completa ISC e MIT per le icone ereditate da Feather: `assets/icons/lucide/LICENSE`.
- `scripts/update-icons.py --download` recupera il pacchetto fissato e ne verifica l’integrità. Senza l’opzione, genera il renderer e il favicon dalla copia locale verificata. Il build esegue questa seconda operazione, senza rete.
- `src/icons.mjs` incorpora gli originali e la licenza. Sito e file offline contengono lo stesso set; nessuna CDN o fetch di icone durante il gioco. L’edizione offline incorpora anche il favicon.
- La pagina pubblica `credits.html`, raggiungibile dal footer in tutte le lingue, collega il progetto, i disegni originali e le licenze. È conservata nella cache dell’app; l’edizione standalone collega la pagina pubblica e contiene comunque il testo completo della licenza al suo interno.

Fonti ufficiali: https://lucide.dev/ e https://github.com/lucide-icons/lucide. L’archivio fissato è https://registry.npmjs.org/lucide-static/-/lucide-static-1.56.0.tgz.

## Verifica mirata

`python scripts/verify-icons.py`: originali integri, SVG inline identiche negli artefatti, favicon con la stessa geometria e entrambe le attribuzioni incluse. Controlla che nel workspace non rimangano altre SVG senza provenienza.

`scripts/smoke-icons.cjs`: geometrie effettivamente renderizzate confrontate con gli originali su 21 superfici, incluse lettere, presentazioni obbligatorie, partita, dialogo, risultati e condivisione. Tutti e 36 i disegni renderizzati nella tavola di confronto; pagina licenze e favicon disponibili. Nessun errore JavaScript nello smoke locale. Report `local-smoke-icons-6.5.2.json`.

Ispezione visiva riunita di home mobile 390 px, desktop 1360 px e tavola completa: icone coerenti e leggibili, dimensioni dei comandi preservate. Immagini `icons-mobile-6.5.2.png`, `icons-desktop-6.5.2.png`, `icons-all-6.5.2.png`. Il rilevatore ha segnalato soltanto i tre bordi delle tessere già presenti nella CSS storica; nessun cambiamento estraneo a questa richiesta. Non è stata ripetuta la suite storica completa.

## Pubblicazione

Commit funzionale `1bd9e9d`, inviato a master dopo fetch/merge senza aggiornamenti remoti da integrare. Build GitHub Pages completata. Lo smoke sul sito ufficiale https://matteoawi.github.io/parola/ conferma geometria originale su 21 superfici, tutti i 36 disegni, favicon Lucide, versione 6.5.2 e pagina licenze disponibile. Report pubblico `smoke-icons-6.5.2.json`; report locale separato conservato. Nessun errore JavaScript nello smoke pubblico.
