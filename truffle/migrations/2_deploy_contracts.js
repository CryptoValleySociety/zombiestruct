const ZombieAttack = artifacts.require("ZombieAttack");
const SafeMath = artifacts.require("SafeMath");
const { storeContract } = require('../../src/utils/web3/addresses/contracts');

module.exports = function(deployer) {
  deployer.deploy(SafeMath)
  .then(() => {
    deployer.link(SafeMath, [ZombieAttack]);
    return deployer.deploy(ZombieAttack);
  })
  .then(() => {
    storeContract(ZombieAttack.address)
  })
  .catch((e) => {
    console.log('ERROR IN DEPLOYMENT....', e)
  })
};
