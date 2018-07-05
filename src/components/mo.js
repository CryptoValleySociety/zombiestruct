import React, { Component } from 'react'
import contractMethods from '../utils/calls/component'

import '../App.css'

class Mo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: 'this is my data as a react state',
      contract: this.props.contract,
      accounts: this.props.accounts,
      zombies: this.props.zombies_arr,
      account: this.props.accounts[0]
    }
  }


  async getZombiesByOwner(contract, account) {
    const zombieIds = await contractMethods.getZombiesByOwner(contract, account)
    zombieIds.forEach(async (id) => {
      const zombie = await contractMethods.getZombieById(contract, id)
      this.setState({
        data: this.state.data + zombie['0'] + '\n' + zombie['1']
      })
      return zombie
    })


  }

  async createZombie() {
    const { contract, account } = this.state
    try {
      await contractMethods.createRandomZombie(contract, "Mohammad", account, 3000000)
    }
    catch (e) {
      throw ('Unable to create zombie', e)
    }
    this.getZombiesByOwner(contract, account)
  }

  async feedOnKitty() {
    const { contract, account } = this.state
    await contractMethods.feedOnKitty(contract, account, 3000000)
    this.getZombiesByOwner(contract, account)
  }

  render() {
    return (
      <div className="segment" id="mo">
        <h1>Mo</h1>
        <p id="data">{this.state.data}</p>
        <button id="button" onClick={() => {
          this.feedOnKitty()
        }}>feedonkitty</button>
        <button id="button" onClick={() => {
          this.createZombie()
        }}>createZombie</button>
      </div>
    );
  }

}

export default Mo
