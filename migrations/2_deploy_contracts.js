const ZombieAttack = artifacts.require("./zombieattack.sol");
const ZombieHelper = artifacts.require("ZombieHelper");
const ZombieFeeding = artifacts.require("ZombieFeeding");
const ZombieFactory = artifacts.require("ZombieFactory");
const Ownable = artifacts.require("Ownable");
const SafeMath = artifacts.require("SafeMath");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, [ZombieHelper, ZombieFeeding, ZombieFactory, Ownable]);
  deployer.deploy(Ownable);
  deployer.link(Ownable, ZombieFactory);
  deployer.deploy(ZombieFactory);
  deployer.link(ZombieFactory, ZombieFeeding);
  deployer.deploy(ZombieFeeding);
  deployer.link(ZombieFactory, ZombieHelper);
  deployer.deploy(ZombieHelper);
  deployer.link(ZombieHelper, ZombieAttack);
  deployer.deploy(ZombieAttack);
};
