const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const btn = document.getElementById('btn');
const restartBtn = document.getElementById('btn-restart');
const timer = document.getElementById('timer');

let score = 0;
let lastHole;
let timeUp = false;
let countdown;
let peepTimeout;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        console.log("It's the same...");
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    if (timeUp) return;
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    peepTimeout = setTimeout(() => {
        hole.classList.remove('up');
        peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    countdown = 15; // 15 seconds
    updateTimer();
    setTimeout(() => {
        timeUp = true;
        clearInterval(timerInterval);
        clearTimeout(peepTimeout);
        timer.textContent = 0; // Mostrar 0 cuando el tiempo se agote
    }, countdown * 1000);
}

function bonk(e) {
    if (!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));

btn.addEventListener('click', startGame);

restartBtn.addEventListener('click', () => {
    // Restart the game.
    // ...
  
    // Refresh the screen.
    location.reload();
});

function updateTimer() {
    timer.textContent = countdown;
    countdown--;
    if (countdown >= 0) {
        timerInterval = setTimeout(updateTimer, 1000);
    }
}
