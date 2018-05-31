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
<<<<<<< HEAD

// if (typeof web3 !== 'undefined') {
//     // Use Mist/MetaMask's provider
//     console.log('Web3 exist!')
//     console.log(web3)
//     web3 = new Web3(web3.currentProvider);

//     web3.version.getNetwork((err, netId) => {
//         switch (netId) {
//             case "1":
//                 console.log('This is mainnet')
//                 break
//             case "2":
//                 console.log('This is the deprecated Morden test network.')
//                 break
//             case "3":
//                 console.log('This is the ropsten test network.')
//                 break
//             default:
//                 console.log('This is an unknown network.')
//         }
//     })

// } else {
//     console.log('No web3? You should consider trying MetaMask!')
//     // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
//     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// }
=======
>>>>>>> ADD Smart Contract instantiated function
