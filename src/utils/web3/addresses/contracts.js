var fs = require('fs')

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

var contracts = {
    test: getContractAddress(),
    rinkeby: '0xf0e28da6530821663b6c16502e082586eff307e8'
}

module.exports = {
    contracts: contracts,
    storeContract: storeContract,
    getContractAddress: getContractAddress
}
