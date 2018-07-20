import React, { Component } from 'react';
import contractMethods from '../utils/infura/index';

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

    async _attack(from, _zombieId, _toId) {
        return await contractMethods.attack(from, _zombieId, _toId)
    }

    async attack() {
        this.setState({winLoss: "awaiting blockchain response"})
        const res = await contractMethods.attack(this.state.accounts[0], this.state.zombie_one, this.state.zombie_two)
        await this.setState({ winLoss: res.blockNumber})
    }

    render() {
        return (
            <div className="segment" id="alex">
                <h1>Alex</h1>
                <p id="data">ATTACK HAPPENED ON BLOCK:  {this.state.winLoss}</p>
                <button id="button" onClick={() => { this.attack() }}>Attack</button>
            </div>
        );
    }
}

export default Alex
