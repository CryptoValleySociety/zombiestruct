var fs = require('fs')


var contracts = {
    upperApp: '0xc0512d02dce6cb6cedccf9841e885bdc19a887a8',
}

var updateContractAddresses = (address) => {
    contracts.upperApp = address;
}

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

module.exports = {
    contracts: contracts,
    updateContracts: updateContractAddresses,
    storeContract: storeContract,
    getContractAddress: getContractAddress
}
