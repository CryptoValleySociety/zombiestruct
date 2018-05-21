import React, { Component } from 'react'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>This is an app</h1>
        <div className="segment" id="simon"></div>
        <div className="segment" id="seb"></div>
        <div className="segment" id="mo"></div>
        <div className="segment" id="alex"></div>
      </div>
    );
  }
}

export default App
