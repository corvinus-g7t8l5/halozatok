window.onload = function () {
    for (var i = 1; i <= 10; i++) {
        var x = document.getElementById("kulsoDiv");
        x.innerHTML += '<div class="belsoDiv" id="' + i + '"></div>';
        var y = document.getElementById(i);
        y.style.opacity = i * 0.1;
    }

    
    function faktor(n) {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * faktor(n - 1);
        }
    }


    let f = document.getElementById("pascal");
    for (var s = 0; s < 9; s++) {
        let sor = document.createElement("div");
        sor.classList.add("sor");
        f.appendChild(sor);
        for (var o = 0; o < s+1; o++) {
            let szam = document.createElement("div");
            szam.classList.add("elem");
            szam.innerText = faktor(s)/(faktor(o)*(faktor(s-o)));
            sor.appendChild(szam);
        }
    }
}
