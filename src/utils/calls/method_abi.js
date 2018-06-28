const Web3 = require('web3');
import contractAbi from "../../../truffle/build/contracts/ZombieAttack.json"

const web3 = new Web3();

var contract = new web3.eth.Contract(contractAbi.abi);

// tx
const createRandomZombie =  (name) => {
    return contract.methods.createRandomZombie(name).encodeABI();
}

// tx
const attack = (_zombieId, _toId) => {
    return contract.methods.attack(_zombieId, _toId).encodeABI();
}

// tx
const levelUp = (id) => {
    return contract.methods.levelUp(id).encodeABI();
}

const feedOnKitty = (id, kittyDna) => {
    return contract.methods.feedOnKitty(id, kittyDna).encodeABI();
}

// view
const getZombiesByOwner = (from) => {
    return contract.methods.getZombiesByOwner(from).encodeABI();
}

// view
const getZombieById = (id) => {
    return contract.methods.zombies(id).encodeABI();
}

const getNumberOfZombies = () => {
    return contract.methods.getNumberOfZombies().encodeABI();
}

// TODO: how to do listener on infura
const setNewZombieListener = (listener) => {
    contract.events.NewZombie().on('data', listener);
}

module.exports = {
    getZombiesByOwner: getZombiesByOwner,
    createRandomZombie: createRandomZombie,
    attack: attack,
    setNewZombieListener: setNewZombieListener,
    getZombieById: getZombieById,
    levelUp: levelUp,
    feedOnKitty: feedOnKitty,
    getNumberOfZombies: getNumberOfZombies
}
