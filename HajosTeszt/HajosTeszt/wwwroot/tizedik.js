var questionId = 1;
var jóVálasz = 0;

var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 5; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában

window.onload = letöltés();
window.onload = function (e) {
    init();
    console.log("Oldal betöltve...");
    document.getElementById("elore_gomb").onclick = next;
    document.getElementById("vissza_gomb").onclick = prev;
    /*kérdésBetöltés(questionId);*/
    /*????????*/
}

function letöltés() {
    /*fetch(`/questions/${questionId}`)
        .then(response => response.json())
        .then(data => kérdésMegjelenítés(data)
    );*/
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion]/*nem egészen értem, mit kellene itt csinálni*/.question;
    if (!kérdés) return;
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

    for (var i = 1; i < 4; i++) {
        var f = document.getElementById("valasz" + i);
        f.classList.remove("rossz");
        f.classList.remove("jó");
    }
    document.getElementById("valasz1").style.pointerEvents = "auto";
    document.getElementById("valasz2").style.pointerEvents = "auto";
    document.getElementById("valasz3").style.pointerEvents = "auto";
    jóVálasz = kérdés.correctAnswer;

}

var timeoutHandler; timeoutHandler = setTimeout(next, 3000);

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    //Első kérdések letöltése
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}
function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
            }
    );
}

function next() {
    clearTimeout(timeoutHandler)/* ???????elromlott minden, már a kérdések sem jelennek meg????*/
    questionId++;
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés();
}

function prev() {
    if (questionId > 1) {
        questionId--;
    } else { }
    kérdésBetöltés();
}

function helyese(n) {
    var x = document.getElementById("valasz" + n);
    if (jóVálasz == n) { x.classList.add("jó"); } else { x.classList.add("rossz"); }
    document.getElementById("valasz1").style.pointerEvents = "none";
    document.getElementById("valasz2").style.pointerEvents = "none";
    document.getElementById("valasz3").style.pointerEvents = "none";

}
