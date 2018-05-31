import React, { Component } from 'react';
import web3 from '../utils/web3/providers/index';
import funcLib from '../utils/calls/component';

import '../App.css'

class Alex extends Component {
    constructor(props) {
        super(props)

        this.state = {
            contract: '',
            accounts: [],
            reciept: '',
            zombie_one: '',
            zombie_two: '',
            winLoss: 0
        }
    }

    async componentDidMount() {
        this.initialize();
    }

    async initialize() {
        const initialObj = await funcLib.initialize()
        await this.setState({
            contract: initialObj.contract,
            accounts: initialObj.accounts
        })
        this.setUp()
    }

    async _createZombie(name) {
        await funcLib.createRandomZombie(this.state.contract, name)
    }

    async _getZombie(account) {
        return await funcLib.getZombiesByOwner(this.state.contract, account)
    }

    async _attack(from, gas, _zombieId, _toId) {
        return await funcLib.attack(this.state.contract, from, gas, _zombieId, _toId)
    }

    async createZombie(from, name) {
        const zombies = await this._getZombie(from)
        if(zombies.length === 0){
            console.log('zombies dont exist')
            await funcLib.createRandomZombie(this.state.contract, name, from, 300000)
            const arr = await this._getZombie(from)
            return arr[0]
        } else {
            console.log('zombies exist')
            return zombies[0]
        }
    }

    async setUp() {
        const zomb1 = await this.createZombie(this.state.accounts[0], 'Banter')
        const zomb2 = await this.createZombie(this.state.accounts[1], 'Joker')
        await this.setState({ zombie_one: zomb1, zombie_two: zomb2})
    }

    async attack() {
        const res = await funcLib.attack(this.state.contract, this.state.accounts[0], 300000, this.state.zombie_one, this.state.zombie_two)
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
