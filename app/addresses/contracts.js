
var contracts = {
    attack: '',
    factory: '',
    feeding: '',
    helper: ''
}

var updateContractAddresses = (attack, factory, feeding, helper) => {
    contracts.attack = attack;
    contracts.factory = factory;
    contracts.feeding = feeding;
    contracts.helper = helper;
}

module.exports = {
    contracts: contracts,
    updateContracts: updateContractAddresses
}