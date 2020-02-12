import React from "react";

import "./node.styles.scss";

export default class Node extends React.Component {
  render() {
    const {
      col,
      row,
      isWall,
      isStart,
      onMouseDown,
      onMouseEnter,
      onMouseUp
    } = this.props;

    const extraClass = isWall ? "wall" : isStart ? "start" : "";

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClass}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}
