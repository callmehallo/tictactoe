function Move(board) {
  let bestScore = -Infinity;
  let bestmove;
  let board = [...board];
  let availableFields = board.filter((el) => el.occupied == false);
  availableFields.forEach((el) => {
    el.occupied = true;
    let score = minimax(board);
    if (score > bestScore) {
      bestScore = score;
      bestmove = el.magicNum;
    }
  });
}

let scores = {
  win: 1,
  tie: 0,
  lose: -1,
};
const calcHasWon = (array) =>
  array.some((v, i) =>
    array
      .slice(i + 1)
      .some((k, j, arr) => arr.slice(j + 1).some((p) => v + k + p === 15))
  );

function minimax(board, depth, maximazingPlayer) {
  const marks = maximazingPlayer
    ? gameboard.filter((el) => el.mark == "O")
    : gameboard.filter((el) => el.mark == "X");
  let hasWon = 
}
