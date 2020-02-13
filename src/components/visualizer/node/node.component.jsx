import React from "react";

import "./node.styles.scss";

export default class Node extends React.Component {
  render() {
    const {
      col,
      row,
      isWall,
      isStart,
      isFilled,
      onMouseDown,
      onMouseEnter,
      onMouseUp
    } = this.props;

    const extraClass = isWall
      ? "wall"
      : isStart
      ? "start"
      : isFilled
      ? "isFilled"
      : "";

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClass}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        draggable={false}
      ></div>
    );
  }
}
