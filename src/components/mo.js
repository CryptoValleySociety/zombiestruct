import React, { Component } from 'react'
import contractMethods from '../utils/calls/component'

import '../App.css'

class Mo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: '',
      contract: this.props.contract,
      accounts: this.props.accounts,
      zombies: this.props.zombies_arr,
      account: this.props.accounts[0]
    }
  }

  componentDidMount() {
    const { contract, account } = this.state
    this.getZombiesByOwner(contract, account)
  }

  async getZombiesByOwner(contract, account) {
    const zombieIds = await contractMethods.getZombiesByOwner(contract, account)
    zombieIds.forEach(async (id) => {
      const zombie = await contractMethods.getZombieById(contract, id)
      this.setState({
        data: zombie['0'] + '\n' + zombie['1']
      })
      return zombie
    })


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
      </div>
    );
  }

}

export default Mo
