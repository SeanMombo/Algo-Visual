export function recursiveFloodFill(img, r, c, col, newCol) {
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

  function rec(r, c) {
    if (r < 0 || r >= numRow) return;
    if (c < 0 || c >= numCol) return;
    if (visited[key(r, c)]) return;
    if (img[r][c] != col) return;

    img[r][c] = newCol;
    visited[key(r, c)] = 1;

    const moves = neighbours(r, c);

    for (let move of moves) {
      rec(move[0], move[1]);
    }
  }
  rec(r, c);
  return img;
}
