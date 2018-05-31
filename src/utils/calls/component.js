import web3 from '../web3/providers/index'
import { contracts } from '../web3/addresses/contracts';
import ZombieAttackAbi from '../../../truffle/build/contracts/ZombieAttack.json';

const initialize = async () => {
    const accounts = await web3.default.eth.getAccounts()
    var obj = {
        contract: new web3.default.eth.Contract(ZombieAttackAbi.abi, contracts.upperApp),
        accounts: accounts
    }
    return obj;
}

const viewTransactionReciept = async (functionCall) => {
    return await web3.default.eth.getTransactionReceipt(functionCall)
}

const getZombiesByOwner = async (contract, from) => {
    return await contract.methods.getZombiesByOwner(from).call()
}

const createRandomZombie =  async (contract, name, from, gas) => {
    await contract.methods.createRandomZombie(name).send({ from: from, gas: gas })
    .on("receipt", async (receipt) => {
        console.log('reciept', receipt)
        return receipt
    })
}

const attack = async (contract, from, gas, _zombieId, _toId) => {
    return await contract.methods.attack(_zombieId, _toId).call({ from: from, gas: gas }, (err, res) => {
        return res 
    })
}

module.exports = {
    initialize: initialize,
    getZombiesByOwner: getZombiesByOwner,
    createRandomZombie: createRandomZombie,
    attack: attack,
    viewTransactionReciept: viewTransactionReciept
}
