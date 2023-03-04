const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const btn = document.getElementById('btn');
const restartBtn = document.getElementById('btn-restart');

let score = 0;
let lastHole;
let timeUp = false;

function randomTime(min,max) {
    return Math.round(Math.random()*(max-min) + min);
};

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        console.log("It's the same...");
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
};

function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
};

btn.addEventListener('click', function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000);
})

// function startGame() {
//     scoreBoard.textContent = 0;
//     timeUp = false;
//     score = 0;
//     peep();
//     setTimeout(() => timeUp = true, 10000);
// };

function bonk(e) {
    if(!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
};

moles.forEach(mole => mole.addEventListener('click', bonk));

restartBtn.addEventListener('click', () => {
  // Restart the game.
  // ...
  
  // Refresh the screen.
  location.reload();
});


