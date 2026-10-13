"""Stage and verify the Arabic pack before adding it to the published manifest."""
import hashlib,json,pathlib,re,shutil,subprocess,sys,unicodedata
ROOT=pathlib.Path(__file__).resolve().parents[1]
CACHE=ROOT/'.venv/ar-hoda-cache'
VOICE='Microsoft Hoda (ar-EG)'
def norm(text):
    text=unicodedata.normalize('NFC',text).lower().replace('’',"'").replace('‘',"'").replace('`',"'")
    text=re.sub('[\u064B-\u065F\u0670\u0640]','',text)
    return ' '.join(re.sub('[.,!?؟،؛:;…«»“”"()]',' ',text).split())
def inventory():
    requests=json.loads((ROOT/'data/audio-requests.json').read_text(encoding='utf-8'))
    course=json.loads((ROOT/'data/course.json').read_text(encoding='utf-8'))
    for item in course['items']+course['vocab']:
        texts=[item['text']['ar'],*item.get('accepted',{}).get('ar',[])]
        for text in texts:
            requests.setdefault('ar|'+norm(text),{'lang':'ar','text':text,'say':text})
            for word in re.sub('[.,!?؟،؛:;…«»“”"()]',' ',text).split():
                requests.setdefault('ar|'+norm(word),{'lang':'ar','text':word,'say':word})
    for lesson in json.loads((ROOT/'data/alphabet.json').read_text(encoding='utf-8'))['ar']['lessons']:
        for card in lesson['cards']:
            context=card.get('context') or 'alpha_'+card['id']
            key='ar|'+norm(card['speech'])+'|'+context
            requests[key]={'lang':'ar','text':card['speech'],'say':card['speech'],'context':context}
    return requests
requests=inventory()
selected={k:r for k,r in requests.items() if r['lang']=='ar'}
unique={}
for key,request in selected.items():
    say=request.get('say',request['text'])
    fingerprint=hashlib.sha256((VOICE+'|rate=0|'+say).encode()).hexdigest()
    request['fingerprint']=fingerprint
    unique.setdefault(fingerprint,{'fingerprint':fingerprint,'say':say})
if sys.argv[1]=='prepare':
    CACHE.mkdir(parents=True,exist_ok=True)
    (CACHE/'requests.json').write_text(json.dumps(list(unique.values()),ensure_ascii=False),encoding='utf-8')
    print(f'Arabic inventory: {len(selected)} entries, {len(unique)} unique recordings')
elif sys.argv[1]=='publish':
    for fingerprint in unique:
        clip=CACHE/(fingerprint+'.mp3')
        if not clip.exists() or clip.stat().st_size<500: raise RuntimeError('Missing or empty Arabic clip')
        probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','json',str(clip)]))
        if float(probe['format']['duration'])<.1: raise RuntimeError('Invalid Arabic duration')
    manifest=json.loads((ROOT/'audio/manifest.json').read_text(encoding='utf-8'))
    total=0
    for key,request in selected.items():
        fingerprint=request.pop('fingerprint')
        source=CACHE/(fingerprint+'.mp3')
        filename='audio/ar-hoda-'+fingerprint[:20]+'.mp3'
        shutil.copyfile(source,ROOT/filename)
        manifest['entries'][key]={'path':filename,'lang':'ar','text':request['text'],'voice':VOICE,'quality':'system-synthetic-not-human-reviewed','provider':'Windows System.Speech; generated locally','bytes':source.stat().st_size}
        total+=source.stat().st_size
    manifest.update(version=6,languages=['it','en','ar','ru'],missingLanguages=[],reviewedByNativeSpeakers=False)
    for name,data in [('audio/manifest.json',manifest),('data/audio-requests.json',requests)]:
        (ROOT/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
    print(f'Published Arabic pack: {len(selected)} entries, {len(unique)} unique MP3s, {sum((CACHE/(f+".mp3")).stat().st_size for f in unique)} bytes')
