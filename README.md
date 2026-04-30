# Episteme — Interactive Epistemology

**PHIL 210: Introduction to Epistemology — Duke University**  
An interactive multi-page website teaching epistemology through visualization and interactivity.

🌐 **Live site: [www.epistemeonline.net](https://www.epistemeonline.net)**

---

## Quick Start

```bash
# 1. Enter the project directory
cd episteme

# 2. Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate        # macOS / Linux
# venv\Scripts\activate         # Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the development server
python app.py

# 5. Open in browser
#    http://localhost:5000
```

---

## Project Structure

```
episteme/
├── app.py                      # Flask server — page routes
├── requirements.txt
├── Procfile                    # Gunicorn entry point for Render deployment
├── .gitignore
│
├── templates/                  # Jinja2 HTML templates
│   ├── base.html               # Shared layout: <head>, nav, fonts
│   ├── index.html              # Home / module overview
│   ├── descartes.html          # Module 01 — Descartes' Stages of Doubt
│   ├── gettier.html            # Module 02 — Gettier Problem Explorer
│   ├── nozick.html             # Module 03 — Nozick's Tracking Theory
│   ├── contextualism.html      # Module 04 — Contextualism & the Bank Cases
│   └── fricker.html            # Module 05 — Epistemic Injustice
│
└── static/
    ├── css/
    │   ├── base.css            # CSS variables, reset, nav, footer
    │   ├── pages.css           # Shared styles for static pages
    │   ├── shared-module.css   # MCQ engine + shared section styles
    │   ├── nozick.css          # Nozick interactive page styles
    │   ├── gettier.css         # Gettier interactive page styles
    │   ├── descartes.css       # Descartes page styles
    │   ├── contextualism.css   # Contextualism page styles
    │   └── fricker.css         # Fricker page styles
    └── js/
        ├── nozick.js           # Nozick scenario selector
        ├── nozick-explorer.js  # Possible worlds blob visualizer
        ├── gettier.js          # Gettier case walkthrough + solution tester
        ├── descartes.js        # Stages of doubt + belief inventory
        ├── contextualism.js    # Bank cases + stakes slider + theories grid
        └── fricker.js          # Epistemic injustice scenario explorer
```

---

## Pages

| Route | Template | Description |
|---|---|---|
| `/` | `index.html` | Landing page with module cards and reading list |
| `/descartes` | `descartes.html` | Stages of doubt, belief inventory, Cogito |
| `/gettier` | `gettier.html` | Case walkthrough + solution tester |
| `/nozick` | `nozick.html` | Tracking theory + possible worlds visualizer |
| `/contextualism` | `contextualism.html` | Bank cases + stakes slider |
| `/fricker` | `fricker.html` | Epistemic injustice scenario explorer |

---

## Modules

- [x] Module 01 — Descartes' Stages of Doubt
- [x] Module 02 — Gettier Problem Explorer
- [x] Module 03 — Nozick's Tracking Theory
- [x] Module 04 — Contextualism & the Bank Cases
- [x] Module 05 — Epistemic Injustice (Fricker)

---

## Adding a Module

1. Create `templates/<name>.html` extending `base.html`
2. Add page-specific styles to `static/css/<name>.css`
3. Add JS to `static/js/<name>.js`
4. Register the route in `app.py`
5. Add a nav link in `templates/base.html`
6. Add a module card to `templates/index.html`

---

## Deployment

Hosted on [Render](https://render.com) with a custom domain via Squarespace DNS.  
The `Procfile` runs `gunicorn app:app` for production.  
Note: the free tier may take up to 30 seconds to wake up after inactivity.