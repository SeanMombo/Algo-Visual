import React from "react";
import Input from "../textinput/textinput.component";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { Form, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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

  incSize() {
    this.size += 5;
    if (this.size > 100) this.size = 100;
    this.setState({ size: this.size });
  }
  decSize() {
    this.size -= 5;

    if (this.size < 0) this.size = 0;
    this.setState({ size: this.size });
  }

  incChance() {
    this.initChance += 0.05;
    this.initChance = Math.round(this.initChance * 100) / 100;
    if (this.initChance > 1) this.initChance = 1;
    this.setState({ initChance: this.initChance });
  }
  decChance() {
    this.initChance -= 0.05;
    this.initChance = Math.round(this.initChance * 100) / 100;
    if (this.initChance < 0) this.initChance = 0;
    this.setState({ initChance: this.initChance });
  }

  incBirth() {
    this.birthLimit += 1;
    if (this.birthLimit > 8) this.birthLimit = 8;
    this.setState({ birthLimit: this.birthLimit });
  }
  decBirth() {
    this.birthLimit -= 1;
    if (this.birthLimit < 0) this.birthLimit = 0;
    this.setState({ birthLimit: this.birthLimit });
  }

  incDeath() {
    this.deathLimit += 1;
    if (this.deathLimit > 8) this.deathLimit = 8;
    this.setState({ deathLimit: this.deathLimit });
  }
  decDeath() {
    this.deathLimit -= 1;
    if (this.deathLimit < 0) this.deathLimit = 0;
    this.setState({ deathLimit: this.deathLimit });
  }

  caveGen = () => (
    <>
      <h2>Settings</h2>
      <br></br>

      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridSize">
            <Form.Label>Grid Size</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={this.decSize.bind(this)}
                >
                  -
                </Button>
              </InputGroup.Prepend>
              <Form.Control
                size="sm"
                type="text"
                placeholder="0-100"
                value={this.state.size}
                onChange={this.updateSize.bind(this)}
              />
              <InputGroup.Append>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={this.incSize.bind(this)}
                >
                  +
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridChance">
            <Form.Label>Initial Wall %</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={this.decChance.bind(this)}
                >
                  -
                </Button>
              </InputGroup.Prepend>
              <Form.Control
                size="sm"
                type="text"
                placeholder="0.0-1.0"
                value={this.state.initChance}
                onChange={this.updateChance.bind(this)}
              />
              <InputGroup.Append>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={this.incChance.bind(this)}
                >
                  +
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridSize">
            <Form.Label>Birth Limit</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={this.decBirth.bind(this)}
                >
                  -
                </Button>
              </InputGroup.Prepend>
              <Form.Control
                size="sm"
                type="text"
                placeholder="0-8"
                value={this.state.birthLimit}
                onChange={this.updateBirth.bind(this)}
              />
              <InputGroup.Append>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={this.incBirth.bind(this)}
                >
                  +
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridChance">
            <Form.Label>Death Limit</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={this.decDeath.bind(this)}
                >
                  -
                </Button>
              </InputGroup.Prepend>
              <Form.Control
                size="sm"
                type="text"
                placeholder="0-8"
                value={this.state.deathLimit}
                onChange={this.updateDeath.bind(this)}
              />
              <InputGroup.Append>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={this.incDeath.bind(this)}
                >
                  +
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Form.Row>
      </Form>

      <h2>Visualize</h2>
      <br></br>
      <div className="buttonWrapper">
        <Button onClick={this.visualizeCaveGeneration} variant="primary">
          Initialize The Grid
        </Button>
        <Button onClick={this.nextStepInVisualization} variant="success">
          Smoothing Step
        </Button>
        <Button onClick={this.killAllTimeouts} variant="danger">
          Abort Visualization
        </Button>
      </div>
    </>
  );

  render() {
    const { width, height, visualizeCaveGeneration } = this.props;

    return (
      <div className="control-panel">
        <Router>
          <Route exact path="/cavegen" component={this.caveGen} />
          <Route path="/floodfill" component={this.floodFill} />
        </Router>
      </div>
    );
  }
}

export default ControlPanel;
