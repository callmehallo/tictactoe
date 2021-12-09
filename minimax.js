//The main part of the  following minimax algorithm code originates from
//https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/
//contributed by Akshay L Aradhya
//I just modified it a little bit to be able to implement it.

const AI = (function () {
  class Move {
    constructor() {
      let row, col;
    }
  }

  let opponent = "x"; //human player
  let player = "o"; //computer

  let board = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ];
  const compArr = [
    { i: 0, j: 0 },
    { i: 0, j: 1 },
    { i: 0, j: 2 },
    { i: 1, j: 0 },
    { i: 1, j: 1 },
    { i: 1, j: 2 },
    { i: 2, j: 0 },
    { i: 2, j: 1 },
    { i: 2, j: 2 },
  ];
  const copyMove = (id, comTurn) => {
    let mark;
    if (comTurn) {
      mark = player;
    } else {
      mark = opponent;
    }
    board[compArr[id].i][compArr[id].j] = mark;
  };
  const isMovesLeft = (board) => {
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++) if (board[i][j] == "_") return true;

    return false;
  };

  const evaluate = (b) => {
    for (let row = 0; row < 3; row++) {
      if (b[row][0] == b[row][1] && b[row][1] == b[row][2]) {
        if (b[row][0] == player) return +10;
        else if (b[row][0] == opponent) return -10;
      }
    }

    for (let col = 0; col < 3; col++) {
      if (b[0][col] == b[1][col] && b[1][col] == b[2][col]) {
        if (b[0][col] == player) return +10;
        else if (b[0][col] == opponent) return -10;
      }
    }

    if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) {
      if (b[0][0] == player) return +10;
      else if (b[0][0] == opponent) return -10;
    }

    if (b[0][2] == b[1][1] && b[1][1] == b[2][0]) {
      if (b[0][2] == player) return +10;
      else if (b[0][2] == opponent) return -10;
    }

    return 0;
  };
  const minimax = (board, depth, isMax) => {
    let score = evaluate(board);

    if (score == 10) return score - depth;

    if (score == -10) return score + depth;

    if (isMovesLeft(board) == false) return 0;

    if (isMax) {
      let best = -1000;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == "_") {
            board[i][j] = player;

            best = Math.max(best, minimax(board, depth + 1, !isMax));

            board[i][j] = "_";
          }
        }
      }
      return best;
    } else {
      let best = 1000;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == "_") {
            board[i][j] = opponent;

            best = Math.min(best, minimax(board, depth + 1, !isMax));

            board[i][j] = "_";
          }
        }
      }
      return best;
    }
  };
  function findBestMove(board) {
    let bestVal = -1000;
    let bestMove = new Move();
    bestMove.row = -1;
    bestMove.col = -1;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "_") {
          board[i][j] = player;

          let moveVal = minimax(board, 0, false);

          // Undo the move
          board[i][j] = "_";

          if (moveVal > bestVal) {
            bestMove.row = i;
            bestMove.col = j;
            bestVal = moveVal;
          }
        }
      }
    }

    return compArr.findIndex(
      (el) => bestMove.row === el.i && bestMove.col === el.j
    );
  }
  const newGame = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j] = "_";
      }
    }
  };
  return { findBestMove, board, newGame, copyMove };
})();
