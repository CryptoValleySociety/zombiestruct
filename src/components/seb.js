import React, { Component } from 'react'

import '../App.css'

class Seb extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: 'this is my data as a react state'
        }
    }

    componentDidMount() {
        // initiate contract
        // call function retrieve data
        console.log('component mounted')
    }

    updateData() {
        //call the blockchain to revtrieve my data
        var newData = "this is a change"
        this.setState({ data: newData })
    }

    callFunction() {
        console.log('hello')
        // call function 
        // wait for reciept then call retrieve data function
        this.updateData();
    }
    render() {
        return (
            <div className="segment" id="seb">
                <h1>Seb</h1>
                <p id="data">{this.state.data}</p>
                <button id="button" onClick={() => {this.callFunction()}}></button>
            </div>
        );
    }
}

export default Seb
