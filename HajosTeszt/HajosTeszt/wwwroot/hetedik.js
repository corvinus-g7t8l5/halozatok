var kérdések;
var a = 0;

window.onload = letöltés();
    
function letöltés() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data)
    );
}

function letöltésBefejeződött(k) {
    console.log("Sikeres letöltés");
    console.log(k);
    kérdések = k;
    kérdésMegjelenítés(kérdések);
}

function kérdésMegjelenítés(kérdés) {
    let x = document.getElementById("kerdes-szoveg");
    x.innerText = kérdés[a].questionText;


    let y = document.getElementById("valasz" + 1);
    y.innerText = kérdés[a].answer1;
    y = document.getElementById("valasz" + 2);
    y.innerText = kérdés[a].answer2;
    y = document.getElementById("valasz" + 3);
    y.innerText = kérdés[a].answer3;

    let z = document.getElementById("kep1");
    if (kérdés[a].image != "") {
        z.src = "https://szoft1.comeback.hu/hajo/" + kérdés[a].image;
    } else { z.src = ""}
    
}

function next() {
    a++;
    if (a == kérdések.length) a = 0;
    kérdésMegjelenítés(kérdések);
    for (var i = 1; i < 4; i++) {
        var x = document.getElementById("valasz" + i);
        x.classList.remove("rossz");
        x.classList.remove("jó");
    }
}

function prev() {
    a--;
    if (a < 0) a = kérdések.length - 1;
    kérdésMegjelenítés(kérdések);
}

function helyese(n) {
    var x = document.getElementById("valasz" + n);
    if (kérdések[a].correctAnswer == n) { x.classList.add("jó"); } else { x.classList.add("rossz"); }
    //if (kérdések[a].correctAnswer == n) { x.style.background = "green"; } else { x.style.background = "red"; }
}