"use strict";
const createField = (divDom, i) => {
  const location = i;
  const div = divDom;
  let mark = "";
  let score = 0;
  let occupiedBy;
  const setMark = (player) => {};
  return { location, div, occupiedBy, mark, setMark };
};

const Gameboard = (function () {
  const gameboard = [];
  const Player = {};
  const getPlayer = (playerName) => {
    return Object.assign(Player, createPlayer(playerName));
  };
  const sayplay = () => console.log(Player);
  const board = document.getElementById("board");
  const render = () => {
    for (let i = 8; i >= 0; i--) {
      const div = document.createElement("div");
      div.setAttribute("class", "grid");
      div.setAttribute("id", `${i}`);
      const field = createField(div, i);
      gameboard.push(field);
      board.append(div);
    }
  };
  return { getPlayer, render, sayplay };
})();

const createPlayer = (_name) => {
  let name = _name;
  let score = 0;
  return { name, score };
};

Gameboard.render();

const Eventhandler = (function () {
  const getElement = (id) => document.getElementById(`${id}`);

  const ElementsToToggleDisplay = document.querySelectorAll(
    "div.toggleJS, button.toggleJS"
  );
  //divs
  const startDiv = getElement("startDiv");
  const inGameDiv = getElement("inGameDiv");
  const header = getElement("header");
  const formDiv = getElement("formDiv");
  //buttons
  const startBtn = getElement("startBtn");
  const newGameBtn = getElement("newGameBtn");
  const levelBtn = getElement("levelBtn");
  const resestBtn = getElement("restBtn");
  //submit
  const input = getElement("nameForm");

  startBtn.addEventListener("click", () => {
    [startBtn, startDiv, formDiv].forEach((el) => el.classList.toggle("hide"));
    /* ElementsToToggleDisplay.forEach((el) => el.classList.toggle("hide")); */
  });
  input.addEventListener("change", () => {
    Gameboard.getPlayer(input.value);
    ElementsToToggleDisplay.forEach((el) => el.classList.toggle("hide"));
  });
})();
