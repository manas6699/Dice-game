"use strict";

// I have selected elements here
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

// scoping
let scores, currentScore, activePlayer, playing;

// resetting function
const tt = document.getElementById("current--0");
const init = function () {
  // starting conditions
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  tt.textContent = 0;
  document.getElementById("current--1").textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

// switch player
let currScore = 0;
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currScore = 0;
  // using ternary operator
  activePlayer = activePlayer === 0 ? 1 : 0;
  tt.textContent = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// rolling dice functionality
btnRoll.addEventListener("click", function () {
  // 1. generating a random number
  if (playing === true) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. check : if(diceScore == 1){
    //      switch to next player
    // }

    if (dice !== 1) {
      currScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing === true) {
    // adding current player's score to the active player's score
    scores[activePlayer] += currScore;
    // scores[1] += currScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // checking if the score is >= 20
    if (scores[activePlayer] >= 20) {
      // finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
