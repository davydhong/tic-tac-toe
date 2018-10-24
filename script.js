(() => {
  let whoseTurn = true; // true === O's turn, false === X's turn;
  let board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  const rotateBoard = board => {
    var rotatedBoard = [];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        rotatedBoard[i] = rotatedBoard[i] || [];
        rotatedBoard[i][j] = board[j][i];
      }
    }
    return rotatedBoard;
  };

  const rowCheck = board => {
    const rowSum = board.map(row => row.reduce((accumulator, current) => accumulator + current));
    if (rowSum.includes(3)) {
      return 1;
    } else if (rowSum.includes(-3)) {
      return -1;
    } else {
      return null;
    }
  };

  const getWinner = board => {
    console.log(rowCheck(board));
    if (rowCheck(board) === 1 || rowCheck(rotateBoard(board)) === 1) {
      return 1;
    } else if (rowCheck(board) === -1 || rowCheck(rotateBoard(board)) === -1) {
      return -1;
    } else {
      return null;
    }
  };

  const addMarker = event => {
    event.stopImmediatePropagation();
    event.target.innerHTML = whoseTurn ? 'O' : 'X';

    const x = Math.ceil(event.target.id / 3) - 1;
    const y = event.target.id - 3 * (Math.ceil(event.target.id / 3) - 1) - 1;

    board[x][y] = whoseTurn ? -1 : 1;

    if (getWinner(board) === 1) {
      setTimeout(() => alert('X won!'), 0);
    } else if (getWinner(board) === -1) {
      setTimeout(() => alert('O won!'), 0);
    }
    whoseTurn = !whoseTurn;
  };

  $('div').on('click', addMarker);
})();
