import { createLeaderboard } from "./modal.js";

const root = document.getElementById("root");

const header = document.createElement("header");
header.classList.add("header");
root.append(header);

function onClickNewGame() {
  console.log("New game");
}

const leaderboard = createLeaderboard(root, createElement);
createButton("New Game", onClickNewGame, header);
createButton("Leaderboard", leaderboard.open, header);

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
