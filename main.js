"use strict";

const createField = (divDom, i) => {
  const magicArr = [8, 1, 6, 3, 5, 7, 4, 9, 2];
  const magicNum = magicArr[i];
  const location = i;
  const div = divDom;
  let mark = "";
  let occupied = false;
  Eventhandler.addListenerForMarks(div);
  return { location, div, occupied, mark, magicNum };
};

const Gameboard = (function () {
  const gameboard = [];
  const Player = {};
  let computerTurn = false;
  let roundCount = 0;
  let hasWon = false;
  const getPlayer = (playerName) => {
    return Object.assign(Player, createPlayer(playerName));
  };

  const board = document.getElementById("board");

  const render = () => {
    for (let i = 0; i < 9; i++) {
      const div = document.createElement("div");
      div.setAttribute("class", "grid flex");
      div.setAttribute("id", `${i}`);
      const field = createField(div, i);
      gameboard.push(field);
      board.append(div);
    }
  };
  const setTurn = () => {
    computerTurn = !computerTurn;
    if (computerTurn) {
      setTimeout(() => {
        computer.randomPlay(gameboard);
      }, 1000);
    }
  };
  const setSign = (e) => {
    let tempMark = "";
    if (computerTurn) {
      e.target = e;
      tempMark = "O";
    } else {
      tempMark = "X";
    }
    const index = e.target.getAttribute("id");
    gameboard[index].occupied = true;
    e.target.textContent = `${tempMark}`;
    gameboard[index].mark = `${tempMark}`;
    e.target.classList.toggle("clicked");
    e.target.removeEventListener("click", Gameboard.setSign);
    roundCount++;
    if (roundCount > 4) {
      checkWin();
    }
    if (!hasWon) {
      setTurn();
    }
  };

  const checkWin = () => {
    const xoArray = computerTurn
      ? gameboard.filter((el) => el.mark == "O")
      : gameboard.filter((el) => el.mark == "X");

    const magicNums = xoArray.map((el) => el.magicNum);
    //const locations = xoArray.map((el) => el.location);
    const winningNums = helper.getWinningNums(magicNums);
    if (winningNums != "") {
      endGame(winningNums);
    }
  };
  const endGame = (str) => {
    hasWon = !hasWon;
    for (let i = 0; i < str.length; i++) {
      const div = gameboard
        .filter((el) => el.magicNum === parseInt(str.charAt(i)))
        .find((el) => el).div;

      div.classList.toggle("playerwin");
    }
    gameboard
      .filter((el) => el.occupied === false)
      .forEach((el) => el.div.removeEventListener("click", Gameboard.setSign));

    Eventhandler.incrScore(computerTurn);
  };
  const newGame = () => {
    gameboard.length = 0;
    roundCount = 0;
    hasWon = false;
    computerTurn = false;
    while (board.firstChild) {
      board.removeChild(board.lastChild);
    }
    render();
  };
  Eventhandler.addListenerNewGame(newGame);
  return { getPlayer, render, setSign };
})();

const helper = (function () {
  const getWinningNums = (array) =>
    array
      .flatMap((v, i, array) => {
        return array.slice(i + 1).flatMap((w, j) => {
          return array.slice(j + i + 2).map((k) => "" + v + w + k);
        });
      })
      .filter(
        (el) =>
          Array.from(el).reduce((a, b) => parseInt(a) + parseInt(b)) === 15
      )
      .join("");

  return { getWinningNums };
})();

const createPlayer = (_name) => {
  let name = _name;
  let score = 0;
  Gameboard.render();
  return { name, score };
};

const computer = (function () {
  let name = "com";
  const randomNumber = (max) => {
    max = Math.floor(max);
    return Math.floor(Math.random() * max);
  };
  const randomPlay = (gameboard) => {
    const availableFields = gameboard.filter((el) => el.occupied == false);
    const index = randomNumber(availableFields.length);

    Gameboard.setSign(availableFields[index].div);
  };
  return { name, randomPlay };
})();
