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

<<<<<<< HEAD
=======
    async listen() {
      const { contract } = this.state
      console.log(contract);
      const { _address } = contract
      console.log(contract);
      const createZombieEvent = contract.at(_address)
    }

    async createContract() {
      const MainContract = new web3.default.eth.Contract(ZombieAttack.abi, '0x1a812d086af307e9796da84a1a1a66dd56bd7443')
      const accounts = await web3.default.eth.getAccounts()
      this.setState({
        contract: MainContract,
        account: accounts[0]
      })
      // await this.listen()
    }

    async listen() {
      const { contract } = this.state
      console.log(contract);
      const { _address } = contract
      console.log(contract);
      const createZombieEvent = contract.at(_address)
    }

    async createZombie(gas) {
        const { contract, account } = this.state
        console.log(account);
        await contract.methods.createRandomZombie('Mohammad').send({from: account, gas: gas})
        const zombieOneId = await contract.methods.getZombiesByOwner(account).call()
    }

  async callFunction() {
        console.log('hello')
        await this.createZombie();
         // call function
        // wait for reciept then call retrieve data function
        this.createZombie();

    }

    render() {
        return (
            <div className="segment" id="mo">
                <h1>Mo</h1>
                <p id="data">{this.state.data}</p>
                <button id="button" onClick={() => { this.callFunction() }}></button>
            </div>
        );
    }
>>>>>>> 0fc6985... SOLVED merge conflicts
}

export default Mo