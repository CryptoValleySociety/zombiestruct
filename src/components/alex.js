import React, { Component } from 'react'

import '../App.css'

class Alex extends Component {
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
            <div className="segment" id="alex">
                <h1>Alex</h1>
                <p id="data">This is my data</p>
                <button id="button" onClick={() => { this.callFunction() }}></button>
            </div>
        );
    }
}

export default Alex
