# LoMED

**A Cross-Domain Survey of Longitudinal Modeling Approaches, Evaluation Practices, and Datasets**

LoMED is a cross-domain survey of **172 longitudinal modeling studies** spanning computational health, biomedical signal processing, multimodal AI, behavioral analysis, and natural language processing.

The survey examines not only **how longitudinal data are modeled**, but also whether the evaluation used in each study provides appropriate evidence for the longitudinal claims being made.

> **Longitudinal data ≠ longitudinal models ≠ longitudinal evidence.**

## Why LoMED?

Longitudinal datasets contain repeated observations of individuals, patients, users, or systems over time. They enable models to reason about progression, transitions, temporal dependencies, and evolving states.

However, simply processing a sequence of observations does not establish that a model can generalize across:

* future time periods,
* unseen individuals,
* missing or irregular observations,
* new cohorts or domains,
* changing data distributions,
* or real-world deployment settings.

LoMED therefore studies the relationship between **longitudinal modeling claims and the evaluation evidence used to support them**.

## Key Findings

Across the 172 studies:

* **86.6%** use sequential modeling (149 of 172).
* Only **11.0%** use temporal train/test splits.
* Only **4.1%** report prospective validation (7 of 172).
* External validation remains uncommon (**12.2%**).
* Calibration is rarely reported (**3.5%**).
* No study in the surveyed corpus jointly combines **temporal and external validation**.

When evaluation is assessed only where a validation check is required by a study's coded claims or challenges, just:

**89 / 390 = 22.8%**

of required checks are performed, and **65.5%** of studies perform none of their required checks.

Temporal splits are more common in ACL Anthology studies (**26.5%**) than in IEEE Xplore studies (**7.2%**), but remain a minority practice in both.

This shows a substantial gap between the sophistication of longitudinal models and the evidence used to demonstrate longitudinal generalization.

## LoMED Taxonomy

LoMED organizes longitudinal learning through five connected layers:

**Observation Regime**
↓
**Temporal Evidence**
↓
**Temporal Objective**
↓
**Modeling Inductive Bias**
↓
**Evaluation Requirement**

### 1. Observation Regime

How repeated observations are collected.

The survey distinguishes three regimes:

* **scheduled cohorts**, such as ADNI, OASIS, PPMI, and ELSA, with planned visits;
* **event-driven clinical records**, such as MIMIC and eICU, where observations follow care events;
* **activity-driven user timelines**, such as Reddit, Twitter, and TalkLife, where observations follow user behavior.

Asynchronous multimodal records cut across all three.

### 2. Temporal Evidence

What information about change over time is actually available.

For each regime, LoMED asks three questions:

* Is the **order** of observations reliable?
* Are the **gaps** between observations meaningful?
* Is **change** directly observable, or only inferred?

### 3. Temporal Objective

What the model attempts to infer from that evidence.

The survey groups objectives into six families:

* trajectory classification,
* change and transition detection,
* forecasting,
* timeline summarization,
* longitudinal representation learning,
* multimodal progression analysis.

### 4. Modeling Inductive Bias

How temporal structure is represented computationally.

The surveyed literature includes:

* non-sequential models applied to longitudinal features,
* recurrent and continuous-time models (RNNs, LSTMs, GRUs, time-aware RNNs, neural ODEs, Hawkes processes),
* generative and latent-progression models,
* transformers and pretrained language models, including hierarchical variants,
* state-space models,
* large language models,
* graph-based models,
* multimodal fusion architectures.

### 5. Evaluation Requirement

What evidence is needed to substantiate the corresponding longitudinal claim.

For example:

| Longitudinal claim                 | Relevant evaluation              |
| ---------------------------------- | -------------------------------- |
| Generalization over time           | Temporal / chronological split   |
| Generalization across people       | Subject-disjoint evaluation      |
| Robustness to missing observations | Missingness / robustness testing |
| Transfer across cohorts or domains | External validation              |
| Deployment readiness               | Prospective validation           |
| Uncertainty-aware prediction       | Calibration analysis             |
| Domain or temporal shift           | Distribution-shift evaluation    |

The central idea is that **evaluation should be conditioned on the claim being made rather than treated as a universal checklist**.

## Claim–Evaluation Gap

One of the main findings of LoMED is that different forms of validation test fundamentally different properties.

**Subject-level evaluation** asks:

> Does the model generalize to unseen individuals?

**Temporal evaluation** asks:

> Does the model generalize forward in time?

**External validation** asks:

> Does the model transfer to a different cohort, site, dataset, or domain?

**Prospective validation** asks:

> Does performance remain reliable when the model is evaluated on genuinely future observations or in deployment-like settings?

These forms of evidence are complementary rather than interchangeable.

The survey finds that they are rarely combined within the same study: only **10** studies combine subject-level and temporal evaluation, **16** combine subject-level and external evaluation, and **none** combine temporal and external validation.

## Missing and Irregular Longitudinal Data

Missing visits, sparse observations, and irregular sampling are recurring characteristics of longitudinal datasets.

Among the **56** studies facing these challenges, **38** identify a handling strategy, but only **19** both handle the issue and test robustness to it. Explicitly **handling missing data is not equivalent to demonstrating robustness to missing data**.

LoMED therefore separates:

**model capability**

from

**empirical evidence of resilience**.

The same distinction applies to interpretability: of the **66** studies that report interpretability, only **5** use temporal splits and **1** conducts prospective validation.

## Domains Covered

The corpus spans several research communities, including:

* Alzheimer's disease and cognitive decline
* Parkinson's disease
* mental health and depression
* electronic health records
* intensive-care forecasting
* medical imaging
* physiological monitoring
* behavioral modeling
* social-media analysis
* longitudinal dialogue
* timeline modeling
* multimodal longitudinal learning

This cross-domain perspective allows evaluation practices that are usually studied independently to be compared under a common longitudinal framework.

## Survey Corpus

The literature search covered **IEEE Xplore** and the **ACL Anthology** in two search rounds.

Screening pipeline:

**875 retrieved** (799 IEEE · 76 ACL)
↓
**591 after automated filtering** (536 IEEE · 55 ACL)
↓
**555 after manual screening** (511 IEEE · 44 ACL)
↓
**172 included studies** (after removing 2 duplicates)

Final corpus:

* **138 IEEE Xplore studies**
* **34 ACL Anthology studies**

The quantitative survey covers English-language full papers published between **January 2018 and the search freeze of 12 October 2026**; the earliest included study is from 2019. The 2025 and 2026 strata are small and include studies added in the updated search.

Because the corpus is dominated by IEEE studies, aggregate percentages describe the combined IEEE–ACL sample and should not be interpreted as prevalence estimates for longitudinal NLP alone.

All 172 studies were coded by one primary coder; a second reviewer piloted the codebook on 12 studies. Evidence and rationale fields accompany judgment-based labels to keep coding auditable, but they do not substitute for independent double-coding.

## Interactive Study Explorer

The accompanying LoMED website provides an interactive interface for exploring the coded literature.

Users can search and filter studies by characteristics including:

* publication year,
* publisher,
* modality,
* application area,
* dataset,
* model family,
* temporal challenge,
* missing-data strategy,
* validation strategy,
* interpretability,
* robustness,
* reproducibility,
* and evaluation practice.

The complete paper-level coding is also provided for further analysis.

## Research Questions

LoMED addresses four main research questions:

**RQ1.** How do longitudinal observation regimes shape the temporal evidence available across domains?

**RQ2.** Which temporal objectives and modeling inductive biases are used to exploit this evidence?

**RQ3.** To what extent are longitudinal claims matched by appropriate temporal, subject-level, robustness, uncertainty, and external evaluation?

**RQ4.** Which methodological gaps currently limit transferable longitudinal modeling?

## Main Takeaway

The main challenge in longitudinal AI is increasingly not simply whether a model can ingest longer histories.

The more important question is:

> **Does the evaluation actually test the kind of longitudinal generalization that the study claims?**

LoMED argues for moving from generic evaluation checklists toward **claim-conditioned longitudinal evaluation**, where the validation protocol follows directly from the temporal, subject-level, robustness, uncertainty, transfer, or deployment claim being made.

## Resources

This repository contains:

* the interactive LoMED survey website (`index.html`, `styles.css`, `app.js`),
* the complete coded study collection (`data/studies.json`),
* downloadable survey data (`survey-data.csv`, `survey-data.md`),
* and supplementary resources accompanying the paper.

### Updating the data

To add newly coded studies and regenerate the downloads, run from the repository root:

```bash
python merge_survey_data.py data/studies.json new-entries.json
python export_tables.py data/studies.json
```

The website computes its validation, year, application, and source charts directly from `data/studies.json`, so they update automatically.

To preview the site locally:

```bash
python -m http.server
```

## Paper

**LoMED: A Cross-Domain Survey of Longitudinal Modeling Approaches, Evaluation Practices, and Datasets**

*Paper link coming soon.*
