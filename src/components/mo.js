import React, {Component} from 'react'
import web3 from '../utils/web3/providers/index'
import ZombieAttack from '../../truffle/build/contracts/ZombieAttack.json'
import contractMethods from '../utils/calls/component'

import '../App.css'

class Mo extends Component {
  constructor(props) {
    super(props)

<<<<<<< HEAD
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

=======
>>>>>>> ADD update front end once zombie is made, connect to kitty
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
    const receipt = await contractMethods.createRandomZombie(contract, "Mohammad", account, 3000000)
    console.log(receipt);
    this.connectToKitty()
  }

  async connectToKitty() {
    const { contract, account } = this.state
    console.log('CONTRACT: ', contract);
    console.log('ACCOUNT: ', account);
    await contractMethods.connectToKitty(contract, account, 3000000)
    const kittyId = await this.feedOnKitty()
    console.log(kittyId);
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
          this.createZombie()
        }}></button>
      </div>
    );
  }

}

export default Mo
