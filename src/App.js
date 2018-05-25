import React, { Component } from 'react';
import Mo from './components/mo';
import Seb from './components/seb';
import Simon from './components/simon';
import Alex from './components/alex';

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Seb />
        <Mo />
        <Simon />
        <Alex />
      </div>
    );
  }
}

export default App
