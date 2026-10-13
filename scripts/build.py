"""Build a dependency-free static site and an optional single-file offline edition."""
import pathlib,json,re,base64,argparse,html as markup
R=pathlib.Path(__file__).resolve().parents[1]
import subprocess,sys
# Always derive SVG markup from the checked, existing upstream originals.
subprocess.run([sys.executable,str(R/'scripts/update-icons.py')],check=True)
version=(R/'VERSION').read_text(encoding='utf-8').strip()
p=argparse.ArgumentParser();p.add_argument('--standalone',type=pathlib.Path);p.add_argument('--require-all-audio',action='store_true');a=p.parse_args()
course=json.loads((R/'data/course.json').read_text(encoding='utf-8'));ui=json.loads((R/'data/ui.json').read_text(encoding='utf-8'));manifest=json.loads((R/'audio/manifest.json').read_text(encoding='utf-8'))
alphabet=json.loads((R/'data/alphabet.json').read_text(encoding='utf-8'))
requests=json.loads((R/'data/audio-requests.json').read_text(encoding='utf-8'))
picture_data={item['picture']:'data:image/svg+xml;base64,'+base64.b64encode((R/item['picture'].removeprefix('./')).read_bytes()).decode() for item in course['vocab'] if item.get('picture')}
missing=[k for k,v in requests.items() if k not in manifest['entries'] or not (R/manifest['entries'][k]['path']).is_file() or manifest['entries'][k].get('lang')!=v['lang']]
if a.require_all_audio and missing:raise SystemExit(f'Release blocked: {len(missing)} missing or mismatched audio entries. First: {missing[:5]}')
css=(R/'src/styles.css').read_text(encoding='utf-8');js='\n'.join(re.sub(r'^import .*?;\n','', (R/'src'/f).read_text(encoding='utf-8'),flags=re.M).replace('export ','') for f in ['introduction.mjs','adventure.mjs','progression.mjs','literacy.mjs','engine.mjs','sentence-games.mjs','alphabet-mahjong.mjs','storage.mjs','icons.mjs','audio.mjs','audio-pack.mjs','motion.mjs','board-viewport.mjs','sound-effects.mjs','app.mjs'])
def html(embedded):
 data=json.dumps({'COURSE':course,'ALPHABET':alphabet,'UI':ui,'MANIFEST':manifest,'AUDIO':embedded,'PRONUNCIATIONS':{k:v['say'] for k,v in requests.items() if v.get('say',v['text'])!=v['text']},'VERSION':version},ensure_ascii=False,separators=(',',':')).replace('</','<\\/')
 return '<!doctype html>\n<html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#216e5d"><meta name="description" content="Parola: Mahjong, frasi e lingue. Un gioco autonomo in italiano, inglese, arabo e russo."><title>Parola 6 — Mahjong delle lingue</title><meta name="application-name" content="Parola 6"><link rel="icon" href="./icon.svg" type="image/svg+xml"><style>'+css+'</style></head><body><div id="app"></div><div id="announcer" class="sr-only" aria-live="polite"></div><script>globalThis.PAROLA_DATA='+data+';</script><script type="module">'+js+"\nif(location.protocol!=='file:'&&'serviceWorker' in navigator){addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}\n"+'</script></body></html>'
def hosted(document):
 return document.replace('<title>Parola 6 —',f'<title>Parola {version} —').replace('</head>',f'<meta name="application-version" content="{version}"><link rel="manifest" href="./manifest.webmanifest"></head>')
(R/'index.html').write_text(hosted(html({})),encoding='utf-8',newline='\n');print('Static site:',R/'index.html')
if a.standalone:
 audio={v['path']:'data:audio/mpeg;base64,'+base64.b64encode((R/v['path']).read_bytes()).decode() for v in manifest['entries'].values()}
 document=html(audio).replace("url('./assets/fonts/Nunito-variable.ttf')","url('data:font/ttf;base64,"+base64.b64encode((R/'assets/fonts/Nunito-variable.ttf').read_bytes()).decode()+"')")
 for source,data in picture_data.items():document=document.replace(source,data)
 offline_icon='<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,'+base64.b64encode((R/'icon.svg').read_bytes()).decode()+'">'
 if a.standalone.resolve()==(R/'index.html').resolve():document=hosted(document)
 else:document=document.replace('<title>Parola 6 —',f'<title>Parola {version} —').replace('</head>',f'<meta name="application-version" content="{version}"></head>').replace('<link rel="icon" href="./icon.svg" type="image/svg+xml">',offline_icon).replace('href="./changelog.html"','href="https://matteoawi.github.io/parola/changelog.html"').replace('href="./credits.html"','href="https://matteoawi.github.io/parola/credits.html"')
 a.standalone.write_text(document,encoding='utf-8',newline='\n');print('Standalone:',a.standalone,'bytes',a.standalone.stat().st_size)

# Public release notes share the source changelog with the repository.
notes=[];in_list=False
for line in (R/'CHANGELOG.md').read_text(encoding='utf-8').splitlines():
 if not line.startswith('- ') and in_list:notes.append('</ul>');in_list=False
 if line.startswith('# '):notes.append('<h1>'+markup.escape(line[2:])+'</h1>')
 elif line.startswith('## '):notes.append('<h2>'+markup.escape(line[3:])+'</h2>')
 elif line.startswith('- '):
  if not in_list:notes.append('<ul>');in_list=True
  notes.append('<li>'+markup.escape(line[2:])+'</li>')
 elif line.strip():notes.append('<p>'+markup.escape(line)+'</p>')
if in_list:notes.append('</ul>')
(R/'changelog.html').write_text('<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>Aggiornamenti — Parola '+version+'</title><meta name="application-version" content="'+version+'"><link rel="icon" href="./icon.svg"><style>body{margin:0;background:#f5f4ee;color:#163e38;font:17px/1.65 system-ui,sans-serif}main{max-width:740px;margin:0 auto;padding:32px 24px 64px}a{color:#216e5d}h1{line-height:1.2}h2{margin-top:36px}li{margin:8px 0}a:focus-visible{outline:3px solid #7461a4;outline-offset:4px}</style></head><body><main><a href="./">← Torna al gioco</a>'+''.join(notes)+'</main></body></html>',encoding='utf-8',newline='\n')

sources=json.loads((R/'assets/icons/lucide/sources.json').read_text(encoding='utf-8'))
license_text=(R/'assets/icons/lucide/LICENSE').read_text(encoding='utf-8')
links=''.join('<li><a href="./assets/icons/lucide/'+name+'.svg">'+markup.escape(name)+'</a></li>' for name in sorted(sources['sha256']))
credits='<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="application-version" content="'+version+'"><title>Fonti e licenze — Parola '+version+'</title><link rel="icon" href="./icon.svg"><style>body{margin:0;background:#f5f4ee;color:#163e38;font:17px/1.65 system-ui,sans-serif}main{max-width:740px;margin:auto;padding:32px 24px 64px}a{color:#216e5d}h1{line-height:1.2}h2{margin-top:32px}ul{columns:2; padding-inline-start:20px}pre{white-space:pre-wrap;overflow-wrap:anywhere;font:13px/1.65 ui-monospace,monospace}a:focus-visible{outline:3px solid #7461a4;outline-offset:4px}</style></head><body><main><a href="./">← Torna al gioco</a><h1>Fonti e licenze</h1><p>Le '+str(len(sources['sha256']))+' icone SVG di Parola provengono da <a href="https://lucide.dev/">Lucide</a>, pacchetto lucide-static '+markup.escape(sources['version'])+'. Le forme originali sono conservate; dimensioni e colori si adattano al gioco. Sono incluse nel sito e nel file offline.</p><p><a href="https://github.com/lucide-icons/lucide">Progetto originale</a> · <a href="./assets/icons/lucide/sources.json">Provenienza dei file</a> · <a href="./assets/icons/lucide/LICENSE">Licenza originale</a></p><h2>Carattere tipografico</h2><p>Nunito, distribuito localmente dal <a href="https://github.com/google/fonts/tree/main/ofl/nunito">progetto Google Fonts</a>, con <a href="./assets/fonts/OFL.txt">licenza SIL Open Font License 1.1</a>. Il file offline incorpora il carattere. <a href="./assets/fonts/sources.json">Provenienza e impronte</a>.</p><h2>Disegni originali</h2><ul>'+links+'</ul><h2>Licenze ISC e MIT</h2><pre>'+markup.escape(license_text)+'</pre></main></body></html>'
credits_temp=R/'credits.build-tmp'
credits=credits.replace('<h2>Disegni originali</h2>','<h2>Immagini del Mahjong</h2><p>Gli otto disegni a colori sono file originali <a href="https://github.com/jdecked/twemoji">Twemoji 17.0.3</a>, creati da Twitter e dagli autori di Twemoji, distribuiti con <a href="./assets/pictures/twemoji/LICENSE-GRAPHICS">licenza CC BY 4.0</a>. Nessuna forma modificata. <a href="./assets/pictures/twemoji/sources.json">Origine, commit e impronte</a>. Le immagini sono incluse anche nel file offline.</p><h2>Disegni originali Lucide</h2>')
credits=credits.replace('<h2>Carattere tipografico</h2>','<h2>Audio arabo</h2><p>247 registrazioni generate localmente con Microsoft Hoda (ar-EG), tramite Windows System.Speech, per 328 materiali del corso e dell’alfabeto. Il motore vocale non è distribuito con il sito. <a href="./docs/AUDIO-ARABO-6.11.0.md">Metodo, copertura e limiti</a>. <a href="https://learn.microsoft.com/en-us/dotnet/api/system.speech.synthesis.speechsynthesizer">Documentazione Microsoft</a>.</p><h2>Carattere tipografico</h2>')
credits_temp.write_text(credits,encoding='utf-8',newline='\n')
credits_temp.replace(R/'credits.html')
