var kérdések;
var kérdés = new Array();

var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;
var timeoutHandler;
var kérdéssorszám = 1;
var correctAnswer = 0;
var hotList = [];
window.onload = function () {
    init();
}
function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    document.getElementById("kerdes-szoveg").innerText = kérdés.questionText
    document.getElementById("valasz1").innerText = kérdés.answer1
    document.getElementById("valasz2").innerText = kérdés.answer2
    document.getElementById("valasz3").innerText = kérdés.answer3
    if (kérdés.image != "") {
        document.getElementById("kep1").innerHTML = "<img src='https://szoft1.comeback.hu/hajo/" + kérdés.image + "'>"
    } else {
        document.getElementById("kep1").innerText = ""
    }
    correctAnswer = kérdés.correctAnswer
    document.getElementById("valasz1").classList.remove("jó", "rossz");
    document.getElementById("valasz2").classList.remove("jó", "rossz");
    document.getElementById("valasz3").classList.remove("jó", "rossz");

    document.getElementById("valasz1").style.pointerEvents = "auto"
    document.getElementById("valasz2").style.pointerEvents = "auto"
    document.getElementById("valasz3").style.pointerEvents = "auto"
}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${ response.status }`)
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
                if (displayedQuestion == undefined && destination == 0) { //!!!!!!!!!!!!!
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
        );
}

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }


    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }

    fetch(questions / count)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás kérdésszám - letöltés: ${ response.status }`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                numberOfQuestions = q
            }
        );
}

function next() {
    clearTimeout(timeoutHandler)
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
}

function prev() {
    clearTimeout(timeoutHandler)
    displayedQuestion--
    if (displayedQuestion < 0) {
        displayedQuestion = 0
        kérdésMegjelenítés()
    } else {
        kérdésMegjelenítés()
    }
}

function helyese(n) {
    document.getElementById("valasz1").style.pointerEvents = "none"
    document.getElementById("valasz2").style.pointerEvents = "none"
    document.getElementById("valasz3").style.pointerEvents = "none"
    if (n == correctAnswer) {
        document.getElementById("valasz" + n).classList.add("jó")
        hotList[displayedQuestion].goodAnswers++
        if (hotList[displayedQuestion].goodAnswers == 3) {
            if (nextQuestion > numberOfQuestions) {
                window.alert("done");
                return;
            }
            kérdésBetöltés(nextQuestion, displayedQuestion)
            nextQuestion++
        }
    } else {
        document.getElementById("valasz" + n).classList.add("rossz")
        document.getElementById("valasz" + correctAnswer).classList.add("jó")
        hotList[displayedQuestion].goodAnswers = 0
    }
    timeoutHandler = setTimeout(next, 3000);
}