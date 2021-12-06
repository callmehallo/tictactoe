"use strict";

const createField = (divDom, i) => {
  const magicArr = [8, 1, 6, 3, 5, 7, 4, 9, 2]; //MagicSquare numbers for calculating the winning result
  const magicNum = magicArr[i];
  const div = divDom;
  let mark = "";
  let occupied = false;
  Eventhandler.addListenerForMarks(div);
  return { div, occupied, mark, magicNum };
};

const GameMechanics = (function () {
  const gameboard = [];

  let comTurn = false;
  let roundCount = 0;
  let hasWon = false;
  const board = document.getElementById("board");

  const render = function () {
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
    comTurn = !comTurn;
    announceTurn();
    if (comTurn) {
      setTimeout(() => {
        computer.play(gameboard);
      }, 1000);
    }
  };

  const setSign = (e) => {
    let tempMark = "";
    if (comTurn) {
      e.target = e;
      tempMark = "O";
    } else {
      tempMark = "X";
    }
    const i = e.target.getAttribute("id");
    gameboard[i].occupied = true;
    e.target.textContent = `${tempMark}`;
    gameboard[i].mark = `${tempMark}`;
    e.target.classList.toggle("clicked");
    e.target.removeEventListener("click", setSign);
    AI.copyMove(i, comTurn);
    roundCount++;
    if (roundCount > 4) {
      checkWin();
    }
    if (roundCount > 8) {
      if (!hasWon) {
        announceEnd();
        hasWon = !hasWon;
      }
    }
    if (!hasWon) {
      setTurn();
    }
  };

  const announceTurn = () => {
    let player = comTurn ? "com's" : "your";
    Eventhandler.gameStatus.textContent = `${player} turn`;
  };
  const announceEnd = (str) => {
    switch (str) {
      case "playerwin":
        Eventhandler.gameStatus.textContent = `You win!`;
        break;
      case "computerwin":
        Eventhandler.gameStatus.textContent = `You lose!`;
        break;
      default:
        Eventhandler.gameStatus.textContent = "It's a tie!";
        break;
    }
  };

  const checkWin = () => {
    const xoArray = comTurn
      ? gameboard.filter((el) => el.mark == "O")
      : gameboard.filter((el) => el.mark == "X");

    const magicNums = xoArray.map((el) => el.magicNum);
    const winningNums = helper.getWinningNums(magicNums);

    if (winningNums != "") {
      endGame(winningNums);
    }
  };

  const endGame = (str) => {
    hasWon = !hasWon;
    let winningColor = comTurn ? "computerwin" : "playerwin";
    for (let i = 0; i < str.length; i++) {
      const div = gameboard
        .filter((el) => el.magicNum === parseInt(str.charAt(i)))
        .find((el) => el).div;

      div.classList.add(winningColor);
    }
    announceEnd(winningColor);
    gameboard
      .filter((el) => el.occupied === false)
      .forEach((el) =>
        el.div.removeEventListener("click", GameMechanics.setSign)
      );

    Eventhandler.incrScore(comTurn);
  };

  const newGame = () => {
    gameboard.length = 0;
    roundCount = 0;
    hasWon = false;
    comTurn = false;
    while (board.firstChild) {
      board.removeChild(board.lastChild);
    }
    render();
    AI.newGame();
    announceTurn();
  };

  Eventhandler.addListenerNewGame(newGame);

  return { render, setSign, announceTurn };
})();

const helper = (function () {
  const getWinningNums = (array) =>
    array
      .flatMap((v, i, array) =>
        array
          .slice(i + 1)
          .flatMap((w, j) => array.slice(j + i + 2).map((k) => "" + v + w + k))
      )
      .filter(
        (el) =>
          Array.from(el).reduce((a, b) => parseInt(a) + parseInt(b)) === 15
      )
      .join("");

  return { getWinningNums };
})();

const computer = (function () {
  let name = "com";
  let level = "easy";
  let wasMoveRandom = true;
  const play = (gameboard) => {
    if (level === "easy") {
      randomPlay(gameboard);
    } else if (level === "medium") {
      if (wasMoveRandom) {
        smartPlay(gameboard);
      } else {
        randomPlay(gameboard);
      }
      wasMoveRandom = !wasMoveRandom;
    } else smartPlay(gameboard);
  };
  const randomNumber = (max) => {
    max = Math.floor(max);
    return Math.floor(Math.random() * max);
  };
  const randomPlay = (gameboard) => {
    const availableFields = gameboard.filter((el) => el.occupied == false);
    const i = randomNumber(availableFields.length);

    GameMechanics.setSign(availableFields[i].div);
  };
  const smartPlay = (gameboard) => {
    const i = AI.findBestMove(AI.board);
    GameMechanics.setSign(gameboard[i].div);
  };
  const adjustLevel = (levelBtn) => {
    if (level === "easy") {
      level = "medium";
    } else if (level === "medium") {
      level = "hard";
    } else {
      level = "easy";
    }
    levelBtn.textContent = `${level}`;
  };
  return { name, play, adjustLevel };
})();
