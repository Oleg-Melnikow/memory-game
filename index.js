import { createLeaderboard } from "./modal.js";
import { saveGameResult } from "./helpers/saveGameResult.js";

const root = document.getElementById("root");

const header = document.createElement("header");
header.classList.add("header");
root.append(header);

function openModal(type, moves, createButton, initGame) {
  const leaderboard = createLeaderboard(
    root,
    createElement,
    type,
    moves,
    createButton,
    initGame,
  );
  return leaderboard.open();
}

createButton("New Game", initGame, header);
createButton("Leaderboard", () => openModal("leaderboard"), header);

function createElement(tagName, className, parent = null, textContent = "") {
  const element = document.createElement(tagName);
  if (className) element.classList.add(className);
  if (textContent) element.textContent = textContent;
  if (parent) parent.append(element);
  return element;
}

function createButton(name, onClickButton, parent) {
  const button = createElement("button", "btn", parent, name);
  button.addEventListener("click", onClickButton);
}

const cardValuesBase = [
  "🍎",
  "🍎",
  "🍌",
  "🍌",
  "🍇",
  "🍇",
  "🍍",
  "🍍",
  "🍒",
  "🍒",
  "🥑",
  "🥑",
  "🍉",
  "🍉",
  "🥝",
  "🥝",
];

const TOTAL_PAIRS = cardValuesBase.length / 2;

const main = createElement("main", "", null);
header.after(main);

const gameContainer = createElement("div", "game-container", main);

const gameInfo = createElement("div", "info-panel", gameContainer);

const movesDisplay = createElement("div", "moves-counter", gameInfo, "Ходы: 0");
const pairDisplay = createElement(
  "div",
  "pairs-counter",
  gameInfo,
  "Пары: 0 / 8",
);

const board = createElement("div", "grid-container", gameContainer);

// Variables game state
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let matchedPairs = 0;
let timeoutId = null;

// function for restart/start game
function initGame() {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  // clear board of child elements
  board.querySelectorAll("*").forEach((element) => element.remove());

  moves = 0;
  matchedPairs = 0;
  updateMovesDisplay();

  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];

  const shuffledCards = [...cardValuesBase];

  // sort array cards
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }

  console.log(shuffledCards);

  shuffledCards.forEach((value) => {
    const card = createElement("div", "card", board);
    const inner = createElement("div", "card-inner", card);

    createElement("div", "card-back", inner, "❓");
    createElement("div", "card-front", inner, value);

    card.dataset.cardValue = value;
    card.addEventListener("click", flipCard);
  });
}

// check flipped cards
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("is-flipped");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  moves++;

  updateMovesDisplay();
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.cardValue === secondCard.dataset.cardValue;
  if (isMatch) {
    matchedPairs++;
    updateMovesDisplay();
    disableCards();
    checkWinCondition();
  } else {
    updateMovesDisplay();
    unflipCards();
  }
}

function checkWinCondition() {
  if (matchedPairs === TOTAL_PAIRS) {
    saveGameResult(moves);
    openModal("win", moves, createButton, initGame);
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard?.classList.remove("is-flipped");
    secondCard?.classList.remove("is-flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function updateMovesDisplay() {
  movesDisplay.textContent = `Ходы: ${moves}`;
  pairDisplay.textContent = `Пары: ${matchedPairs} / ${TOTAL_PAIRS}`;
}

initGame();
