import React from "react";
import Input from "../textinput/textinput.component";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { Form, Row, Col } from "react-bootstrap";

import "./control-panel.styles.scss";

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.size = 20;
    this.initChance = 0.45;

    this.birthLimit = 4;
    this.deathLimit = 3;

    this.state = {
      size: 20,
      initChance: 0.45,
      birthLimit: 4,
      deathLimit: 3
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
  visualizeCaveGeneration() {
    this.props.visualizeCaveGeneration(
      this.size,
      this.initChance,
      this.birthLimit,
      this.deathLimit
    );
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
    this.size = Number(size);
    this.setState({ size });
  }
  updateChance(e) {
    let initChance = e.target.value;
    if (initChance > 1) initChance = 0.45;
    this.initChance = Number(initChance);
    this.setState({ initChance });
  }

  updateBirth(e) {
    let birthLimit = e.target.value.replace(/\D/, "");
    if (birthLimit > 8) birthLimit = 8;
    this.birthLimit = Number(birthLimit);
    this.setState({ birthLimit });
  }

  updateDeath(e) {
    let deathLimit = e.target.value.replace(/\D/, "");
    if (deathLimit > 8) deathLimit = 8;
    this.deathLimit = Number(deathLimit);
    this.setState({ deathLimit });
  }

  render() {
    const { width, height, visualizeCaveGeneration } = this.props;

    return (
      <div className="control-panel">
        <h2>Settings</h2>
        <br></br>

        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridSize">
              <Form.Label>Grid Size</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <Button variant="outline-secondary">-</Button>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="0-100"
                  value={this.state.size}
                  onChange={this.updateSize.bind(this)}
                />
                <InputGroup.Append>
                  <Button variant="outline-secondary">+</Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridChance">
              <Form.Label>Initial Wall %</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <Button variant="outline-secondary">-</Button>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="0.0-1.0"
                  value={this.state.initChance}
                  onChange={this.updateChance.bind(this)}
                />
                <InputGroup.Append>
                  <Button variant="outline-secondary">+</Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridSize">
              <Form.Label>Birth Limit</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <Button variant="outline-secondary">-</Button>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="0-8"
                  value={this.state.birthLimit}
                  onChange={this.updateBirth.bind(this)}
                />
                <InputGroup.Append>
                  <Button variant="outline-secondary">+</Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridChance">
              <Form.Label>Death Limit</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <Button variant="outline-secondary">-</Button>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="0-8"
                  value={this.state.deathLimit}
                  onChange={this.updateDeath.bind(this)}
                />
                <InputGroup.Append>
                  <Button variant="outline-secondary">+</Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Form.Row>
        </Form>
        {/* <InputGroup className="mb-3">
          
          <FormControl
            placeholder="Grid Size"
            aria-label="Grid width and height set to this value"
            value={this.state.size}
            onChange={this.updateSize.bind(this)}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <FormControl
            placeholder="Initial Chance"
            aria-label="Chance for each cell to be alive on initialization."
            value={this.state.size}
            onChange={this.updateSize.bind(this)}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <FormControl
            placeholder="Birth Limit"
            aria-label="Chance for each cell to be alive on initialization."
            value={this.state.size}
            onChange={this.updateSize.bind(this)}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <FormControl
            placeholder="Death Limit"
            aria-label="Chance for each cell to be alive on initialization."
            value={this.state.size}
            onChange={this.updateSize.bind(this)}
          />
        </InputGroup> */}

        <h2>Visualize</h2>
        <br></br>
        {/* <ButtonGroup size="lg" className="bg"> */}
        <Button onClick={this.visualizeCaveGeneration} variant="primary">
          Initialize Grid
        </Button>
        <Button onClick={this.nextStepInVisualization} variant="success">
          Smoothing Step
        </Button>
        <Button onClick={this.killAllTimeouts} variant="danger">
          Emergency Stop
        </Button>
        {/* </ButtonGroup> */}
      </div>
    );
  }
}

export default ControlPanel;
