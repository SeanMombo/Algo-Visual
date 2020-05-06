import React from "react";
import Visualizer from "./components/visualizer/visualizer.component";
import Navbar from "react-bootstrap/Navbar";
import BasicExample from "./components/basic-example";
// import ControlPanel from "./components/control-panel/control-panel.component";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleChangeWidth(w) {
    let width = w;
    this.setState({
      width: w
    });
  }
  render() {
    return (
      <div className="App">

        <div className="vis-wrapper">
          <Visualizer />
        </div>
      </div>

    );
  }
}

export default App;