import React, {Component} from 'react'
import web3 from '../utils/web3/providers/index'
import ZombieAttack from '../../truffle/build/contracts/ZombieAttack.json'
import contractMethods from '../utils/calls/component'

import '../App.css'

class Mo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: 'this is my data as a react state',
      contract: null,
      account: null
    }
  }

  componentDidMount() {
    this.initialize()
  }

  async initialize() {
    const data = await contractMethods.initialize()
    const {contract, accounts} = data
    const account = accounts[0]
    await this.setState({contract: contract, account: account})
    await this.getZombiesByOwner(contract, account)
    await this.connectToKitty()
  }

  async getZombiesByOwner(contract, account) {
    const zombieId = await contractMethods.getZombiesByOwner(contract, account)
    const zombie = await contractMethods.getZombieById(contract, zombieId[0])
    if(zombie) {
      this.setState({
        data: zombie.name + zombie.dna
      })
    }
  }

  async createZombie() {
    const { contract, account } = this.state
    await contractMethods.createRandomZombie(contract, "Mohammad", account, 3000000)
  }

  async connectToKitty() {
    const { contract, account } = this.state
    await contractMethods.connectToKitty(contract, account, 3000000)
  }

  async feedOnKitty() {
    const { contract, account } = this.state
    await contractMethods.feedOnKitty(contract, account, 3000000)
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
