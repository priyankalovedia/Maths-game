let playing = false;
let score;
let timeremaining;
let action;
let correctanswer;

document.getElementById("startreset").onclick = function(){
    if (playing == true) {
        location.reload();
    } else {
        playing = true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;

        show("timeremaining");
        timeremaining = 60;
        document.getElementById("trvalue").innerHTML = timeremaining;

        hide("gameover");

        document.getElementById("startreset").innerHTML = "Restart Game";
        showCountDown();
        generateQA();
    }
}

function show(id) {
    document.getElementById(id).style.display = "block";
}

function hide(id) {
    document.getElementById(id).style.display = "none";
}

function showCountDown() {
    action = setInterval(function(){
        timeremaining--;
        document.getElementById("trvalue").innerHTML = timeremaining;
        if(timeremaining == 0) {
            stopCountDown();
            show("gameover");
            document.getElementById("gameover").innerHTML = `<p>Game Over</p><p>Your Score is ${score}</p>`;
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

function stopCountDown() {
    clearInterval(action);
}

function generateQA() {
    let x = 1 + Math.floor(9 * Math.random());
    let y = 1 + Math.floor(9 * Math.random());
    correctanswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;

    let correctposition = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + correctposition).innerHTML = correctanswer;

    let answers = [correctanswer];
    for (let i = 1; i <= 4; i++) {
        if (i != correctposition) {
            let wronganswer;
            do {
                wronganswer = (1 + Math.floor(9 * Math.random())) * (1 + Math.floor(9 * Math.random()));
            } while (answers.indexOf(wronganswer) > -1);

            answers.push(wronganswer);
            document.getElementById("box" + i).innerHTML = wronganswer;
        }
    }
}

for (let i = 1; i <= 4; i++) {
    document.getElementById("box" + i).onclick = function(){
        if (playing == true) {
            if (parseInt(this.innerHTML) == correctanswer) {
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                show("correct");
                hide("wrong");
                setTimeout(function(){
                    hide("correct");
                }, 1000);
                generateQA();
            } else {
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                }, 1000);
            }
        }
    }
}
