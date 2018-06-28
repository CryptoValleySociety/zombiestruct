const Web3 = require('web3');
import web3 from '../web3/providers/index'
import contractMethods from "../calls/method_abi.js";
import sendTx from "./web3_send.js";
import read from "./web3_call.js";
import accounts from "../web3/addresses/accounts.json"
import {contracts} from "../web3/addresses/contracts.js"
import contractAbi from "../../../truffle/build/contracts/ZombieAttack.json"
import mainNet from '../web3/providers/main';
import KittyContractAbi from '../../../truffle/added_contracts/KittyContract.json';

const isTest = false;

let rinkebyProvider = null;
let rinkebyContract = null;
let nodeSender = null;

if (isTest) {
    rinkebyProvider = new Web3.providers.HttpProvider(
        'http://127.0.0.1:7545'
    );
    rinkebyContract = contracts.test;
    nodeSender = accounts.acc1.address;
} else {
    rinkebyProvider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/DCU9J2Po6i6WwVourC8M'
    );
    rinkebyContract = contracts.rinkeby;
    nodeSender = accounts.acc1.address;
}

async function sendTxToRinkeby(from, privateKey, method, valueInFinney) {
    return await sendTx(
        from,
        rinkebyContract,
        method,
        valueInFinney,
        privateKey,
        rinkebyProvider
    );
}

async function callFromRinkeby(from, method, valueInFinney, decodeInto) {
    return await read(
        from,
        rinkebyContract,
        method,
        valueInFinney,
        decodeInto,
        rinkebyProvider
    );
}

function getPrivateKey(from) {
    const name = accounts.addressToName[from];
    return accounts[name].private_key;
}

function initialize(){
    const accs = [accounts.acc1.address, accounts.acc2.address, accounts.acc3.address, accounts.acc4.address];
    var obj = {
        contract: new web3.default.eth.Contract(contractAbi.abi, rinkebyContract),
        accounts: accs
    }
    return obj;
}

async function getZombiesByOwner(from) {
    const method = contractMethods.getZombiesByOwner(from)
    const sender = nodeSender;
    const result = await callFromRinkeby(sender, method, null, ['uint[]']);
    const resultArray = result[0]
    return resultArray;
}

async function getZombieById(id) {
    const method = contractMethods.getZombieById(id)
    const sender = nodeSender;
    const zombieType = contractAbi.abi.find(item => item.name==='zombies').outputs;

    return await callFromRinkeby(sender, method, null, zombieType);
}

async function getNumberOfZombies() {
    const method = contractMethods.getNumberOfZombies()
    const sender = nodeSender;

    return (await callFromRinkeby(sender, method, null, ['uint']))[0];
}

async function createRandomZombie(from,name){
    const privateKey = getPrivateKey(from);
    const method = contractMethods.createRandomZombie(name);
    return await sendTxToRinkeby(from, privateKey, method,null);
}

async function attack(from, fromId, toId){
    const privateKey = getPrivateKey(from);
    const method = contractMethods.attack(fromId, toId);
    return await sendTxToRinkeby(from, privateKey,method,null);
}

async function levelUp(from, id){
    const privateKey = getPrivateKey(from);
    const method = contractMethods.levelUp(id);
    return await sendTxToRinkeby(from,privateKey,method,1);
}

async function feedOnKitty(from, zombieId, kittyId){
    const kittyContract = new mainNet.eth.Contract(KittyContractAbi, '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d')
    const kitty = await kittyContract.methods.getKitty(kittyId).call()
    const kittyDna = kitty.genes
    const privateKey = getPrivateKey(from);
    const method = contractMethods.feedOnKitty(zombieId,kittyDna);
    return await sendTxToRinkeby(from,privateKey,method,null);
}

module.exports = {
    initialize: initialize,
    getZombiesByOwner: getZombiesByOwner,
    getZombieById: getZombieById,
    getPrivateKey: getPrivateKey,
    createRandomZombie: createRandomZombie,
    attack: attack,
    levelUp: levelUp,
    feedOnKitty: feedOnKitty,
    getNumberOfZombies: getNumberOfZombies
};
