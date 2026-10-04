export function createLeaderboard(
  root,
  createElement,
  type,
  moves = null,
  createButton,
  initGame,
) {
  const modalContainer = createElement("dialog", "container-modal", root);
  const modal = createElement("div", "popup", modalContainer);
  const modalHeader = createElement("div", "modal-header", modal);

  const headerTitle = type === "win" ? "🎉 Поздравляем!" : "Leaderboard";

  createElement("h2", "modal-title", modalHeader, headerTitle);
  const closeBtn = createElement("button", "close", modalHeader);

  const modalBody = createElement("div", "modal-body", modal);

  const toggleModal = (isOpen) => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    isOpen ? modalContainer.show() : modalContainer.close();

    if (isOpen) {
      document.addEventListener("keyup", handleKeyDown);
    } else {
      document.removeEventListener("keyup", handleKeyDown);
      modalContainer.remove();
    }
  };

  const open = () => toggleModal(true);
  const close = () => toggleModal(false);

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) close();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") close();
  };

  if (type === "win") {
    const winMessage = createElement("p", "win-message", modalBody);
    winMessage.textContent = `Вы нашли все пары за ${moves} ходов!`;
    const restart = () => {
      close();
      initGame?.();
    };
    createButton("New Game", restart, modal);
  }

  if (type == "leaderboard") {
    createTableRecords(modalBody, createElement);
  }

  closeBtn.addEventListener("click", close);
  modalContainer.addEventListener("click", handleOutsideClick);

  return { open, close };
}

function createTableRecords(parent, createElement) {
  const historyRaw = localStorage.getItem("memoryGameHistory");
  const history = historyRaw ? JSON.parse(historyRaw) : [];

  if (!history.length) {
    const emptyTable = createElement("p", "empty-list", parent);
    emptyTable.textContent = "Пока нет результатов";
    return;
  }

  const table = createElement("table", "leaderboard-table", parent);

  const headerRow = createElement("tr", "", table);
  createElement("th", "", headerRow, "Место");
  createElement("th", "", headerRow, "Ходы");
  createElement("th", "", headerRow, "Дата");

  history.forEach((game, index) => {
    const row = createElement("tr", "", table);

    createElement("td", "", row, String(index + 1));
    createElement("td", "", row, String(game.moves));
    createElement("td", "", row, game.dateStr);
  });
}
