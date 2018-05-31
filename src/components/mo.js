import React, { Component } from 'react'
import web3 from '../../web3/providers/index'
import ZombieFeeding from '../../truffle/build/contracts/ZombieFeeding.json'

import '../App.css'

class Mo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: 'this is my data as a react state'
        }
    }

    componentDidMount() {
       this.createContract()
    }

    createContract() {
      const ZombieFeedingContract = new web3.default.eth.Contract(ZombieFeeding.abi)
      console.log('contract', ZombieFeedingContract)
      // this.setState({contract: ZombieFeeding})
      // console.log('component mounted')
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
            <div className="segment" id="mo">
                <h1>Mo</h1>
                <p id="data">{this.state.data}</p>
                <button id="button" onClick={() => { this.callFunction() }}></button>
            </div>
        );
    }
}

export default Mo
