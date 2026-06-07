async function loadLevel() {
    const res = await fetch("/api/level");
    const data = await res.json();

    if (data.end) {
        document.querySelector(".container").innerHTML = 
            <h1>🎉 Tabriklaymiz!</h1>
            <p>Siz barcha so‘zlarni topdingiz ❤️</p>
            <a class="btn" href="/">Qayta boshlash</a>
        ;
        hearts();
        return;
    }

    document.getElementById("level").innerText =
        Level: ${data.level} | Score: ${data.score};

    document.getElementById("scrambled").innerText = data.scrambled;
    document.getElementById("answer").value = "";
    document.getElementById("msg").innerText = "";

    if (data.pause) {
        showPause(data.pause_msg);
    }
}

async function check() {
    const answer = document.getElementById("answer").value;

    const res = await fetch("/api/answer", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({answer: answer})
    });

    const data = await res.json();
    const msg = document.getElementById("msg");

    if (data.correct) {
        msg.className = "good";
        msg.innerText = "❤️ To‘g‘ri javob!";
        hearts();

        setTimeout(loadLevel, 1200);
    } else {
        msg.className = "bad";
        msg.innerText = "❌ Noto‘g‘ri, yana urinib ko‘ring";
    }
}

function showPause(text) {
    const pause = document.getElementById("pause");
    const pauseText = document.getElementById("pauseText");

    if (!pause || !pauseText) return;

    pauseText.innerText = text;
    pause.style.display = "flex";

    setTimeout(() => {
        pause.style.display = "none";
    }, 3500);
}

function hearts() {
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerText = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 2500);
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        check();
    }
});

loadLevel();
