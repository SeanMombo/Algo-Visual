import React from "react";
import Node from "./node/node.component";
import { generateCave, initCave } from "../algorithms/cave";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./visualizer.styles.scss";
import ControlPanel from "../control-panel/control-panel.component";

const caveAlgo = 0;
const floodAlgo = 1;

class Visualizer extends React.Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      width: 10,
      height: 10,
      birthLimit: 4,
      deathLimit: 3,
      initChance: 0.45,
      algo: floodAlgo
    };

    this.handleChangeWidth = this.handleChangeWidth.bind(this);
    this.handleChangeHeight = this.handleChangeHeight.bind(this);
    this.visualizeCaveGeneration = this.visualizeCaveGeneration.bind(this);
    this.nextStepInVisualization = this.nextStepInVisualization.bind(this);
    this.killAllTimeouts = this.killAllTimeouts.bind(this);
  }

  // create initial grid
  componentDidMount() {
    this.initGrid(true);
  }

  initGrid(isEmpty) {
    const grid = this.createGrid(isEmpty);
    this.setState({ grid });
  }

  //// EVENT LISTENERS ////////////////////
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

  killAllTimeouts() {
    var highestTimeoutId = setTimeout(";");
    for (var i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }
  }

  visualizeCaveGeneration(w, initChance, birthLimit, deathLimit) {
    this.setState(
      { width: w, height: w, birthLimit, deathLimit, initChance },
      function() {
        const grid = this.createGrid(true);
        this.setState({ grid }, function() {
          const boolGrid = initCave(
            this.state.grid,
            this.state.width,
            this.state.height,
            this.state.initChance
          );
          this.animateCaveGeneration(boolGrid);
        });
      }
    );
  }

  nextStepInVisualization() {
    const boolGrid = generateCave(
      this.state.grid,
      this.state.width,
      this.state.height,
      this.state.birthLimit,
      this.state.deathLimit
    );
    this.animateCaveGeneration(boolGrid);
  }

  animateCaveGeneration(boolGrid) {
    // const t = 0.5;
    const t = Math.min(70, 1000 / (this.state.width * this.state.width));
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
        }, t * col + row * (t * this.state.width) + t + 40);
      }
    }
    setTimeout(() => {
      for (let row = 0; row < this.state.height; row++) {
        for (let col = 0; col < this.state.width; col++) {
          this.setNewGrid(this.state.grid, row, col, boolGrid[row][col]);
        }
      }
    }, t * this.state.height * this.state.width);
  }

  ////////////////////////////////////////

  caveGen = () => (
    <ControlPanel
      algo={this.state.algo}
      width={this.state.width}
      height={this.state.height}
      onChangeWidth={this.handleChangeWidth}
      onChangeHeight={this.handleChangeHeight}
      visualizeCaveGeneration={this.visualizeCaveGeneration}
      nextStepInVisualization={this.nextStepInVisualization}
      killAllTimeouts={this.killAllTimeouts}
    />
  );

  floodFill = () => (
    <ControlPanel
      algo={this.state.algo}
      width={this.state.width}
      height={this.state.height}
      onChangeWidth={this.handleChangeWidth}
      onChangeHeight={this.handleChangeHeight}
      visualizeCaveGeneration={this.visualizeCaveGeneration}
      nextStepInVisualization={this.nextStepInVisualization}
      killAllTimeouts={this.killAllTimeouts}
    />
  );

  render() {
    const { grid, mouseIsPressed, width, height, algo } = this.state;

    return (
      <>
        <Router>
          <div className="wrapper3">
            <ul>
              <li>
                <Link to="/cavegen">Cave Generation</Link>
              </li>
              <li>
                <Link to="/floodfill">Flood Fill</Link>
              </li>
            </ul>
          </div>

          <Route exact path="/cavegen" component={this.caveGen} />
          <Route path="/floodfill" component={this.floodFill} />
        </Router>

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

  //// GRID FUNCTIONS
  createNode = (row, col, isEmpty) => {
    return {
      row,
      col,
      isWall: false
    };
  };

  createGrid = isEmpty => {
    const grid = [];
    for (let row = 0; row < this.state.height; row++) {
      const currentRow = [];
      for (let col = 0; col < this.state.width; col++) {
        currentRow.push(this.createNode(row, col, isEmpty));
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
