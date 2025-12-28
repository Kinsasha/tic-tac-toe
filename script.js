const game = (() => {
  const playerOne = document.createElement("p");
  const playerTwo = document.createElement("p");

  const playerOneInput = document.getElementById("player1");
  const playerTwoInput = document.getElementById("player2");

  // playerOne.textContent = playerOneInput.value;
  // playerTwo.textContent = playerTwoInput.value;
})();

const gameboard = (() => {
  const board = [];
  const boardContainer = document.querySelector(".board-container");
  const container = document.querySelector(".container");
  const playerNames = document.querySelector(".player-names-board");
  const playerOne = document.querySelector(".playerOne");
  const playerTwo = document.querySelector(".playerTwo");

  for (let i = 0; i < 9; i++) {
    const cells = document.createElement("button");
    cells.className = "cells";
    cells.dataset.index = i;

    board.push(cells);

    // console.log(board);
  }

  const playRound = () => {
    boardContainer.addEventListener("click", (e) => {
      const selectedIndex = e.target.dataset.index;

      if (selectedIndex === undefined) return;

      console.log(`you clicked ${selectedIndex}`);
    });
  };

  const render = () => {
    board.forEach((cell) => {
      boardContainer.style.border = "1px black solid";
      boardContainer.append(cell);
      boardContainer.style.display = "grid";
      // playerContainer.style.display = "grid"; //to be moved to displaycontroller module
      container.style.display = "none";
      playerNames.style.display = "grid";
      playerOne.textContent = displayController.players[0];
      playerTwo.textContent = displayController.players[1];
    });
  };

  return { render, playRound };
})();

const displayController = (() => {
  const playerContainer = document.querySelector(".player-names");
  const playerOne = document.querySelector(".player1");
  const playerTwo = document.querySelector(".player2");
  const enterBtns = document.querySelectorAll(".enter");
  const inputs = document.querySelectorAll(".input");
  const startBtn = document.querySelector(".start-button");
  const players = [];

  enterBtns.forEach((btn) => {
    btn.addEventListener("click", storePlayerName);
  });

  function storePlayerName(e) {
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

    // Update display safely
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
  };
  startBtn.addEventListener("click", startGame);
  return {
    storePlayerName,
    startGame,
    players,
  };
})();
displayController.storePlayerName;
// displayController.startGame;
