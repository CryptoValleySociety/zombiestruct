const  ZombieAttack=artifacts.require("ZombieAttack");
const SafeMath=artifacts.require("SafeMath");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, [ZombieAttack]);
  deployer.deploy(ZombieAttack);
};
