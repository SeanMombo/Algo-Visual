import React from "react";
import Visualizer from "./components/visualizer/visualizer.component";
// import ControlPanel from "./components/control-panel/control-panel.component";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleChangeWidth(w) {
    let wid = w;
    this.setState({ width: w });
  }
  render() {
    return (
      <div className="App">
        <Visualizer />
      </div>
    );
  }
}

export default App;
