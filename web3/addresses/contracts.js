
var contracts = {
    upperApp: '0xb63073d23a17333b9f296c1116d6257ef37c997d',
}

var updateContractAddresses = (address) => {
    contracts.upperApp = address;
}

module.exports = {
    contracts: contracts,
    updateContracts: updateContractAddresses
}