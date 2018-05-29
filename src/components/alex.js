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
            account_1: '3fa319a3f6353885b97375d61d999696d3db4293c821aad3ff0aae885933c739',
            contract: ''
        }
    }

    componentDidMount() {
        // web3.default.setProvider(new web3.default.providers.HttpProvider('http://localhost:8545'))
        this.instantiateContract();
    }

    async instantiateContract() {
        const zombieAttackContract = new web3.default.eth.Contract(ZombieAttackAbi.abi, contracts.upperApp)
        console.log('contract', web3.default.eth)
        this.setState({contract: zombieAttackContract})
        // TODO:
        // console.log('contract in state', this.state.contract)
        // this.createZombie()
        // createRandomZombie("Banter", { from: this.state.account_1 })
        // // web3.default.eth.getTransactionReceipt(randMod)
        var randMod = zombieAttackContract.methods.randMod('100000000');
        randMod.call().then((txhash) => {console.log('txhash', txhash)})
        console.log(randMod)
    }

    // async createZombie() {
    //     //call the blockchain to revtrieve my data
    //     await this.state.contract.methods.createRandomZombie("Banter", { from: '0x7c8a642e4174e7b60a80bba0732fbd9998eeb070' });
    // }

    createZombie() {
        console.log('hello')
        // call function 
        // wait for reciept then call retrieve data function
        // this.updateData();
        .then((txReciept) => {
            console.log('reciept', txReciept);
        })
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
