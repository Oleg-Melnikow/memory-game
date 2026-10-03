import { createLeaderboard } from "./modal.js";

const root = document.getElementById("root");

const header = document.createElement("header");
header.classList.add("header");

function onClickNewGame() {
  console.log("New game");
}

const newGameButton = createButton("New Game", onClickNewGame);
const leaderboardButton = createButton("Leaderboard");

root.append(header);
header.append(newGameButton);
header.append(leaderboardButton);

function createButton(name, onClickButton = null) {
  const button = document.createElement("button");
  button.classList.add("btn");
  button.textContent = name;
  if (onClickButton) {
    button.addEventListener("click", onClickButton);
  }
  return button;
}

const leaderboard = createLeaderboard(root);
leaderboardButton.addEventListener("click", leaderboard.open);
