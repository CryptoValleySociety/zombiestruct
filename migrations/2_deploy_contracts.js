const ZombieAttack = artifacts.require("./zombieattack.sol");
const ZombieHelper = artifacts.require("ZombieHelper");
const ZombieFeeding = artifacts.require("ZombieFeeding");
const ZombieFactory = artifacts.require("ZombieFactory");
const Ownable = artifacts.require("Ownable");
const SafeMath = artifacts.require("SafeMath");
const { updateContracts } = require('../app/addresses/contracts');

const updateContractAddress = (attack, factory, feeding, helper) => {
  updateContracts(attack, factory, feeding, helper)
}

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, [ZombieAttack]);
  deployer.deploy(ZombieAttack);
  updateContractAddress(ZombieAttack.address, ZombieFactory.address, ZombieFeeding.address, ZombieHelper.address)
};
