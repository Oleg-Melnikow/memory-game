export function createLeaderboard(root, createElement) {
  const modalContainer = createElement("dialog", "container-modal", root);
  const modal = createElement("div", "popup", modalContainer);
  const modalHeader = createElement("div", "modal-header", modal);

  createElement("p", "modal-title", modalHeader, "Leaderboard");
  const closeBtn = createElement("button", "close", modalHeader);

  const toggleModal = (isOpen) => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    isOpen ? modalContainer.show() : modalContainer.close();

    if (isOpen) {
      document.addEventListener("keyup", handleKeyDown);
    } else {
      document.removeEventListener("keyup", handleKeyDown);
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

  closeBtn.addEventListener("click", close);
  modalContainer.addEventListener("click", handleOutsideClick);

  return { open, close };
}
