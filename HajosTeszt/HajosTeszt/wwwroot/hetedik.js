var id = 1;
var helyesvalasz = 0;

window.onload = letöltés();
    
function letöltés() {
    fetch(`/questions/${id}`)
        .then(response => response.json())
        .then(data => kérdésMegjelenítés(data)
    );
}

function kérdésMegjelenítés(kérdés) {
    let x = document.getElementById("kerdes-szoveg");
    x.innerText = kérdés.questionText;


    let y = document.getElementById("valasz" + 1);
    y.innerText = kérdés.answer1;
    y = document.getElementById("valasz" + 2);
    y.innerText = kérdés.answer2;
    y = document.getElementById("valasz" + 3);
    y.innerText = kérdés.answer3;

    let z = document.getElementById("kep1");
    if (kérdés.image != "") {
        z.src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    } else { z.src = "" }
    helyesvalasz = kérdés.correctAnswer;
    
}
function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data));
}    

function next() {
    id++;
    kérdésBetöltés(id);

    for (var i = 1; i < 4; i++) {
        var x = document.getElementById("valasz" + i);
        x.classList.remove("rossz");
        x.classList.remove("jó");
    }
}

function prev() {
    if (id > 1) {
        id--;
    } else {}
    kérdésBetöltés(id);
    for (var i = 1; i < 4; i++) {
        var x = document.getElementById("valasz" + i);
        x.classList.remove("rossz");
        x.classList.remove("jó");
    }
}

function helyese(n) {
    var x = document.getElementById("valasz" + n);
    if (helyesvalasz == n) { x.classList.add("jó"); } else { x.classList.add("rossz"); }
}
