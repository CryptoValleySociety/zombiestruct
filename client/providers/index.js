const testrpc = require('./testrpc');
const rinkeby = require('./rinkeby');

const test = true;
let web3;

if(test) {
    web3 = testrpc
} else {
    web3 = rinkeby
}

export default web3