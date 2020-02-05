import React from "react";
import Node from "./node/node.component";
import { generateCave } from "../algorithms/cave";

import "./visualizer.styles.scss";

export const WIDTH = 60;
export const HEIGHT = 40;

class Visualizer extends React.Component {
  constructor() {
    super();

    this.state = {
      grid: [],
      mouseIsPressed: false
    };
  }

  // create initial grid
  componentDidMount() {
    const grid = createGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  visualizeCaveGeneration() {
    const boolGrid = generateCave(this.state.grid);
    this.animateCaveGeneration(boolGrid);
  }

  animateCaveGeneration(boolGrid) {
    const t = 0.5;
    for (let row = 0; row < HEIGHT; row++) {
      for (let col = 0; col < WIDTH; col++) {
        const val = boolGrid[row][col];
        const el = document.getElementById(`node-${row}-${col}`);
        setTimeout(() => {
          if (
            val === 1 ||
            row === 0 ||
            col === 0 ||
            row === HEIGHT - 1 ||
            col === WIDTH - 1
          ) {
            el.classList.add("wall");
          } else {
            el.classList.remove("wall");
          }

          el.classList.add("visited");
        }, t * col + row * (t * WIDTH));

        setTimeout(() => {
          el.classList.remove("visited");
        }, t * col + row * (t * WIDTH) + 20);
      }
    }
    setTimeout(() => {
      for (let row = 0; row < HEIGHT; row++) {
        for (let col = 0; col < WIDTH; col++) {
          setNewGrid(this.state.grid, row, col, boolGrid[row][col]);
        }
      }
    }, t * HEIGHT * WIDTH);

    // for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    //   setTimeout(() => {
    //     const node = visitedNodesInOrder[i];
    //     document.getElementById(`node-${node.row}-${node.col}`).className =
    //       'node node-visited';
    //   }, 10 * i);
    // }
  }
  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <button onClick={() => this.visualizeCaveGeneration()}>
          Generate Cave
        </button>

        <div className="grid">
          {grid.map((row, rowIx) => {
            return (
              <div key={rowIx} className="rowContainer">
                {row.map((node, nodeIx) => {
                  const { row, col, isWall } = node;
                  return (
                    <Node
                      key={nodeIx}
                      col={col}
                      row={row}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const createNode = (row, col) => {
  return {
    row,
    col,
    isWall:
      Math.random() > 0.55 ||
      row === 0 ||
      col === 0 ||
      row === HEIGHT - 1 ||
      col === WIDTH - 1
        ? true
        : false
  };
};

const createGrid = () => {
  const grid = [];
  for (let row = 0; row < HEIGHT; row++) {
    const currentRow = [];
    for (let col = 0; col < WIDTH; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const setNewGrid = (grid, row, col, val) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: val
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default Visualizer;
