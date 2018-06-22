import React, { Component } from 'react';
import contractMethods from '../utils/calls/component';


import '../App.css'

class Alex extends Component {
    constructor(props) {
        super(props)

        this.state = {
            contract: this.props.contract,
            accounts: this.props.accounts,
            zombie_one: this.props.zombies[0],
            zombie_two: this.props.zombies[1],
            winLoss: 0
        }
    }


    async attack() {
        const res = await contractMethods.attack(this.state.contract, this.state.accounts[0], 300000, this.state.zombie_one, this.state.zombie_two)
        await this.setState({ winLoss: res})

    }

    render() {
        return (
            <div className="segment" id="alex">
                <h1>Alex</h1>
                <p id="data">WIN/LOSS COUNT:  {this.state.winLoss}</p>
                <button id="button" onClick={() => { this.attack() }}></button>
            </div>
        );
    }
}

export default Alex
