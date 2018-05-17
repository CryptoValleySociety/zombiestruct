const ZombieFactory = artifacts.require('./zombieFactory.sol')
const ZombieHelper = artifacts.require('./zombieHelper.sol')

module.exports = function(deployer) {
  deployer.deploy(ZombieFactory)
  deployer.deploy(ZombieHelper)
};
