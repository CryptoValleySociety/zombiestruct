const ZombieAttack = artifacts.require("ZombieAttack");
const SafeMath = artifacts.require("SafeMath");
const { updateContracts, storeContract } = require('../../src/utils/web3/addresses/contracts');

const updateContractAddress = (contract) => {
  updateContracts(contract)
}

module.exports = function(deployer) {
  deployer.deploy(SafeMath)
  .then(() => {
    deployer.link(SafeMath, [ZombieAttack]);
    return deployer.deploy(ZombieAttack);
  })
  .then(() => {
    updateContractAddress(ZombieAttack.address)
    storeContract(ZombieAttack.address)
  })
  .catch((e) => {
    console.log('ERROR IN DEPLOYMENT....', e)
  })
};
