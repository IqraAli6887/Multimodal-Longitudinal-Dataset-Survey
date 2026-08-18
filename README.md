# LoMED

**A Cross-Domain Survey of Longitudinal Modeling Approaches, Evaluation Practices, and Datasets**

LoMED is a cross-domain survey of **149 longitudinal modeling studies** spanning computational health, biomedical signal processing, multimodal AI, behavioral analysis, and natural language processing.

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

Across the 149 studies:

* **87.2%** use sequential modeling.
* Only **8.7%** use temporal train/test splits.
* Only **4.7%** report prospective validation.
* External validation remains uncommon.
* Calibration and uncertainty-aware evaluation are rarely reported.
* No study in the surveyed corpus jointly combines **temporal and external validation**.

When evaluation is assessed only where a validation dimension is relevant to the claims of a study, just:

**71 / 321 = 22.1%**

of applicable **study–evaluation pairs** are satisfied.

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

Examples include:

* regular longitudinal cohorts,
* irregular electronic health records,
* sparse behavioral histories,
* asynchronous multimodal observations,
* repeated conversations and social-media timelines.

### 2. Temporal Evidence

What information about change over time is actually available.

Examples include:

* repeated visits,
* chronological histories,
* unequal time intervals,
* state sequences,
* multimodal observations across time.

### 3. Temporal Objective

What the model attempts to infer from that evidence.

Examples include:

* progression prediction,
* trajectory classification,
* future-state forecasting,
* state-transition detection,
* longitudinal summarization,
* multimodal progression analysis.

### 4. Modeling Inductive Bias

How temporal structure is represented computationally.

The surveyed literature includes:

* recurrent neural networks,
* LSTMs and GRUs,
* convolutional models,
* transformers,
* large language models,
* graph-based models,
* neural ODEs,
* generative longitudinal models,
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

The survey finds that they are rarely combined within the same study, even when multiple forms of generalization are implied.

## Missing and Irregular Longitudinal Data

Missing visits, sparse observations, and irregular sampling are recurring characteristics of longitudinal datasets.

Among studies facing these challenges, many introduce architectural or preprocessing mechanisms for handling missingness. However, explicitly **handling missing data is not equivalent to demonstrating robustness to missing data**.

LoMED therefore separates:

**model capability**

from

**empirical evidence of resilience**.

This distinction applies more broadly throughout the survey.

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

The literature search covered **IEEE Xplore** and the **ACL Anthology**.

Screening pipeline:

**815 retrieved**
↓
**551 after automated filtering**
↓
**520 after manual screening**
↓
**149 included studies**

Final corpus:

* **132 IEEE studies**
* **17 ACL Anthology studies**

The quantitative survey covers English-language full papers published between **2019 and the search freeze of 15 March 2025**.

Because the corpus is dominated by IEEE studies, aggregate percentages describe the combined IEEE–ACL sample and should not be interpreted as prevalence estimates for longitudinal NLP alone.

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

* the interactive LoMED survey website,
* the complete coded study collection,
* downloadable survey data,
* and supplementary resources accompanying the paper.

The paper link will be added after publication.

## Paper

**LoMED: A Cross-Domain Survey of Longitudinal Modeling Approaches, Evaluation Practices, and Datasets**

*Paper link coming soon.*
