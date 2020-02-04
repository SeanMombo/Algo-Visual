import React from "react";

import "./node.styles.scss";

class Node extends React.Component {
  render() {
    const {
      col,
      row,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp
    } = this.props;

    const extraClass = isWall ? "wall" : "";

    return (
      <div
        id={`${row}-${col}`}
        className={`node ${extraClass}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}

export default Node;
