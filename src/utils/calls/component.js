import web3 from '../web3/providers/index';
import ZombieAttackAbi from '../../../truffle/build/contracts/ZombieAttack.json';
import KittyContractAbi from '../../../truffle/added_contracts/KittyContract.json';
import mainNet from '../web3/providers/main';
import {getContractAddress} from '../web3/addresses/contracts';

const initialize = async () => {
    const accounts = await web3.default.eth.getAccounts()
    var obj = {
        contract: new web3.default.eth.Contract(ZombieAttackAbi.abi, getContractAddress()),
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
}

const setNewZombieListener = (contract, listener) => {
    contract.events.NewZombie().on('data', listener);
}

const getZombieById = async (contract, id) => {
    return await contract.methods.zombies(id).call();
}

const getNumberOfZombies = async (contract) => {
    return await contract.methods.getNumberOfZombies().call();
}

const levelUp = async (contract, id, from, onReceipt) => {
    return await contract.methods.levelUp(id)
    .send({ from: from, value: web3.default.utils.toWei("0.001", "ether") })
    .on('receipt', async (receipt) => {
        return receipt
    });
}

const feedOnKitty = async(contract, from, gas) => {
  const kittyId = 0
  const kittyContract = new mainNet.eth.Contract(KittyContractAbi, '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d')
  const kitty = await kittyContract.methods.getKitty(kittyId).call()
  const kittyDna = kitty.genes
  // first zombie created in dApp feeds on first kitty created in Crypto Kitties
  await contract.methods.feedOnKitty(0, kittyDna)
  .send({from: from, gas: gas})
  .on("receipt", async(receipt) => {
    return receipt
  })
}

module.exports = {
  initialize: initialize,
  getZombiesByOwner: getZombiesByOwner,
  createRandomZombie: createRandomZombie,
  attack: attack,
  feedOnKitty: feedOnKitty,
  getZombieById: getZombieById,
  levelUp: levelUp,
  getNumberOfZombies: getNumberOfZombies,
  setNewZombieListener: setNewZombieListener
}
