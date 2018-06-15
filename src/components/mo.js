import React, { Component } from 'react'
import web3 from '../../web3/providers/index'
import ZombieFeeding from '../../truffle/build/contracts/ZombieFeeding.json'

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
       this.createContract()

    }


    async createContract() {
      const MainContract = new web3.default.eth.Contract(ZombieAttack.abi, '0x97c181a8e6dda4a91d01f650d3ae60170a798fb4')

      const account = await web3.default.eth.getAccounts()[0]

      this.setState({
        contract: MainContract,
        account: account
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
}

export default Mo
