from flask import Flask, render_template, session, jsonify, request
import random
from words import WORDS, MESSAGES

app = Flask(__name__)
app.secret_key = "super_secret_key"

@app.route("/")
def index():
    session["level"] = 0
    session["score"] = 0
    return render_template("index.html")

@app.route("/game")
def game():
    return render_template("game.html")

@app.route("/api/level")
def level():
    level = session.get("level", 0)

    if level >= len(WORDS):
        return jsonify({"end": True})

    word = WORDS[level]
    shuffled = list(word)
    random.shuffle(shuffled)

    return jsonify({
        "level": level + 1,
        "scrambled": "".join(shuffled),
        "score": session.get("score", 0),
        "pause": True,
        "pause_msg": MESSAGES[level % len(MESSAGES)]
    })

@app.route("/api/answer", methods=["POST"])
def answer():
    data = request.get_json()
    user_answer = data["answer"].lower().strip()

    level = session.get("level", 0)
    correct = WORDS[level]

    if user_answer == correct:
        session["level"] += 1
        session["score"] += 10
        return jsonify({"correct": True})

    return jsonify({"correct": False})

@app.route("/api/skip", methods=["POST"])
def skip():
    session["level"] += 1
    return jsonify({"success": True})

if __name__ == "__main__":
    app.run(debug=True)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)