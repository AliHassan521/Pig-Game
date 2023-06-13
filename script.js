'use strict';

let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');
// Select the score id's of both players to change to 0
let score0El = document.querySelector('#score--0');
// There is another way to select id of an element
let score1El = document.getElementById('score--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');
// Select the hidden class to remove the dice
let diceEl = document.querySelector('.dice');
// Selecting all the buttons
let bntNew = document.querySelector('.btn--new');
let bntHold = document.querySelector('.btn--hold');
let bntRoll = document.querySelector('.btn--roll');
// Initial conditions
score0El.textContent = 0;
score1El.textContent = 0;
let scores = [0, 0];
let currentScore = 0;
let activeplayer = 0;
let playing = true;
function switchPlayer() {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentScore = 0;
  if (activeplayer === 0) activeplayer = 1;
  else activeplayer = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}
// Rolling dice functionality
bntRoll.addEventListener('click', function () {
  // Generating random number
  if (playing) {
    let ran = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${ran}.png`;
    console.log(ran);
    // Display dice
    diceEl.classList.remove('hidden');
    // Check if number is '1'
    if (ran !== 1) {
      // Add to current score
      currentScore = currentScore + ran;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;
    } else {
      // Switch the next player
      // Toggle remove the class if it is present in an element or add a class that is not present in an element
      switchPlayer();
    }
  }
});

// Holding current score
bntHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to total score of active player
    scores[activeplayer] += currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];
    // if current score is 20 current player wins
    if (scores[activeplayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    } else {
      // switch the player
      switchPlayer();
    }
  }
});

// Reset all the game

bntNew.addEventListener('click', function () {
  scores = [0, 0];
  currentScore = 0;
  activeplayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
});
