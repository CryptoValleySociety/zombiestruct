
var contracts = {
    upperApp: '0x45b9a2de88375080baf0c9521bc7e75f93499a4d',
}

var updateContractAddresses = (address) => {
    contracts.upperApp = address;
}

module.exports = {
    contracts: contracts,
    updateContracts: updateContractAddresses
}