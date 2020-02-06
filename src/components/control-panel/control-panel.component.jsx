import React from "react";
import Input from "../textinput/textinput.component";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import "./control-panel.styles.scss";

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeWidth = this.handleChangeWidth.bind(this);
    this.handleChangeHeight = this.handleChangeHeight.bind(this);
    this.visualizeCaveGeneration = this.visualizeCaveGeneration.bind(this);
    this.nextStepInVisualization = this.nextStepInVisualization.bind(this);
  }

  handleChangeWidth(w) {
    this.props.onChangeWidth(w);
  }
  handleChangeHeight(h) {
    this.props.onChangeHeight(h);
  }
  visualizeCaveGeneration() {
    this.props.visualizeCaveGeneration();
  }
  nextStepInVisualization() {
    this.props.nextStepInVisualization();
  }

  render() {
    const { width, height, visualizeCaveGeneration } = this.props;

    return (
      <div className="control-panel">
        <Input
          label="Size"
          value={width}
          onChangeWidth={this.handleChangeWidth}
        ></Input>
        {/* <Input
          label="Height"
          value={height}
          onChangeHeight={this.handleChangeHeight}
        ></Input> */}
        <Button variant="danger">Danger</Button>
        <button onClick={this.visualizeCaveGeneration}>Generate Caves</button>
        <button onClick={this.nextStepInVisualization}>
          Next Smoothing Pass
        </button>
      </div>
    );
  }
}

export default ControlPanel;
