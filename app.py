from flask import Flask, render_template

app = Flask(__name__)


# ── Page routes ──────────────────────────────────────────────────────────────

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/nozick")
def nozick():
    return render_template("nozick.html")


@app.route("/gettier")
def gettier():
    return render_template("gettier.html")


# ── Future API routes (stub) ─────────────────────────────────────────────────

# @app.route("/api/scenarios")
# def scenarios():
#     """Return Nozick scenario data as JSON — useful if you move data server-side."""
#     pass


# ── Run ──────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    app.run(debug=True, port=5000)
