import { WIDTH, HEIGHT } from "../visualizer/visualizer.component";

const lodash = require("lodash");

const birthLimit = 4;
const deathLimit = 3;

export function generateCave(grid) {
  const clone = Array.from(Array(HEIGHT), () => new Array(WIDTH));

  for (let row = 1; row < HEIGHT - 1; row++) {
    for (let col = 1; col < WIDTH - 1; col++) {
      const nbs = getSum(grid, row, col);

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

function getSum(grid, row, col) {
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
