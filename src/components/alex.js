import React, { Component } from 'react';
import web3 from '../../web3/providers/index';
import ZombieAttackAbi from '../../truffle/build/contracts/ZombieAttack.json';
import {contracts} from '../../web3/addresses/contracts';

import '../App.css'

class Alex extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: 'this is my data as a react state',
            contract: ''
        }
    }

    componentDidMount() {
        // web3.default.setProvider(new web3.default.providers.HttpProvider('http://localhost:8545'))
        this.instantiateContract();
    }

    instantiateContract() {
        const zombieAttackContract = new web3.default.eth.Contract(ZombieAttackAbi.abi, contracts.upperApp)
        console.log('contract', zombieAttackContract)
        this.setState({contract: zombieAttackContract})
        // this.createZombie()
    }

    // async createZombie() {
    //     //call the blockchain to revtrieve my data
    //     await this.state.contract.methods.createRandomZombie("Banter", { from: '0x7c8a642e4174e7b60a80bba0732fbd9998eeb070' });
    // }

    callFunction() {
        console.log('hello')
        // call function 
        // wait for reciept then call retrieve data function
        this.updateData();
    }

    render() {
        return (
            <div className="segment" id="alex">
                <h1>Alex</h1>
                <p id="data">{this.state.data}</p>
                <button id="button" onClick={() => { this.callFunction() }}></button>
            </div>
        );
    }
}

export default Alex
