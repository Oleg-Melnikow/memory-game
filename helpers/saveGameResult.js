export function saveGameResult(moves) {
  const dateInfo = getFormattedDate();

  const currentGame = {
    moves: moves,
    dateStr: dateInfo.string,
    timestamp: dateInfo.timestamp,
  };

  const historyRaw = localStorage.getItem("memoryGameHistory");
  const history = historyRaw ? JSON.parse(historyRaw) : [];

  history.push(currentGame);

  history.sort((a, b) => {
    if (a.moves !== b.moves) {
      return a.moves - b.moves;
    }
    return a.timestamp - b.timestamp;
  });

  const updateData = [...history].slice(0, 10);

  localStorage.setItem("memoryGameHistory", JSON.stringify(updateData));
}

function getFormattedDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  return {
    string: `${day}.${month}.${year}`,
    timestamp: now.getTime(),
  };
}
