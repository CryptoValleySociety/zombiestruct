import React, { Component } from 'react'
import contractMethods from '../utils/calls/component'


import '../App.css'

class Mo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: 'this is my data as a react state',
      contract: this.props.contract,
      account: this.props.accounts[4]
    }
  }


  async componentDidMount() {
    const { contract, account } = this.state
    await this.getZombiesByOwner(contract, account)
    await this.connectToKitty()
  }

  async connectToKitty() {
    const { contract, account } = this.state
    await contractMethods.connectToKitty(contract, account, 3000000)
  }

  async getZombiesByOwner(contract, account) {
    const zombieId = await contractMethods.getZombiesByOwner(contract, account)
    // TODO: if zombie ID does not exist at the start, set data state as NO ZOMBIE CREATED
    const zombie = await contractMethods.getZombieById(contract, zombieId[0])
    if (zombie) {
      this.setState({
        data: zombie.name + ' ' + zombie.dna
      })
    }
  }

  async createZombie() {
    const { contract, account } = this.state
    // TODO: if statement if already created or VM error occurs
    // with notification saying zombie already created
    await contractMethods.createRandomZombie(contract, "Mohammad", account, 3000000)
    // TODO: on creation call getZombiesByOwner to update state
  }

  async feedOnKitty() {
    const { contract, account } = this.state
    await contractMethods.feedOnKitty(contract, account, 3000000)
    // TODO: on creation call getZombiesByOwner to update state
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