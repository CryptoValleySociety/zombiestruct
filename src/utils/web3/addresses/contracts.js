var contracts = {
    upperApp: '0x4584cc71df7842fc696f723bb1c648e94ee5f039',
}

var updateContractAddresses = (address) => {
    contracts.upperApp = address;
}

module.exports = {
    contracts: contracts,
    updateContracts: updateContractAddresses
}