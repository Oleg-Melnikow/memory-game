const root = document.getElementById("root");

const header = document.createElement("header");
header.classList.add("header");

function onClickNewGame() {
  console.log("New game");
}

function onClickLeaderboard() {
  console.log("Leaderboard");
}

const newGameButton = createButton("New Game", onClickNewGame);
const leaderboardButton = createButton("Leaderboard", onClickLeaderboard);

root.append(header);
header.append(newGameButton);
header.append(leaderboardButton);

function createButton(name, onClickButton) {
  const button = document.createElement("button");
  button.classList.add("btn");
  button.textContent = name;
  button.addEventListener("click", onClickButton);
  return button;
}
