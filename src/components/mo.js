<<<<<<< HEAD
import React, { Component } from 'react'
=======
import React, {Component} from 'react'
>>>>>>> 84b713c... ADD automated contract updating, working on connecting to main net
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
<<<<<<< HEAD
      const zombie = await contractMethods.getZombieById(contract, id)
      this.setState({
        data: this.state.data + zombie['0'] + '\n' + zombie['1']
      })
      return zombie
=======
        const zombie = await contractMethods.getZombieById(contract, id)
        this.setState({
          data: this.state.data + zombie['0'] + '\n' + zombie['1']
        })
        return zombie
>>>>>>> 84b713c... ADD automated contract updating, working on connecting to main net
    })


  }

  async createZombie() {
    const { contract, account } = this.state
    try {
      await contractMethods.createRandomZombie(contract, "Mohammad", account, 3000000)
    }
    catch (e) {
<<<<<<< HEAD
      throw ('Unable to create zombie', e)
=======
      throw('Unable to create zombie', e)
>>>>>>> 84b713c... ADD automated contract updating, working on connecting to main net
    }
    this.getZombiesByOwner(contract, account)
  }

  async feedOnKitty() {
    const { contract, account } = this.state
    await contractMethods.feedOnKitty(contract, account, 3000000)
<<<<<<< HEAD
    this.getZombiesByOwner(contract, account)
=======
>>>>>>> 84b713c... ADD automated contract updating, working on connecting to main net
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