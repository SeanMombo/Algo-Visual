export function initCave(grid, WIDTH, HEIGHT, initChance) {
  const clone = Array.from(Array(HEIGHT), () => new Array(WIDTH));
  for (let row = 0; row < HEIGHT; row++) {
    for (let col = 0; col < WIDTH; col++) {
      // console.log(grid[row][col]);
      // console.log(WIDTH, col, HEIGHT, row);
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

export function generateCave(grid, WIDTH, HEIGHT, birthLimit, deathLimit) {
  const clone = Array.from(Array(HEIGHT), () => new Array(WIDTH));
  // console.log(grid, WIDTH, HEIGHT);
  for (let row = 1; row < HEIGHT - 1; row++) {
    for (let col = 1; col < WIDTH - 1; col++) {
      const nbs = getSum(grid, row, col, WIDTH, HEIGHT);

      if (grid[row][col].isWall) {
        if (nbs < deathLimit) {
          clone[row][col] = 0;
        } else {
          clone[row][col] = 1;
        }
      } else {
        if (nbs > birthLimit) {
          clone[row][col] = 1;
        } else {
          clone[row][col] = 0;
        }
      }
    }
  }
  return clone;
}

function getSum(grid, row, col, WIDTH, HEIGHT) {
  let sum = 0;
  for (let j = -1; j <= 1; j++) {
    for (let i = -1; i <= 1; i++) {
      const xx = col + i;
      const yy = row + j;
      if (i === 0 && j === 0) continue;
      else if (yy < 0 || yy >= HEIGHT || xx < 0 || xx >= WIDTH) {
      } else if (grid[yy][xx].isWall) sum++;
    }
  }
  return sum;
}
