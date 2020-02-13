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
