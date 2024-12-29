// Initialize game variables
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer;
let gameActive = true;
let playerXScore = 0;
let playerOScore = 0;

// Winning combinations
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// DOM elements
const gameBoard = document.getElementById("game-board");
const gameStatus = document.getElementById("game-status");
const restartButton = document.getElementById("restart-button");
const resetScoreButton = document.getElementById("reset-score-button");
const playerXScoreElement = document.getElementById("player-x-score");
const playerOScoreElement = document.getElementById("player-o-score");

// Sound effects
const clickSound = new Audio("click.mp3");
const winSound = new Audio("win.mp3");
const drawSound = new Audio("draw.mp3");

// Randomize first player
function randomizePlayer() {
  currentPlayer = Math.random() < 0.5 ? "X" : "O";
  gameStatus.textContent = `Player ${currentPlayer}'s turn`;
}

// Create the game board
function createBoard() {
  gameBoard.innerHTML = "";
  board.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.addEventListener("click", handleCellClick);
    gameBoard.appendChild(cell);
  });
}

// Handle cell click
function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add("taken");
  clickSound.play();

  if (checkWin()) {
    highlightWinningCells();
    gameStatus.textContent = `Player ${currentPlayer} wins! 🎉`;
    winSound.play();
    updateScore(currentPlayer);
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    gameStatus.textContent = "It's a draw! 🤝";
    drawSound.play();
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameStatus.textContent = `Player ${currentPlayer}'s turn`;
}

// Check for a win
function checkWin() {
  return winningCombinations.some(combination => {
    if (combination.every(index => board[index] === currentPlayer)) {
      combination.forEach(index => {
        document.querySelector(`.cell[data-index="${index}"]`).classList.add("winner");
      });
      return true;
    }
    return false;
  });
}

// Highlight winning cells
function highlightWinningCells() {
  document.querySelectorAll(".cell.winner").forEach(cell => {
    cell.style.animation = "pulse 1s infinite";
  });
}

// Update scores
function updateScore(player) {
  if (player === "X") {
    playerXScore++;
    playerXScoreElement.textContent = `Player X: ${playerXScore}`;
  } else {
    playerOScore++;
    playerOScoreElement.textContent = `Player O: ${playerOScore}`;
  }
}

// Restart the game
restartButton.addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  randomizePlayer();
  createBoard();
});

// Reset the entire game
resetScoreButton.addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  playerXScore = 0;
  playerOScore = 0;
  playerXScoreElement.textContent = "Player X: 0";
  playerOScoreElement.textContent = "Player O: 0";
  randomizePlayer();
  createBoard();
});

// Initialize the game
randomizePlayer();
createBoard();
