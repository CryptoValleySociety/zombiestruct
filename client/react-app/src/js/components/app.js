import React, { Component } from "react";
import ReactDOM from "react-dom";

// use all App.js as main hub, introduce React Router, all that jazz here

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello!</h1>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
