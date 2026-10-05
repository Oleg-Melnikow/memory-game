# Memory Game

A memory game implemented in pure _JavaScript_, _CSS_, and _HTML_. The game board consists of a 4x4 grid containing 16 cards. The player reveals cards and memorizes their positions to find all the matches in the fewest possible moves.

Educational project **[Memory Game](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/memory-game/README.md)** from RS School.

**[Deploy](https://oleg-melnikow.github.io/memory-game/)**

## Game Rules

1. 16 shuffled cards are laid out face-down on the board. The player can begin flipping them over immediately.
2. A turn consists of revealing two different available cards, regardless of whether they match.
3. If the images match, both cards remain face-up for the rest of the game, and the count of found pairs increases by one.
4. If the images do not match, both cards remain visible for about a second before flipping back over. No other cards can be revealed while the player is looking at the non-matching pair.
5. The game ends when all 8 pairs have been found.

## Stack

- HTML5
- CSS3 (Grid Layout, Flexbox)
- Vanilla JavaScript (ES6+, DOM API, Web Storage API)

## Local Installation

- Clone current repository:
  ```bash
  git clone https://github.com/Oleg-Melnikow/memory-game
  ```
- Open folder with project:
  ```bash
  cd memory-game
  ```
- Go to branch _memory-game_:
  ```bash
  git checkout memory-game
  ```
- Open `index.html` in your web browser. You can also use **Live Server** in _VS Code_ for local hosting.

---

## Author [Oleg Melnikov](https://github.com/Oleg-Melnikow)
