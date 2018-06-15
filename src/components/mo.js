import React, {Component} from 'react'
import web3 from '../utils/web3/providers/index'
import ZombieAttack from '../../truffle/build/contracts/ZombieAttack.json'
import contractMethods from '../utils/calls/component'

import '../App.css'

class Mo extends Component {
  constructor(props) {
    super(props)

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
    // await this.getZombiesByOwner(contract, account)
  }

  async getZombiesByOwner(contract, account) {
    const zombieId = await contractMethods.getZombiesByOwner(contract, account)
    console.log(zombieId);
  }

  async createZombie() {
    const { contract, account } = this.state
    const receipt = await contractMethods.createRandomZombie(contract, "Mohammad", account, 30000)
    console.log(receipt);
  }

  async connectToKitty() {
    const { contract, account } = this.state
    const receipt = await contractMethods.connectToKitty(contract, account, 250000)
    console.log(receipt);
    // const kittyId = await this.feedOnKitty()
    // console.log(kittyId);
  }

  async feedOnKitty() {
    const { contract, account } = this.state
    await contractMethods.feedOnKitty(contract, account, 250000)
  }

  render() {
    return (
      <div className="segment" id="mo">
        <h1>Mo</h1>
        <p id="data">{this.state.data}</p>
        <button id="button" onClick={() => {
          this.createZombie()
        }}></button>
      </div>
    );
  }

}

export default Mo
