import web3 from '../web3/providers/index'
import {contracts} from '../web3/addresses/contracts';
import ZombieAttackAbi from '../../../truffle/build/contracts/ZombieAttack.json';

const initialize = async() => {
  const accounts = await web3.default.eth.getAccounts()
  var obj = {
    contract: new web3.default.eth.Contract(ZombieAttackAbi.abi, '0x20297c5fd9de8d5ed8069119d96d2a924dd4389e'),
    accounts: accounts
  }
  return obj;
}

const getZombiesByOwner = async (contract, from) => {
    return await contract.methods.getZombiesByOwner(from).call()
}

const createRandomZombie =  async (contract, name, from, gas) => {
    return await contract.methods.createRandomZombie(name)
    .send({ from: from, gas: gas })
    .on("receipt", async (receipt) => {
        return receipt
    })
}

const attack = async (contract, from, gas, _zombieId, _toId) => {
    return await contract.methods.attack(_zombieId, _toId)
    .call({ from: from, gas: gas }, (err, res) => {
        return res 
    })

const viewTransactionReciept = async(functionCall) => {
  return await web3.default.eth.getTransactionReceipt(functionCall)
}

const getZombiesByOwner = async(contract, from) => {
  return await contract.methods.getZombiesByOwner(from).call()
}

const createRandomZombie = async(contract, name, from, gas) => {
  await contract.methods.createRandomZombie(name).send({from: from, gas: gas}).on("receipt", async(receipt) => {
    return receipt
  })
}

const attack = async(contract, from, gas, _zombieId, _toId) => {
  return await contract.methods.attack(_zombieId, _toId).call({
    from: from,
    gas: gas
  }, (err, res) => {
    return res
  })
}

const connectToKitty = async(contract, from, gas) => {
  const kittyContract = '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d'
  await contract.methods.setKittyContractAddress(kittyContract).send({from: from, gas: gas}).on("receipt", async(receipt) => {
    return receipt
  })
}

const feedOnKitty = async(contract, from, gas) => {
  await contract.methods.feedOnKitty(0, 0).send({from: from, gas: gas})
}

const setNewZombieListener = (contract, listener) => {
    contract.events.NewZombie().on('data', listener);
}

const getZombieById = async (contract, id) => {
    return await contract.methods.zombies(id).call();
}

const levelUp = async (contract, id, from, onReceipt) => {
    return await contract.methods.levelUp(id)
    .send({ from: from, value: web3.default.utils.toWei("0.001", "ether") })
    .on('receipt', async (receipt) => {
        return receipt
    });
}

module.exports = {

  initialize: initialize,
  getZombiesByOwner: getZombiesByOwner,
  createRandomZombie: createRandomZombie,
  attack: attack,
  viewTransactionReciept: viewTransactionReciept,
  connectToKitty: connectToKitty,
  feedOnKitty: feedOnKitty
}
