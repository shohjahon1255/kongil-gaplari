async function load() {
    let res = await fetch("/api/level");
    let data = await res.json();

    if (data.end) {
        document.body.innerHTML = "<h1>O‘yin tugadi ❤️ — Shohjahondan</h1>";
        return;
    }

    document.getElementById("level").innerText = "Bosqich " + data.level;
    document.getElementById("scrambled").innerText = data.scrambled;

    if (data.pause) {
        showPause(data.pause_msg);
    }
}

async function check() {
    let answer = document.getElementById("answer").value;

    let res = await fetch("/api/answer", {   // 🔥 to‘g‘rilandi
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ answer })
    });

    let data = await res.json();

    if (data.correct) {
        document.getElementById("msg").innerText = "To‘g‘ri ✅";
        document.getElementById("answer").value = "";
        load();
    } else {
        document.getElementById("msg").innerText = "Xato ❌";
    }
}

function showPause(text) {
    document.getElementById("pauseText").innerText = text;
    document.getElementById("pause").style.display = "flex";

    setTimeout(() => {
        document.getElementById("pause").style.display = "none";
    }, 4000);
}

load();
