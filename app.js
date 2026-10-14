// Frozen paper values are used only if data fails to load.
const COVERAGE = [["Subject separation",57.1],["Temporal split",9.7],["External validation",16.7],["Prospective validation",2.6],["Robustness",39.5],["Calibration",25.0]];
function coverageFromData(rows){
  const counts={subject:[0,0],temporal:[0,0],external:[0,0],prospective:[0,0],robustness:[0,0],calibration:[0,0]};
  rows.forEach(s=>{
    const c=s.claims||{}, t=s.translation||{}, ch=s.challenges?.all||[];
    const missing=['Irregular intervals','Missing visits','Sparse observations'].some(k=>ch.includes(k));
    const required={subject:c.crossSubject, temporal:c.sequential||c.progression, external:c.domainShift||t.deployment, prospective:t.deployment, robustness:missing||ch.includes('Multimodal fusion')||c.domainShift, calibration:c.uncertainty};
    Object.entries(required).forEach(([k,v])=>{if(v===true){counts[k][1]++;if(s.validation?.[k]===true)counts[k][0]++;}});
  });
  return Object.keys(counts).map((k,i)=>[COVERAGE[i][0],counts[k][1]?100*counts[k][0]/counts[k][1]:0]);
}
// Corpus-wide validation practices are computed from data/studies.json at load time.
const VAL_KEYS = [
  ["Subject-level split","subject"],["Temporal split","temporal"],["External validation","external"],
  ["Prospective validation","prospective"],["Multi-site validation","multisite"],
  ["Robustness analysis","robustness"],["Fairness analysis","fairness"],["Calibration analysis","calibration"]
];
// Year strata that include studies added after the original search (marked with * in the chart).
const LATE_YEARS = new Set(["2025","2026"]);
// Placeholder values that should not be shown as detail boxes.
const EMPTY_VALUES = new Set(['NA','N/A','Not Applicable','Not applicable','Not reported','Not verified','Not assessed','Not specified','Not Specified']);

let studies=[], filtered=[], page=1, pageSize=12, view='cards';
const $=s=>document.querySelector(s); const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

function bars(el,data){el.innerHTML=data.map(([label,val])=>`<div class="bar-row"><div class="bar-label">${esc(label)}</div><div class="bar-track"><div class="bar-fill" style="width:${val}%"></div></div><div class="bar-value">${val.toFixed(1)}%</div></div>`).join('')}

function charts(){
  const n=studies.length||1;
  // Validation practices (% of all studies)
  bars($('#validation-bars'),VAL_KEYS.map(([l,k])=>[l,100*studies.filter(s=>s.validation&&s.validation[k]).length/n]));
  // Claim-conditioned coverage using the paper’s fixed applicability rules
  bars($('#coverage-bars'),coverageFromData(studies));
  // Studies per year
  const yc={};studies.forEach(s=>{if(s.year)yc[s.year]=(yc[s.year]||0)+1});
  const years=Object.keys(yc).sort().map(y=>[LATE_YEARS.has(y)?y+'*':y,yc[y]]);
  const mx=Math.max(1,...years.map(x=>x[1]));
  $('#year-chart').innerHTML=years.map(([y,c])=>`<div class="year-item"><strong>${c}</strong><div class="ybar" style="--h:${Math.max(4,c/mx*78)}%"></div><span>${esc(y)}</span></div>`).join('');
  // Top application areas (multi-label counts)
  const ac={};studies.forEach(s=>(s.areas||[]).forEach(a=>{if(a!=='Outside specified categories')ac[a]=(ac[a]||0)+1}));
  const areas=Object.entries(ac).sort((a,b)=>b[1]-a[1]).slice(0,6);
  const am=Math.max(1,...areas.map(x=>x[1]));
  $('#area-list').innerHTML=areas.map(([a,c])=>`<div class="area-item"><div>${esc(a)}<div class="area-meter"><i style="--w:${c/am*100}%"></i></div></div><strong>${c}</strong></div>`).join('');
  donut();
}

// Source donut: split computed from the data; colours taken from the legend swatches in styles.css.
function donut(){
  const n=studies.length; if(!n)return;
  const ieee=studies.filter(s=>s.source==='IEEE Xplore').length, acl=n-ieee, cut=(100*ieee/n).toFixed(1);
  const d=$('.donut'), iSw=$('.legend i.ieee'), aSw=$('.legend i.acl');
  if(d&&iSw&&aSw){
    const ci=getComputedStyle(iSw).backgroundColor, ca=getComputedStyle(aSw).backgroundColor;
    d.style.background=`conic-gradient(${ci} 0 ${cut}%, ${ca} ${cut}% 100%)`;
  }
  const total=$('.donut strong'); if(total)total.textContent=n;
  const counts=document.querySelectorAll('.legend p strong');
  if(counts.length>=2){counts[0].textContent=ieee;counts[1].textContent=acl}
}

function uniq(key){return [...new Set(studies.map(s=>s[key]).filter(Boolean))].sort((a,b)=>String(a).localeCompare(String(b),undefined,{numeric:true}))}
function fillSelect(id,items){const el=$(id);items.forEach(v=>{let o=document.createElement('option');o.value=v;o.textContent=v;el.appendChild(o)})}
function setupFilters(){fillSelect('#source-filter',uniq('source'));fillSelect('#year-filter',uniq('year').sort((a,b)=>b-a));fillSelect('#area-filter',uniq('primaryArea'));fillSelect('#modality-filter',uniq('modality'))}

function matches(s){let q=$('#search').value.trim().toLowerCase();if(q){let hay=[s.title,s.authors,s.dataset,s.task,s.subdomain,s.modality,s.primaryArea,s.abstract,s.techniques].join(' ').toLowerCase();if(!hay.includes(q))return false}let sf=$('#source-filter').value,yf=$('#year-filter').value,af=$('#area-filter').value,mf=$('#modality-filter').value,vf=$('#validation-filter').value;if(sf&&s.source!==sf)return false;if(yf&&s.year!==yf)return false;if(af&&s.primaryArea!==af)return false;if(mf&&s.modality!==mf)return false;if(vf&&!s.validation[vf])return false;return true}
function applyFilters(resetPage=true){if(resetPage)page=1;filtered=studies.filter(matches);render()}

function tags(s){let t=[];if(s.modality)t.push(s.modality);if(s.primaryArea&&s.primaryArea!=='Outside specified categories')t.push(s.primaryArea);if(s.validation.temporal)t.push('Temporal split');if(s.validation.external)t.push('External validation');if(s.validation.prospective)t.push('Prospective');if(s.validation.robustness)t.push('Robustness');return t.slice(0,4)}
function card(s){return `<article class="study-card" data-id="${s.id}" tabindex="0"><div class="study-top"><span class="study-source">${esc(s.source)} · ${esc(s.publisher)}</span><span class="study-year">${esc(s.year)}</span></div><h3>${esc(s.title)}</h3><div class="study-authors">${esc(s.authors)}</div><div class="study-tags">${tags(s).map(t=>`<span class="tag ${['Temporal split','External validation','Prospective','Robustness'].includes(t)?'yes':''}">${esc(t)}</span>`).join('')}</div><div class="study-foot"><span>${esc(s.task||s.subdomain||'Longitudinal study')}</span><b>View details →</b></div></article>`}

function render(){let pages=Math.max(1,Math.ceil(filtered.length/pageSize));if(page>pages)page=pages;let start=(page-1)*pageSize,items=filtered.slice(start,start+pageSize);$('#results-count').textContent=`${filtered.length} of ${studies.length} studies`;let box=$('#study-results');box.className=`study-results ${view==='compact'?'compact':''}`;box.innerHTML=items.length?items.map(card).join(''):`<div class="empty-state">No studies match these filters.</div>`;$('#page-status').textContent=`Page ${page} of ${pages}`;$('#prev-page').disabled=page<=1;$('#next-page').disabled=page>=pages;box.querySelectorAll('.study-card').forEach(el=>{el.addEventListener('click',()=>openStudy(+el.dataset.id));el.addEventListener('keydown',e=>{if(e.key==='Enter')openStudy(+el.dataset.id)})})}

function detail(label,value,wide=false){if(!value||EMPTY_VALUES.has(String(value).trim()))return'';return `<div class="detail-box ${wide?'wide':''}"><small>${esc(label)}</small><p>${esc(value)}</p></div>`}

function openStudy(id){let s=studies.find(x=>x.id===id);if(!s)return;let vals=[['Subject split','subject'],['Temporal split','temporal'],['External','external'],['Prospective','prospective'],['Multi-site','multisite'],['Robustness','robustness'],['Fairness','fairness'],['Calibration','calibration']];let links=[];if(s.url)links.push(`<a href="${esc(s.url)}" target="_blank" rel="noopener">Paper page ↗</a>`);if(s.pdf&&/^https?:\/\//.test(s.pdf))links.push(`<a href="${esc(s.pdf)}" target="_blank" rel="noopener">PDF ↗</a>`);if(/^10\./.test(String(s.doi||'').trim()))links.push(`<a href="https://doi.org/${esc(String(s.doi).trim())}" target="_blank" rel="noopener">DOI ↗</a>`);$('#dialog-content').innerHTML=`<div class="dialog-body"><div class="dialog-kicker">${esc(s.source)} · ${esc(s.publisher)} · ${esc(s.year)}</div><h2>${esc(s.title)}</h2><div class="dialog-authors">${esc(s.authors)}</div><div class="dialog-actions">${links.join('')}</div><div class="detail-grid">${detail('Main task',s.task)}${detail('Application',s.primaryArea)}${detail('Data type / source',s.dataType)}${detail('Dataset (as coded)',s.dataset)}${detail('Dataset size',s.datasetSize)}${detail('Modality',s.modality)}${detail('Model type',s.modelType)}${detail('Temporal aspect',s.temporalAspect,true)}${detail('Techniques / methods',s.techniques,true)}${detail('Evaluation metrics',s.metrics,true)}${detail('Key findings',s.findings,true)}${detail('Missing-data strategy',s.missingData.primary)}${detail('Primary challenge',s.challenges.primary)}${detail('Reproducibility',s.reproducibility,true)}${detail('Observed limitation',s.observedLimitations.primary,true)}${detail('Abstract',s.abstract,true)}</div><div class="detail-box wide" style="margin-top:10px"><small>Validation practices — filled: coded present; hollow: not coded present (including unclear or unreported)</small><div class="validation-pills">${vals.map(([l,k])=>`<span class="${s.validation[k]?'on':''}">${s.validation[k]?'✓ ':'○ '}${l}</span>`).join('')}</div></div></div>`;$('#study-dialog').showModal()}

async function init(){try{let res=await fetch('data/studies.json');if(!res.ok)throw new Error(`data/studies.json returned HTTP ${res.status}`);const data=await res.json();if(!Array.isArray(data)||!data.length)throw new Error('Survey data must be a nonempty array');studies=data.map((s,i)=>({...s,id:i+1,year:String(s.year||''),validation:s.validation||{},missingData:s.missingData||{},challenges:s.challenges||{},observedLimitations:s.observedLimitations||{}}));filtered=[...studies];charts();setupFilters();render()}catch(e){console.error('Survey initialization failed:',e);bars($('#coverage-bars'),COVERAGE);$('#study-results').innerHTML=`<div class="load-error">Survey data could not be loaded: ${esc(e.message)}. Check that <code>data/studies.json</code> exists. If you opened index.html directly, serve the folder locally (for example with <code>python -m http.server</code>) or use GitHub Pages.</div>`;$('#results-count').textContent='Data unavailable'}}

['#source-filter','#year-filter','#area-filter','#modality-filter','#validation-filter'].forEach(id=>$(id).addEventListener('change',()=>applyFilters()));$('#search').addEventListener('input',()=>applyFilters());$('#reset-filters').addEventListener('click',()=>{['#search','#source-filter','#year-filter','#area-filter','#modality-filter','#validation-filter'].forEach(id=>$(id).value='');applyFilters()});$('#prev-page').addEventListener('click',()=>{page--;render();$('#explorer').scrollIntoView()});$('#next-page').addEventListener('click',()=>{page++;render();$('#explorer').scrollIntoView()});document.querySelectorAll('.view-toggle button').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.view;document.querySelectorAll('.view-toggle button').forEach(x=>x.classList.toggle('active',x===b));render()}));$('.dialog-close').addEventListener('click',()=>$('#study-dialog').close());$('#study-dialog').addEventListener('click',e=>{if(e.target===$('#study-dialog'))$('#study-dialog').close()});init();