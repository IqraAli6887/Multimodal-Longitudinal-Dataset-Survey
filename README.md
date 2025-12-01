# Multimodal-Longitudinal-Dataset-Survey
<details>
<summary>Clinical & Epidemiological Cohorts</summary>

| Dataset | Target         | Modalities | Country/Source | Ref              | Focus                              | Age     | Acquisition                             | Follow-Up             | Dates        | Size/Visits             | Features                   | Challenges                        | Public |
| ------- | -------------- | ---------- | -------------- | ---------------- | ---------------------------------- | ------- | --------------------------------------- | --------------------- | ------------ | ----------------------- | -------------------------- | --------------------------------- | ------ |
| ADNI    | Alzheimer's    | M (I,P,T)  | USA, Canada    | [103](https://ieeexplore.ieee.org/document/8857827),[35](https://ieeexplore.ieee.org/document/9669504)[82](https://ieeexplore.ieee.org/document/10489807)[15](https://ieeexplore.ieee.org/document/10483639)
       | Progression, synthetic imaging     | 55–90   | sMRI, PET, CSF, genetics, cognitive     | 6–12 mo, 2–10 yrs     | 2004–present | 800–1,100+, 4–10 visits | multi-modal, multi-center  | Missing data, scanner variability | ✅      |
| OASIS   | AD, aging      | M (I,P,T)  | USA            | [5,6,7,8,9,10]   | Brain atrophy, staging             | 42–95   | sMRI, PET, tests                        | 3–5 visits, ≤10 yrs   | 2005–present | 416–1,000+, 1–5 visits  | Standardized diagnoses     | Small size, heterogeneous imaging | ✅      |
| AIBL    | Early AD       | M (I,P,T)  | Australia      | [11]             | Biomarkers, multi-modal prediction | 60+     | MRI, PET, blood, genetics, lifestyle    | 18 mo, 5+ waves       | 2006–present | ~1,100, 5–6 visits      | Lifestyle+genetics         | Small, Australia-centric          | ✅      |
| BLSA    | Brain aging    | M (P,T)    | USA            | [12]             | Aging, hazard prediction           | 60–100+ | Clinical, neuropsych, MRI               | Median 4–6 visits     | 1958–present | ~1,500+                 | Long-term follow-up        | Restricted access                 | ✅      |
| PPMI    | Parkinson's    | M (I,P,T)  | Multi-site     | [13,14,15,16,17] | PD progression, biomarkers         | 40–80   | DAT-SPECT, MRI, CSF, clinical, genetics | Annual, up to 8 yrs   | 2010–present | ~600–800                | PD-specific multi-modal    | Class imbalance                   | ✅      |
| ELSA    | Health         | M (P,T)    | UK             | [18,19,12]       | Cognitive, socioeconomic           | 50+     | Surveys, biomarkers, cognition          | Biennial, 9 waves     | 2002–present | ~12,000                 | Large UK cohort            | No imaging, limited biomarkers    | ✅      |
| ABCD    | Youth neurodev | M (I,P,T)  | Netherlands    | [20,21]          | Development, risk prediction       | 9–19    | MRI, fMRI, DTI, surveys                 | Annual, 10-yr planned | 2016–present | ~11,800                 | Largest youth neuroimaging | Attrition, site harmonization     | ✅      |

</details>

<details>
<summary>Electronic Health Records (EHR)</summary>

| Dataset           | Target             | Modalities | Country/Source | Ref           | Focus                    | Age   | Acquisition                  | Follow-Up                 | Dates         | Size/Visits | Features                   | Challenges                         | Public |
| ----------------- | ------------------ | ---------- | -------------- | ------------- | ------------------------ | ----- | ---------------------------- | ------------------------- | ------------- | ----------- | -------------------------- | ---------------------------------- | ------ |
| MIMIC-III         | ICU, multi-cond    | M (P,T)    | USA            | [22,23,24,25] | Mortality, organ failure | Adult | Vitals, labs, notes          | ICU stay                  | 2001–2012     | 60,000+     | High temporal res          | Missing values, irregular sampling | ✅      |
| OptumLabs         | Chronic disease    | M (P,T)    | USA            | [26]          | Population health        | Adult | Labs, meds, claims           | Multi-year                | 2007–present  | Millions    | Very large, multi-modal    | Heterogeneous, restricted          | ❌      |
| Mayo EHR          | Multi-cond         | M (I,P,T)  | USA            | [27,28,29]    | Clinical trajectories    | Adult | Labs, vitals, imaging, notes | Weeks–years               | 2000s–present | Large       | High-fidelity, multi-modal | Access restrictions, heterogeneous | ❌      |
| M Health Fairview | Multi-cond         | M (P,T)    | USA            | [29]          | Clinical outcomes        | Adult | Labs, meds, visits           | Multiple windows          | 2010s–present | Many        | Integrated hospital data   | Missing/irregular, private         | ❌      |
| eICU-CRD          | ICU                | M (P,T)    | USA            | [30,31]       | Mortality, interventions | Adult | Vitals, labs, treatments     | ICU stay, multiple points | 2014–2015     | 200,000+    | Multi-hospital ICU         | Short follow-up, heterogeneity     | ✅      |
| N3C               | Multi-cond (COVID) | M (P,T)    | USA            | [32]          | COVID trajectories, risk | All   | Labs, diagnoses, treatments  | Multi-visit               | 2020–present  | Millions    | Multi-site                 | Missing labs, site heterogeneity   | ✅      |
| UVA EHR           | Multi-cond         | M (P,T)    | USA            | [33]          | Chronic disease          | Adult | Labs, meds, diagnoses        | Multi-year                | 2000s–present | 473,915 pts | Large regional cohort      | Irregular visits, private          | ❌      |

</details>

<details>
<summary>Behavioral & Social Datasets</summary>

| Dataset          | Target             | Modalities | Country/Source | Ref        | Focus                      | Age                      | Acquisition | Follow-Up  | Dates        | Size/Visits | Features                | Challenges                                | Public |
| ---------------- | ------------------ | ---------- | -------------- | ---------- | -------------------------- | ------------------------ | ----------- | ---------- | ------------ | ----------- | ----------------------- | ----------------------------------------- | ------ |
| Reddit Timelines | Mood, psych shifts | T          | Global         | [34,35]    | Mental health              | Adult                    | Continuous  | 2015–2022  | Varies       | Large       | Longitudinal posts      | Noisy, variable frequency                 | ✅      |
| TalkLife         | Peer support       | T          | Global         | [36,37,38] | Mental health              | Adolescents/young adults | Continuous  | 2018–2022  | Varies       | Large       | Peer interactions       | Limited demographics, variable engagement | ❌      |
| Twitter7         | Mood, depression   | T          | Global         | [39,40]    | Longitudinal mental health | Teens–Adults             | Tweets      | Multi-year | Multi-year   | Large       | Temporal mood tracking  | Noisy, demographic bias                   | ✅      |
| Weibo            | Mood, stress       | T          | China          | [40]       | Mental health              | Teens–Adults             | Posts       | Multi-year | Multi-year   | Large       | Chinese, cross-cultural | Platform-specific, NLP                    | ❌      |
| LoSST-AD         | AD language        | T          | UK             | [41]       | Clinical speech            | Older adults             | Transcripts | 2–5 visits | 2–5 sessions | Small       | Longitudinal speech     | Small cohort                              | ❌      |

</details>
