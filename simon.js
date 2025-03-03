let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false; //game hasnt started
let level = 0;
let highestScore = 0;


let h2 =document.querySelector("h2");
let highestScoreDisplay = document.querySelector("#highest-score"); // Element to display the highest score

// Start the game
document.addEventListener("keypress", function() {
    if (started === false) {
        console.log("Game is started");
        started = true;   

        levelUp();
    }
});


function gameFalsh(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}


function userFalsh(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}


function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx= Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randBtn);
    // console.log(randIdx);
    // console.log(randColor);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFalsh(randBtn);

}


function checkAns(idx) {
    if(userSeq[idx] == gameSeq[idx]) {
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else {
        if (level > highestScore){
            highestScore = level; //update highest score
            highestScoreDisplay.innerText = `Highest Score: ${highestScore}`; // Update the display
            // document.querySelector("#highestScore").innerText = highestScore;
        }
        h2.innerHTML = `Game over!  your score was <b>${level}</b>. Highest score: <b>${highestScore}</b>  <br>Press any key to start. `;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPres() {
    
    let btn = this;
    userFalsh(btn);

    userColor  = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPres);
}


function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
