import React from "react";
import { render } from "react-dom";

import "./textinput.style.scss";

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: (props.locked && props.active) || false,
      value: props.value || "",
      error: props.error || "",
      label: props.label || "Label"
    };

    this.handleChangeWidth = this.handleChangeWidth.bind(this);
    this.handleChangeHeight = this.handleChangeHeight.bind(this);
  }

  handleChangeWidth(e) {
    this.props.onChangeWidth(Number(e.target.value));
    this.changeValue(e);
  }

  handleChangeHeight(e) {
    this.props.onChangeHeight(Number(e.target.value));
    this.changeValue(e);
  }

  changeValue(event) {
    const value = event.target.value;
    this.setState({ value, error: "" });
  }

  handleKeyPress(event) {
    // if (event.which === 13) {
    //   this.setState({ value: this.props.predicted });
    // }
  }

  render() {
    const { active, value, error, label } = this.state;
    const { predicted, locked } = this.props;
    const fieldClassName = `field ${(locked ? active : active || value) &&
      "active"} ${locked && !active && "locked"}`;

    return (
      <div className="wrapper">
        {/* <button>-</button> */}
        <div className={fieldClassName}>
          <input
            id={1}
            type="text"
            value={value}
            placeholder={label}
            autocomplete="off"
            onChange={this.handleChangeWidth}
            onKeyPress={this.handleKeyPress.bind(this)}
          />

          {/* {label === "Width" ? (
            <input
              id={1}
              type="text"
              value={value}
              placeholder={label}
              autocomplete="off"
              onChange={this.handleChangeWidth}
              onKeyPress={this.handleKeyPress.bind(this)}
            />
          ) : (
            <input
              id={2}
              type="text"
              value={value}
              placeholder={label}
              autocomplete="off"
              onChange={this.handleChangeHeight}
              onKeyPress={this.handleKeyPress.bind(this)}
            />
          )} */}
        </div>
        {/* <button>+</button> */}
      </div>
    );
  }
}

render(
  <Input
    id={1}
    label="Field label"
    predicted="California"
    locked={false}
    active={false}
  />,
  document.getElementById("root")
);

export default Input;
