import React, { Component } from 'react';
import contractMethods from '../utils/calls/component';

import '../App.css'

class Alex extends Component {
    constructor(props) {
        super(props)

        this.state = {
<<<<<<< HEAD
            contract: this.props.contract,
            accounts: this.props.accounts,
            zombie_one: this.props.zombies[0],
            zombie_two: this.props.zombies[1],
            winLoss: 0
=======
            data: 'this is my data as a react state',
            account_1: '3fa319a3f6353885b97375d61d999696d3db4293c821aad3ff0aae885933c739',
            contract: ''
>>>>>>> Add async to babel
        }
    }

    async _attack(from, gas, _zombieId, _toId) {
        return await contractMethods.attack(this.state.contract, from, gas, _zombieId, _toId)
    }

<<<<<<< HEAD
    async attack() {
        const res = await contractMethods.attack(this.state.contract, this.state.accounts[0], 300000, this.state.zombie_one, this.state.zombie_two)
        await this.setState({ winLoss: res})
=======
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
>>>>>>> Add async to babel
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
