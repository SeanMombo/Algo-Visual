export function initCave(grid, WIDTH, HEIGHT, initChance) {
  const clone = Array.from(Array(HEIGHT), () => new Array(WIDTH));
  for (let row = 0; row < HEIGHT; row++) {
    for (let col = 0; col < WIDTH; col++) {
      console.log(grid[row][col]);
      console.log(WIDTH, col, HEIGHT, row);
      Math.random() <= initChance ||
      row === 0 ||
      col === 0 ||
      row === HEIGHT - 1 ||
      col === WIDTH - 1
        ? (clone[row][col] = 1)
        : (clone[row][col] = 0);
    }
  }
  return clone;
}
