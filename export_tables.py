"""Regenerate the complete coded Markdown export; no CSV export."""
import json
from pathlib import Path
root = Path(__file__).resolve().parent
rows = json.loads((root / 'data/studies.json').read_text())
def cell(v):
    if isinstance(v, (dict, list)): v = json.dumps(v, ensure_ascii=False)
    return str(v).replace('|', '\\|').replace('\n', '<br>')
parts = ['# LoMED: complete coded study records', '172-study paper snapshot. Fields reproduce the supplied coding; they are not a fresh source-paper verification. Limitation analyses exclude records marked acknowledged-only.']
for s in rows:
    parts += [f"## {s['id']}. {s['title']}", '| Field | Coded value |\n| --- | --- |', '\n'.join(f'| {cell(k)} | {cell(v)} |' for k,v in s.items())]
(root / 'survey-data.md').write_text('\n\n'.join(parts)+'\n')
