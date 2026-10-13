#!/usr/bin/env python3
"""Generate static neural MP3 packs through edge-tts; never called by the website.
Install edge-tts in a separate environment. This is an unofficial Edge client,
not an official API contract. Existing published files change only after success.
"""
import argparse,asyncio,hashlib,json,pathlib,re,shutil,unicodedata,subprocess
R=pathlib.Path(__file__).resolve().parents[1]
VOICES={'it':'it-IT-ElsaNeural','en':'en-US-JennyNeural','ar':'ar-SA-ZariyahNeural','ru':'ru-RU-SvetlanaNeural'}
def norm(text,lang):
 text=unicodedata.normalize('NFC',text).lower().replace('’',"'").replace('‘',"'").replace('`',"'")
 if lang=='ar':text=re.sub('[\u064B-\u065F\u0670\u0640]','',text)
 return re.sub(r'\s+',' ',re.sub('[.,!?؟،؛:;…«»“”"()]',' ',text)).strip()
def inventory():
 requests=json.loads((R/'data/audio-requests.json').read_text(encoding='utf-8'))
 alphabet=json.loads((R/'data/alphabet.json').read_text(encoding='utf-8'))
 for lang,course in alphabet.items():
  for lesson in course['lessons']:
   for card in lesson['cards']:
    context=card.get('context') or 'alpha_'+card['id'];card['context']=context
    if lang=='ru' and card['model'] in ['ь','ъ']:card['speech']='мягкий знак' if card['model']=='ь' else 'твёрдый знак'
    if lang=='ar' and lesson['id'] in ['breaks','variants']:card['speech']=card['cue']
    key=lang+'|'+norm(card['speech'],lang)+'|'+context
    requests.setdefault(key,{'lang':lang,'text':card['speech'],'say':card['speech']})
 return requests,alphabet
async def main():
 import edge_tts
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--sample',action='store_true');args=p.parse_args()
 requests,alphabet=inventory();manifest=json.loads((R/'audio/manifest.json').read_text(encoding='utf-8'))
 catalog=await asyncio.wait_for(edge_tts.list_voices(),20);available={v['ShortName'] for v in catalog}
 if not all(voice in available for voice in VOICES.values()):raise RuntimeError('A selected voice is unavailable; no language substitution is allowed.')
 selected=list(requests.items())
 if args.sample:selected=[next((k,v) for k,v in selected if v['lang']==lang) for lang in VOICES]
 cache=R/'.venv/neural-cache';cache.mkdir(parents=True,exist_ok=True);generated={};unique={}
 for key,request in selected:
  voice=VOICES[request['lang']];say=request.get('say',request['text']);fingerprint=hashlib.sha256((voice+'|'+say).encode()).hexdigest()
  unique.setdefault(fingerprint,{'voice':voice,'say':say,'file':cache/(fingerprint+'.mp3')})
 missing=[item for item in unique.values() if not item['file'].exists() or item['file'].stat().st_size<500]
 if not shutil.which('ffmpeg'):raise RuntimeError('ffmpeg is required to split batch recordings.')
 batches=[]
 for voice in VOICES.values():
  items=[item for item in missing if item['voice']==voice]
  batches.extend(items[start:start+20] for start in range(0,len(items),20))
 limit=asyncio.Semaphore(2);completed=len(unique)-len(missing)
 async def batch(items):
  nonlocal completed
  text=' '.join(item['say'].rstrip('.!?؟')+'.' for item in items)
  batchpath=cache/(hashlib.sha256((items[0]['voice']+'|'+text).encode()).hexdigest()+'.batch.mp3')
  async with limit:
   for attempt in range(3):
    audio=bytearray();boundaries=[]
    try:
     async def collect():
      async for chunk in edge_tts.Communicate(text,items[0]['voice'],rate='-5%',boundary='SentenceBoundary').stream():
       if chunk['type']=='audio':audio.extend(chunk['data'])
       elif chunk['type']=='SentenceBoundary':boundaries.append(chunk)
     await asyncio.wait_for(collect(),120)
     if len(boundaries)!=len(items):raise RuntimeError('Unexpected sentence alignment; no guessed audio is published.')
     batchpath.write_bytes(audio)
     for index,(item,boundary) in enumerate(zip(items,boundaries)):
      start=max(0,boundary['offset']/10000000-.012)
      end=boundaries[index+1]['offset']/10000000 if index+1<len(boundaries) else (boundary['offset']+boundary['duration'])/10000000+.08
      subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-ss',str(start),'-i',str(batchpath),'-t',str(end-start),'-ar','24000','-ac','1','-c:a','libmp3lame','-b:a','48k',str(item['file'])],check=True,timeout=30)
      if item['file'].stat().st_size<500:raise RuntimeError('Empty clip')
     completed+=len(items);print(f'Generated {completed}/{len(unique)} unique recordings',flush=True);break
    except Exception as error:
     if attempt==2:raise RuntimeError('TTS batch failed ('+type(error).__name__+'); published audio unchanged.') from None
     await asyncio.sleep(4*(attempt+1))
   await asyncio.sleep(1)
 await asyncio.gather(*(batch(items) for items in batches))
 for key,request in selected:
  lang=request['lang'];voice=VOICES[lang];say=request.get('say',request['text']);file=unique[hashlib.sha256((voice+'|'+say).encode()).hexdigest()]['file']
  filename=manifest['entries'].get(key,{}).get('path','audio/'+hashlib.sha256(key.encode()).hexdigest()[:20]+'.mp3')
  generated[key]={'path':filename,'lang':lang,'text':request['text'],'voice':voice,'quality':'neural-not-human-reviewed','provider':'Edge online TTS via edge-tts','bytes':file.stat().st_size,'source':file}
 if args.sample:print('Samples saved in .venv/neural-cache; published files unchanged.');return
 for key,entry in generated.items():shutil.copyfile(entry.pop('source'),R/entry['path'])
 manifest.update(version=6,languages=list(VOICES),missingLanguages=[],entries=generated,reviewedByNativeSpeakers=False)
 for path,data in [('audio/manifest.json',manifest),('data/audio-requests.json',requests),('data/alphabet.json',alphabet)]:
  (R/path).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
 print(f'{len(generated)} neural clips published to source inventory; rebuild the site.')
if __name__=='__main__':asyncio.run(main())
