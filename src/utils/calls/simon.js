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

const getZombiesByOwner = async (contract, from) => {
    return await contract.methods.getZombiesByOwner(from).call()
}

const createRandomZombie =  async (contract, name, from, gas) => {
    await contract.methods.createRandomZombie(name).send({ from: from, gas: gas })
    .on("receipt", async (receipt) => {
        return receipt
    })
}

const setNewZombieListener = (contract,listener) =>{
    contract.events.NewZombie().on('data',listener);
}

const getZombieById = async (contract,id) => {
  return await contract.methods.zombies(id).call();
}

const levelUp = async (contract,id,from,onReceipt) =>{
  return await contract.methods.levelUp(id).send({from: from,value:web3.default.utils.toWei("0.001","ether")}).on('receipt',onReceipt);
}

module.exports = {
    initialize: initialize,
    getZombiesByOwner: getZombiesByOwner,
    createRandomZombie: createRandomZombie,
    setNewZombieListener: setNewZombieListener,
    getZombieById: getZombieById,
    levelUp: levelUp
}