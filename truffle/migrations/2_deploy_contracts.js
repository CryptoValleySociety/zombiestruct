const ZombieAttack = artifacts.require("zombieattack");
const Ownable = artifacts.require("Ownable");
const SafeMath = artifacts.require("SafeMath");
const { updateContracts } = require('../app/addresses/contracts');

const updateContractAddress = (contract) => {
  updateContracts(contract)
}

module.exports = function(deployer) {
  deployer.deploy(SafeMath)
  .then(() => {
    deployer.link(SafeMath, [ZombieAttack, Ownable]);
    return deployer.deploy(Ownable);
  })
  .then(() => {
    deployer.link(Ownable, ZombieAttack);
    return deployer.deploy(ZombieAttack);
  })
  .then(() => {
    updateContractAddress(ZombieAttack.address)
  })
  .catch((e) => {
    console.log('ERROR IN DEPLOYMENT....', e)
  })
};
