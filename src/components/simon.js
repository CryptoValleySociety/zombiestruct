import React, { Component } from 'react'

import '../App.css'

class Simon extends Component {
    componentDidMount() {
        // initiate contract
        // call function retriev data
        console.log('component mounted')
    }

    callFunction() {
        console.log('hello')
        // call function 
        // wait for reciept then call retrieve data function
    }

    render() {
        return (
            <div className="segment" id="simon">
                <h1>Simon</h1>
                <p id="data">This is my data</p>
                <button id="button" onClick={() => { this.callFunction() }}></button>
            </div>
        );
    }
}

export default Simon
