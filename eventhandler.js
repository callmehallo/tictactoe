"use strict";
const Eventhandler = (function () {
  const getElement = (id) => document.getElementById(`${id}`);

  const ElementsToToggleDisplay = document.querySelectorAll(
    "div.toggleJS, button.toggleJS"
  );
  let playerScore = 0;
  let computerScore = 0;
  //divs
  const container = getElement("container");
  const startDiv = getElement("startDiv");
  const inGameDiv = getElement("inGameDiv");
  const header = getElement("header");
  const formDiv = getElement("formDiv");
  const playerName = getElement("player");
  const score = getElement("score");
  const menu = getElement("menu");
  const mobileMenu = getElement("mobileMenu");

  //buttons
  const startBtn = getElement("startBtn");
  const newGameBtn = getElement("newGameBtn");
  const levelBtn = getElement("levelBtn");
  const resestBtn = getElement("resetBtn");
  //submit
  const input = getElement("nameForm");

  startBtn.addEventListener("click", () => {
    [startBtn, startDiv, formDiv].forEach((el) => el.classList.toggle("hide"));
    /* ElementsToToggleDisplay.forEach((el) => el.classList.toggle("hide")); */
  });
  input.addEventListener("change", () => {
    Gameboard.getPlayer(input.value);
    playerName.textContent = `${
      input.value.charAt(0).toUpperCase() + input.value.slice(1) //capitalize first letter
    }`;
    ElementsToToggleDisplay.forEach((el) => el.classList.toggle("hide"));
  });
  const setMobileMenuView = () => {
    container.appendChild(menu);
    //mediaquery macht den rest
  };
  const incrScore = (comTurn) => {
    if (comTurn) {
      computerScore++;
    } else {
      playerScore++;
    }
    score.innerText = `${playerScore}:${computerScore}`;
  };

  resestBtn.addEventListener("click", function () {
    computerScore = 0;
    playerScore = 0;
    score.innerText = `${playerScore}:${computerScore}`;
  });

  const addListenerNewGame = (func) => {
    newGameBtn.addEventListener("click", func);
  };

  const addListenerForMarks = (field) => {
    field.addEventListener("click", Gameboard.setSign);
  };
  return {
    setMobileMenuView,
    addListenerForMarks,
    incrScore,
    addListenerNewGame,
  };
})();
