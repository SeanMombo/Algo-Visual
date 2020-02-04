import React from "react";
import Node from "./node/node.component";
import "./visualizer.styles.scss";

class Visualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [],
      mouseDown: false
    };
  }

  // create initial grid
  componentDidMount() {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const curRow = [];
      for (let col = 0; col < 50; col++) {
        curRow.push(this.createNode(row, col));
      }
      grid.push(curRow);
    }
    this.setState({ grid });
  }

  createNode(row, col) {
    return {
      row,
      col,
      isWall: false
    };
  }

  handleMouseDown(row, col) {
    const newGrid = this.state.grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall
    };
    newGrid[row][col] = node;

    this.setState({ grid: newGrid, mouseDown: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseDown) return;

    const newGrid = this.state.grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall
    };
    newGrid[row][col] = newNode;

    this.setState({ grid: newGrid });
  }
  handleMouseUp() {
    this.setState({ mouseDown: false });
  }

  render() {
    const { grid } = this.state;

    return (
      <div className="visualizer">
        <div className="grid">
          {grid.map((row, rowIx) => {
            return (
              <div className="rowContainer">
                {row.map((node, nodeIx) => {
                  const { row, col, isWall } = node;
                  return (
                    <Node
                      key={nodeIx}
                      col={col}
                      row={row}
                      isWall={isWall}
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
      </div>
    );
  }
}

export default Visualizer;
