import React from "react";
import Visualizer from "./components/visualizer/visualizer.component";
import Navbar from "react-bootstrap/Navbar";
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
        <div className="wrapper3">
          <h1>Cellular Automata Cave Generation</h1>
        </div>
        <div className="wrapper2">
          <Visualizer />
        </div>
      </div>
    );
  }
}

export default App;
