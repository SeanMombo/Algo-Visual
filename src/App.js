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
    let wid = w;
    this.setState({ width: w });
  }
  render() {
    return (
      // <BasicExample />
      <div className="App">
        {/* <div className="wrapper3">Title Here</div> */}

        {/* <div> */}
        <div className="wrapper2">
          <Visualizer />
        </div>
      </div>
      // </div>
    );
  }
}

export default App;
