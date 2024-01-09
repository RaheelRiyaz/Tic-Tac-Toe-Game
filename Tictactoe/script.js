// const gameModeBtns = document.querySelectorAll(".gameModeBtn");
const btns = document.querySelectorAll(".game-btns>button");
const gameModeContainer = document.querySelector(".game-mode-container");
const gameContainer = document.querySelector(".game-container");
const restartGameContainer = document.querySelector(".restart-container");
const winMessage = document.querySelector(".win-message");
let winSound = "./audious/goodresult-82807.mp3";
let drawSound = "./audious/game-bonus-144751.mp3";
let player = "X";

btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    let audio = new Audio("./audious/cartoon-jump-6462.mp3");
    this.innerText = player;
    this.disabled = true;
    audio.play();
    checkWin();
    player = player === "X" ? "0" : "X";
    toggleTurn();
  });
});

function checkWin() {
  const winningProbabilities = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
    [2, 5, 8],
  ];

  for (const probability of winningProbabilities) {
    if (
      btns[probability[0]].innerText &&
      btns[probability[0]].innerText === btns[probability[1]].innerText &&
      btns[probability[1]].innerText === btns[probability[2]].innerText
    ) {
      btns.forEach((btn) => {
        btn.disabled = true;
      });

      for (const i of probability) {
        btns[i].classList.add("win");
      }
      setTimeout(() => {
        toggleCollapseClass(
          `Player ${player === "X" ? "0" : "X"} wins`,
          winSound
        );
      }, 1000);
      return;
    }
  }
  const allButtonsDirty = Array.from(btns).every((btn) => btn.innerText);
  if (allButtonsDirty) {
    toggleCollapseClass("Match is Drawn", drawSound);
  }
}

function restartGame() {
  restartGameContainer.classList.add("collapse");
  gameContainer.classList.remove("collapse");
  btns.forEach((btn) => {
    btn.disabled = !true;
    btn.innerText = "";
    btn.classList.remove("win");
    player = "X";
  });
}

function toggleCollapseClass(message, sound) {
  let audio = new Audio(sound);
  restartGameContainer.classList.remove("collapse");
  gameContainer.classList.add("collapse");
  winMessage.innerText = message;
  audio.play();
}

function toggleTurn() {
  document.querySelector(".active")?.classList.remove("active");
  if (player === "X") {
    document.querySelector(".player-x").classList.add("active");
  } else document.querySelector(".player-0").classList.add("active");
}
