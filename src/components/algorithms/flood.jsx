export function recursiveFloodFill(img, r, c, col, newCol) {
  const stack = [];

  function neighbours(r, c) {
    return [
      [r - 1, c],
      [r + 1, c],
      [r, c - 1],
      [r, c + 1]
    ];
  }
  function key(r, c) {
    return `${r}-${c}`;
  }

  const visited = {};
  const numCol = img[0].length;
  const numRow = img.length;

  const clone = Array(numRow)
    .fill()
    .map(() => Array(numCol));

  for (let r = 0; r < numRow; r++) {
    for (let c = 0; c < numCol; c++) {
      if (img[r][c].isWall) clone[r][c] = 1;
      else clone[r][c] = 0;
    }
  }

  function rec(r, c) {
    if (r < 0 || r >= numRow) return;
    if (c < 0 || c >= numCol) return;
    if (visited[key(r, c)]) return;
    if (clone[r][c] !== 0) return;

    stack.push([[r], [c]]);

    clone[r][c] = 2;
    visited[key(r, c)] = 1;

    const moves = neighbours(r, c);

    for (let move of moves) {
      rec(move[0], move[1]);
    }
  }
  rec(r, c);
  return stack;
}

export function iterativeFloodFill(img, r, c, col, newCol) {
  const stack = [];
  //// Helpers
  const numRows = img.length;
  const numCols = img[0].length;
  const visited = Array(numRows)
    .fill()
    .map(() => Array(numCols));

  const clone = Array(numRows)
    .fill()
    .map(() => Array(numCols));

  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      if (img[r][c].isWall) clone[r][c] = 1;
      else clone[r][c] = 0;
    }
  }

  function updateNeighbour(r, c) {
    if (r < 0 || r >= numRows || c < 0 || c >= numCols) return -1;
    if (clone[r][c] === 0) {
      clone[r][c] = 1;
      queue.unshift([r, c]);
      visited[r][c] = 1;
      stack.push([r, c]);
    }
  }

  //// Iterative algorithm
  // if (clone[r][c] === newCol) return;
  // if (clone[r][c] !== col) return;
  clone[r][c] = 1;

  const queue = [];
  queue.unshift([r, c]);

  while (queue.length) {
    const [rCur, cCur] = queue.pop();
    if (visited[(rCur, cCur)] === 1) continue;
    updateNeighbour(rCur - 1, cCur);
    updateNeighbour(rCur + 1, cCur);
    updateNeighbour(rCur, cCur + 1);
    updateNeighbour(rCur, cCur - 1);
  }

  return stack;
}
