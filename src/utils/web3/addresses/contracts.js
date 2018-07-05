<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 359f7331d756deff719e03382ef1d93292588d81
var fs = require('fs')


var contracts = {
    upperApp: '0xc0512d02dce6cb6cedccf9841e885bdc19a887a8',
<<<<<<< HEAD
=======
var contracts = {
    upperApp: '0x4584cc71df7842fc696f723bb1c648e94ee5f039',
>>>>>>> Component call changes
=======
var fs = require('fs')


var contracts = {
    upperApp: '0xc0512d02dce6cb6cedccf9841e885bdc19a887a8',
>>>>>>> ADD automated contract updating, working on connecting to main net
=======
>>>>>>> 359f7331d756deff719e03382ef1d93292588d81
}

var updateContractAddresses = (address) => {
    contracts.upperApp = address;
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ADD automated contract updating, working on connecting to main net
=======
>>>>>>> 359f7331d756deff719e03382ef1d93292588d81
var storeContract = (address) => {
  const contractObj = {contract: address}
  fs.writeFile("contract.json", JSON.stringify(contractObj), function(err) {
      if(err) {
          return console.log(err);
      }

  });
}

var getContractAddress = () => {
  const { contract } = require('../../../../truffle/contract.json')
  return contract
}

<<<<<<< HEAD
<<<<<<< HEAD
module.exports = {
    contracts: contracts,
    updateContracts: updateContractAddresses,
    storeContract: storeContract,
    getContractAddress: getContractAddress
}
=======
module.exports = {
    contracts: contracts,
    updateContracts: updateContractAddresses
}
>>>>>>> Component call changes
=======
=======
>>>>>>> 359f7331d756deff719e03382ef1d93292588d81
module.exports = {
    contracts: contracts,
    updateContracts: updateContractAddresses,
    storeContract: storeContract,
    getContractAddress: getContractAddress
}
<<<<<<< HEAD
>>>>>>> ADD automated contract updating, working on connecting to main net
=======
>>>>>>> 359f7331d756deff719e03382ef1d93292588d81
