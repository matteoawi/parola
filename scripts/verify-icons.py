"""Verify original-file provenance and absence of authored SVG geometry in shipped artifacts."""
import base64,hashlib,json,pathlib,re,xml.etree.ElementTree as ET
ROOT=pathlib.Path(__file__).resolve().parents[1]
vendor=ROOT/'assets/icons/lucide';sources=json.loads((vendor/'sources.json').read_text(encoding='utf-8'))
originals={name:(vendor/(name+'.svg')).read_text(encoding='utf-8') for name in sources['sha256']}
def geometry(svg):return [ET.tostring(child,encoding='unicode') for child in ET.fromstring(svg)]
for name,digest in sources['sha256'].items():assert hashlib.sha256((vendor/(name+'.svg')).read_bytes()).hexdigest()==digest,name
assert geometry((ROOT/'icon.svg').read_text(encoding='utf-8'))==geometry(originals['layers-2'])
for name in ['src/icons.mjs','index.html','Parola-offline.html']:
 text=(ROOT/name).read_text(encoding='utf-8')
 values=json.loads(re.search(r'^const originalSVGs=(.*);$',text,re.M).group(1))
 assert values==originals,name+' changed upstream markup'
 assert text.count('<svg')==len(originals),name+' contains additional authored SVGs'
 assert 'Copyright (c) 2026 Lucide Icons and Contributors' in text,name+' missing license'
 assert 'Copyright (c) 2013-present Cole Bemis' in text,name+' missing inherited license'
offline=(ROOT/'Parola-offline.html').read_text(encoding='utf-8')
embedded=re.search(r'data:image/svg\+xml;base64,([^"]+)',offline).group(1)
assert base64.b64decode(embedded)==(ROOT/'icon.svg').read_bytes()
svgs={p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*.svg') if '.git' not in p.parts}
expected={'icon.svg'}|{f'assets/icons/lucide/{name}.svg' for name in originals}
assert svgs==expected,svgs^expected
print(f'PASS: {len(originals)} upstream originals, all inline markup, favicon geometry and both licenses')
