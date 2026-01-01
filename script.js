const gameboard = (() => {
  const board = [];
  const boardContainer = document.querySelector(".board-container");
  const container = document.querySelector(".container");
  const playerNames = document.querySelector(".player-names-board");
  const playerOne = document.querySelector(".playerOne");
  const playerTwo = document.querySelector(".playerTwo");
  const statusText = document.querySelector(".statusText");
  const resetBtn = document.querySelector(".resetBtn");
  const winnerPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let currentPlayer = "X";
  let roundWon = false;
  // const cellBtn = cells;

  for (let i = 0; i < 9; i++) {
    const cells = document.createElement("button");
    cells.className = "cells";
    cells.dataset.index = i;
    // cells.textContent = "X";

    board.push(cells);
  }

  const playRound = () => {
    boardContainer.addEventListener("click", (e) => {
      const selectedIndex = e.target.dataset.index;
      let selectedCell = e.target;

      if (selectedCell.textContent !== "") return;

      selectedCell.textContent = currentPlayer;
      currentPlayer = currentPlayer === "X" ? "O" : "X";

      if (currentPlayer === "X") {
        statusText.textContent = `${displayController.players[0]}'s turn`;
      } else if (currentPlayer === "O") {
        statusText.textContent = `${displayController.players[1]}'s turn`;
      }

      if (selectedIndex === undefined) return;

      checkWinner();
    });
  };

  function checkWinner() {
    const options = board.map((cell) => cell.textContent);

    for (let i = 0; i < winnerPattern.length; i++) {
      const pattern = winnerPattern[i];

      const cellA = options[pattern[0]];
      const cellB = options[pattern[1]];
      const cellC = options[pattern[2]];

      if (cellA == "" || cellB == "" || cellC == "") {
        continue;
      }
      if (cellA === cellB && cellB === cellC) {
        roundWon = true;
      }
      if (!options.includes("")) {
        statusText.textContent = `Draw!!!`;
        board.forEach((cell) => (cell.disabled = true));
      }
      if (roundWon === true) {
        const winningCell = cellC;
        printWinner(winningCell);
        break;
      }
    }
    function printWinner(x) {
      let player = displayController.players;

      if (x === "X") {
        statusText.textContent = `${player[0]} wins`;
      } else if (x === "O") {
        statusText.textContent = `${player[1]} wins`;
      }

      board.forEach((cell) => (cell.disabled = true));
    }

    resetBtn.addEventListener("click", () => {
      board.forEach((cell) => {
        cell.textContent = "";
        cell.disabled = false;
      });

      currentPlayer = "X";
      statusText.textContent = `${displayController.players[0]}'s turn`;
      roundWon = false;
    });

    // let indexContent = cells.dataset.index;
  }

  const render = () => {
    board.forEach((cell) => {
      boardContainer.style.border = "1px black solid";
      boardContainer.append(cell);
      boardContainer.style.display = "grid";
      // playerContainer.style.display = "grid"; //to be moved to displaycontroller module
      container.style.display = "none";
      playerNames.style.display = "grid";
      statusText.style.display = "block";
      resetBtn.style.display = "block";
      playerOne.textContent = displayController.players[0];
      playerTwo.textContent = displayController.players[1];
      statusText.textContent = `${displayController.players[0]}'s turn`;
      checkWinner();
    });
  };

  return { render, playRound, checkWinner };
})();

const displayController = (() => {
  const playerOne = document.querySelector(".player1");
  const playerTwo = document.querySelector(".player2");
  const enterBtns = document.querySelectorAll(".enter");
  const startBtn = document.querySelector(".start-button");
  const players = [];

  enterBtns.forEach((btn) => {
    btn.addEventListener("click", getPlayer);
  });

  function getPlayer(e) {
    const parent = e.target.closest("label");
    const input = parent.querySelector(".input");
    const name = input.value.trim();

    if (name === "") {
      alert("ERROR!!! TYPE YOUR NAME");
      input.focus();
      return;
    }

    if (name.length < 2) {
      alert("Name must be at least 2 characters");
      input.focus();
      return;
    }

    // Check for duplicates
    if (players.includes(name)) {
      alert("This name is already taken!");
      input.focus();
      return;
    }

    // Determine which player slot based on button
    const playerIndex = parent.querySelector(".input").id === "player1" ? 0 : 1;

    // Add or replace player at specific index
    if (players.length < 2) {
      players[playerIndex] = name;
    } else if (players.length === 2 && !players[playerIndex]) {
      players[playerIndex] = name;
    } else {
      alert("Both players already entered. Reset to change names.");
      return;
    }

    playerOne.textContent = players[0];
    playerTwo.textContent = players[1];

    console.log(players);
    input.value = "";
    input.disabled = true;
    e.target.disabled = true;
  }
  const startGame = () => {
    if (players.length < 2) return alert("ENTER BOTH PLAYER NAMES FIRST");
    gameboard.render();
    gameboard.playRound();
  };
  startBtn.addEventListener("click", startGame);
  return {
    getPlayer,
    startGame,
    players,
  };
})();

// const getPlayerName = (() => {
//   displayController.startGame;
//   const getPlayers = displayController.players;
//   console.log(getPlayers);
//   let currentPlayer;
//   if (getPlayers.length === 0)
//     if (getPlayers.length !== 0) {
//       currentPlayer = getPlayers[0];
//     }
//   const changePlayer = () => {
//     currentPlayer === getPlayers[0] ? getPlayers[1] : getPlayers[0];
//     console.log(currentPlayer);
//   };

//   return {
//     changePlayer,
//     getPlayers,
//   };
// })();
// displayController.getPlayer;
// displayController.startGame;
// gameboard.render();
// getPlayerName.changePlayer();
