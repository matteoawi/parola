"""Vendor untouched Twemoji drawings, with a pinned upstream commit and license."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import urllib.request,json,hashlib
R=Path(__file__).resolve().parents[1];dest=R/'assets/pictures/twemoji';dest.mkdir(parents=True,exist_ok=True)
def fetch(url):
 with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Parola-build'}),timeout=45) as response:return response.read()
commit=json.loads(fetch('https://api.github.com/repos/jdecked/twemoji/git/ref/tags/v17.0.3'))['object']['sha']
base=f'https://raw.githubusercontent.com/jdecked/twemoji/{commit}/'
codes={'book':'1f4d6','house':'1f3e0','school':'1f3eb','water':'1f4a7','tea':'1f375','coffee':'2615','door':'1f6aa','pen':'1f58a'}
def download(pair):
 name,code=pair;data=fetch(base+'assets/svg/'+code+'.svg');(dest/(name+'.svg')).write_bytes(data);return name,hashlib.sha256(data).hexdigest()
with ThreadPoolExecutor(max_workers=8) as pool:hashes=dict(pool.map(download,codes.items()))
(dest/'LICENSE-GRAPHICS').write_bytes(fetch(base+'LICENSE-GRAPHICS'))
(dest/'sources.json').write_text(json.dumps({'library':'Twemoji','version':'17.0.3','commit':commit,'repository':'https://github.com/jdecked/twemoji','license':'CC-BY-4.0','assets':codes,'sha256':hashes},indent=2)+'\n',encoding='utf-8',newline='\n')
print('Vendored',len(hashes),'original Twemoji drawings at',commit)
