
var contracts = {
    upperApp: '',
}

var updateContractAddresses = (address) => {
    contracts.upperApp = address;
}

module.exports = {
    contracts: contracts,
    updateContracts: updateContractAddresses
}
