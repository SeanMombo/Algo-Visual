import React from "react";
import Node from "./node/node.component";
import { generateCave } from "../algorithms/cave";

import "./visualizer.styles.scss";
import ControlPanel from "../control-panel/control-panel.component";

class Visualizer extends React.Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      width: 10,
      height: 10
    };

    this.handleChangeWidth = this.handleChangeWidth.bind(this);
    this.handleChangeHeight = this.handleChangeHeight.bind(this);
    this.visualizeCaveGeneration = this.visualizeCaveGeneration.bind(this);
    this.nextStepInVisualization = this.nextStepInVisualization.bind(this);
  }

  // create initial grid
  componentDidMount() {
    this.initGrid();
  }

  initGrid() {
    const grid = this.createGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  handleChangeWidth(w) {
    this.setState({ width: w });
  }
  handleChangeHeight(h) {
    this.setState({ height: h });
  }

  visualizeCaveGeneration() {
    const grid = this.createGrid();

    this.setState({ grid }, function() {
      const boolGrid = generateCave(
        this.state.grid,
        this.state.width,
        this.state.height
      );
      this.animateCaveGeneration(boolGrid);
    });
  }

  nextStepInVisualization() {
    const boolGrid = generateCave(
      this.state.grid,
      this.state.width,
      this.state.height
    );
    this.animateCaveGeneration(boolGrid);
  }

  animateCaveGeneration(boolGrid) {
    // const t = 0.5;
    const t = 0.3;
    for (let row = 0; row < this.state.height; row++) {
      for (let col = 0; col < this.state.width; col++) {
        const val = boolGrid[row][col];
        const el = document.getElementById(`node-${row}-${col}`);
        setTimeout(() => {
          if (
            val === 1 ||
            row === 0 ||
            col === 0 ||
            row === this.state.height - 1 ||
            col === this.state.width - 1
          ) {
            el.classList.add("wall");
          } else {
            el.classList.remove("wall");
          }

          el.classList.add("visited");
        }, t * col + row * (t * this.state.width));

        setTimeout(() => {
          el.classList.remove("visited");
        }, t * col + row * (t * this.state.width) + 20);
      }
    }
    setTimeout(() => {
      for (let row = 0; row < this.state.height; row++) {
        for (let col = 0; col < this.state.width; col++) {
          this.setNewGrid(this.state.grid, row, col, boolGrid[row][col]);
        }
      }
    }, t * this.state.height * this.state.width);

    // for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    //   setTimeout(() => {
    //     const node = visitedNodesInOrder[i];
    //     document.getElementById(`node-${node.row}-${node.col}`).className =
    //       'node node-visited';
    //   }, 10 * i);
    // }
  }

  render() {
    const { grid, mouseIsPressed, width, height } = this.state;

    return (
      <>
        <ControlPanel
          width={width}
          height={height}
          onChangeWidth={this.handleChangeWidth}
          onChangeHeight={this.handleChangeHeight}
          visualizeCaveGeneration={this.visualizeCaveGeneration}
          nextStepInVisualization={this.nextStepInVisualization}
        />
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

  createNode = (row, col) => {
    return {
      row,
      col,
      isWall:
        Math.random() > 0.55 ||
        row === 0 ||
        col === 0 ||
        row === this.state.height - 1 ||
        col === this.state.width - 1
          ? true
          : false
    };
  };

  createGrid = () => {
    const grid = [];
    for (let row = 0; row < this.state.height; row++) {
      const currentRow = [];
      for (let col = 0; col < this.state.width; col++) {
        currentRow.push(this.createNode(row, col));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  setNewGrid = (grid, row, col, val) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: val
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };
}

export default Visualizer;
