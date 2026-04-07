# Episteme — Interactive Epistemology

**PHIL 210: Introduction to Epistemology — Duke University**  
Final project: an interactive multi-page website teaching epistemology through visualization.

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
├── app.py                  # Flask server — page routes + future API stubs
├── requirements.txt
├── .gitignore
│
├── templates/              # Jinja2 HTML templates
│   ├── base.html           # Shared layout: <head>, nav, fonts
│   ├── index.html          # Home / module overview
│   ├── nozick.html         # Module 01 — Nozick Tracking Theory (interactive)
│   └── gettier.html        # Module 02 — Gettier Problem Explorer
│
└── static/
    ├── css/
    │   ├── base.css        # CSS variables, reset, nav, footer, shared utils
    │   ├── nozick.css      # Styles for the Nozick interactive page
    │   └── pages.css       # Styles for index.html and gettier.html
    └── js/
        └── nozick.js       # All JS for the Nozick possible-worlds visualizer
```

---

## Pages

| Route | Template | Description |
|---|---|---|
| `/` | `index.html` | Landing page with module cards and reading list |
| `/nozick` | `nozick.html` | Interactive tracking theory visualizer |
| `/gettier` | `gettier.html` | Gettier case explorer (in progress) |

---

## Adding a Module

1. Create `templates/<name>.html` extending `base.html`
2. Add page-specific styles to `static/css/pages.css` (or a new file)
3. Add JS to `static/js/<name>.js` if needed
4. Register the route in `app.py`
5. Add a nav link in `templates/base.html`
6. Add a module card to `templates/index.html`

---

## Planned Modules

- [x] Module 01 — Nozick's Tracking Theory
- [ ] Module 02 — Gettier Problem Explorer
- [ ] Module 03 — TBD (Descartes' doubt / epistemic injustice / internalism–externalism)
