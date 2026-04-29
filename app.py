from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/gettier")
def gettier():
    return render_template("gettier.html")

@app.route("/nozick")
def nozick():
    return render_template("nozick.html")

@app.route("/descartes")
def descartes():
    return render_template("descartes.html")

@app.route("/contextualism")
def contextualism():
    return render_template("contextualism.html")

@app.route("/fricker")
def fricker():
    return render_template("fricker.html")


if __name__ == "__main__":
    app.run(debug=True, port=5000)
