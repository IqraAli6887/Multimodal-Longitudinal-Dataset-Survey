"""Verify the coded snapshot against the supplied paper, without recoding studies."""
import json
from pathlib import Path
from collections import Counter
rows=json.loads((Path(__file__).resolve().parent/'data/studies.json').read_text())
assert len(rows)==172
assert Counter(s['source'] for s in rows)=={'IEEE Xplore':138,'ACL Anthology':34}
expected={'subject':62,'temporal':19,'external':21,'prospective':7,'robustness':37,'calibration':6,'fairness':2,'multisite':2}
for k,n in expected.items(): assert sum(s['validation'][k] is True for s in rows)==n,k
counts={k:[0,0] for k in ['subject','temporal','external','prospective','robustness','calibration']}
hist=Counter()
for s in rows:
    c,t,ch=s['claims'],s['translation'],s['challenges']['all']
    missing=any(k in ch for k in ['Irregular intervals','Missing visits','Sparse observations'])
    req={'subject':c['crossSubject'],'temporal':c['sequential'] or c['progression'],'external':c['domainShift'] or t['deployment'],'prospective':t['deployment'],'robustness':missing or 'Multimodal fusion' in ch or c['domainShift'],'calibration':c['uncertainty']}
    a=b=0
    for k,v in req.items():
        if v: counts[k][1]+=1;counts[k][0]+=s['validation'][k];a+=1;b+=s['validation'][k]
    if a: hist['none' if b==0 else 'all' if a==b else 'some']+=1
assert list(counts.values())==[[28,49],[15,154],[8,48],[1,38],[32,81],[5,20]]
assert hist=={'none':112,'some':53,'all':6}
for k,n in [('temporal',10),('external',16)]: assert sum(s['validation']['subject'] and s['validation'][k] for s in rows)==n
assert not any(s['validation']['temporal'] and s['validation']['external'] for s in rows)
a=[s for s in rows if 'Interpretability analysis' in s['characteristics']['all']]
assert (len(a),sum(s['validation']['temporal'] for s in a),sum(s['validation']['prospective'] for s in a))==(66,5,1)
a=[s for s in rows if any(k in s['challenges']['all'] for k in ['Irregular intervals','Missing visits','Sparse observations'])]
assert len(a)==56
assert sum(s['missingData']['primary']!='No clear strategy' for s in a)==38
assert sum(s['missingData']['primary']!='No clear strategy' and s['validation']['robustness'] for s in a)==19
assert sum(s['claims']['sequential'] for s in rows)==149
assert sum(s['missingData']['primary']=='No clear strategy' for s in rows)==102
subset=[s for s in rows if s['limitationCoding']=='absence-coded']
assert len(subset)==158
assert sum('Reliance on static metrics only' in s['observedLimitations']['all'] for s in subset)==145
assert len({s['id'] for s in rows})==172
print('PASS: corpus, sources, validation totals, six coverage ratios, study-level coverage, joint validation, interpretability, missingness, sequential modeling, and 145/158 static-metrics-only subset.')
