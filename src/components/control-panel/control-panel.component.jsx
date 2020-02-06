import React from "react";
import Input from "../textinput/textinput.component";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import "./control-panel.styles.scss";

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.size = 20;
    this.state = {
      size: 20
    };
    this.handleChangeWidth = this.handleChangeWidth.bind(this);
    this.handleChangeHeight = this.handleChangeHeight.bind(this);
    this.visualizeCaveGeneration = this.visualizeCaveGeneration.bind(this);
    this.nextStepInVisualization = this.nextStepInVisualization.bind(this);
    this.killAllTimeouts = this.killAllTimeouts.bind(this);
  }

  handleChangeWidth(w) {
    this.props.onChangeWidth(w);
  }
  handleChangeHeight(h) {
    this.props.onChangeHeight(h);
  }
  visualizeCaveGeneration(w) {
    this.props.visualizeCaveGeneration(this.size);
  }
  nextStepInVisualization() {
    this.props.nextStepInVisualization();
  }
  killAllTimeouts() {
    this.props.killAllTimeouts();
  }

  updateSize(e) {
    let size = e.target.value.replace(/\D/, "");
    if (size > 100) size = 100;
    this.setState({ size });
    this.size = Number(size);
  }

  render() {
    const { width, height, visualizeCaveGeneration } = this.props;

    return (
      <div className="control-panel">
        <h1>Settings</h1>
        <br></br>
        <InputGroup className="mb-3" size="lg">
          <InputGroup.Text id="inputGroup-sizing-sm">Size</InputGroup.Text>
          <FormControl
            placeholder="Width/Height"
            aria-label="Size of the width and height of grid"
            value={this.state.size}
            onChange={this.updateSize.bind(this)}
          />
        </InputGroup>
        <h1>Visualize</h1>
        <br></br>
        {/* <ButtonGroup size="lg" className="bg"> */}
        <Button
          onClick={this.visualizeCaveGeneration}
          variant="primary"
          size="lg"
        >
          Initialize Grid
        </Button>
        <Button
          onClick={this.nextStepInVisualization}
          variant="success"
          size="lg"
        >
          Smoothing Step
        </Button>
        <Button onClick={this.killAllTimeouts} variant="danger" size="lg">
          Emergency Stop
        </Button>
        {/* </ButtonGroup> */}
      </div>
    );
  }
}

export default ControlPanel;
