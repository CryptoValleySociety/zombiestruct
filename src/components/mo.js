import React, { Component } from 'react'
import web3 from '../../web3/providers/index'
import ZombieAttack from '../../truffle/build/contracts/ZombieAttack.json'

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

    async createZombie() {
        const { contract, account } = this.state
        await contract.methods.createRandomZombie('Mohammad').send()
        const zombieId = await contract.methods.getZombiesByOwner(account).call()
        console.log(zombieId);
    }

  async callFunction() {
        console.log('hello')
        await this.createZombie();
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
