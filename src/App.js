import React, { Component } from 'react';
import Mo from './components/mo';
import Seb from './components/seb';
import Simon from './components/simon';
import Alex from './components/alex';
import contractMethods from './utils/calls/component';

import './App.css'

class App extends Component {
    constructor(props) {
      super(props)

      this.state = {
        contract: '',
        accounts: [],
        zombie_arr: []
      }
    }

    async componentDidMount() {
      this.initialize();
    }

    async initialize() {
      const initialObj = await contractMethods.initialize()
      const { contract, accounts } = initialObj
      await this.setState({
        contract: contract,
        accounts: accounts
      })
      this.setUp();
    }

    async _getZombie(account) {
      return await contractMethods.getZombiesByOwner(this.state.contract, account)
    }

    async createZombie(from, name) {
      const zombies = await this._getZombie(from)
      if (zombies.length === 0) {
        await contractMethods.createRandomZombie(this.state.contract, name, from, 300000)
        const arr = await this._getZombie(from)
        return arr[0]
      } else {
        return zombies[0]
      }
    }

    async setUp() {
      const zomb1 = await this.createZombie(this.state.accounts[0], 'Banter')
      const zomb2 = await this.createZombie(this.state.accounts[1], 'Joker')
      const zomb3 = await this.createZombie(this.state.accounts[2], 'Incase')
      const arr = [zomb1, zomb2, zomb3]
      await this.setState({ zombie_arr: arr })
    }

    render() {
      if(this.state.contract !== '' && this.state.accounts.length > 0 && this.state.zombie_arr.length > 0) {
        return (
          <div className="App">
            <Seb contract={this.state.contract} accounts={this.state.accounts} zombies={this.state.zombie_arr}/>
            <Mo contract={this.state.contract} accounts={this.state.accounts} zombies={this.state.zombie_arr}/>
            <Simon contract={this.state.contract} accounts={this.state.accounts} zombies={this.state.zombie_arr}/>
            <Alex contract={this.state.contract} accounts={this.state.accounts} zombies={this.state.zombie_arr}/>
          </div>
        );
      } else {
        return (
          <div className="App">
            <h1>Initializing blockchain connection</h1>
          </div>
        );
      }
    }
}

export default App
