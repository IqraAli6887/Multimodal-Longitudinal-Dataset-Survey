# LoMED Survey Website

A self-contained GitHub Pages website for **LoMED: A Cross-Domain Survey of Longitudinal Modeling Approaches, Evaluation Practices, and Datasets**.

## What is included

- `index.html` — the complete survey landing page
- `styles.css` — responsive visual design
- `app.js` — charts, filters, pagination, and study-detail modal
- `data/studies.json` — browser-ready data for the 149-paper explorer
- `survey-data.csv` — parsed downloadable version of the full coding sheet
- `survey-data.md` — original full coded survey table

## Publish on GitHub Pages

1. Create a new GitHub repository, for example `lomed-survey`.
2. Upload **all files and folders in this directory** to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.
6. GitHub will show the public Pages URL after deployment.

## Local preview

Because the data explorer loads `data/studies.json`, preview through a local web server rather than double-clicking the HTML file:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Optional paper PDF

The supplied manuscript source was used only as a reference and is **not copied into the public site**. If you want to publish the paper alongside the site, add the final PDF as `paper.pdf` and add a button/link to it in `index.html`.

## Notes

- No framework or build step is required.
- No external chart library is used.
- The 2025 corpus is partial because the survey search freeze is 15 March 2025.
- Claim-conditioned coverage is presented as a descriptive alignment measure, not a study-quality score.

## Add the arXiv paper link

A placeholder **arXiv** button is already included in the homepage hero. When the paper is on arXiv, open `index.html` and replace the `#` in this line:

```html
<a class="button button-secondary button-arxiv" href="#" aria-label="arXiv paper link — add URL later">arXiv <span>↗</span></a>
```

with your paper URL, for example:

```html
<a class="button button-secondary button-arxiv" href="https://arxiv.org/abs/XXXX.XXXXX" target="_blank" rel="noopener">arXiv <span>↗</span></a>
```
