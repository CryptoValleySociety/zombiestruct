var ZombieHelper=artifacts.require("ZombieHelper");
var ZombieFeeding=artifacts.require("ZombieFeeding");
var ZombieFactory=artifacts.require("ZombieFactory");
var Ownable=artifacts.require("Ownable");
var SafeMath=artifacts.require("SafeMath");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, [ZombieHelper,ZombieFeeding,ZombieFactory,Ownable]);
  deployer.deploy(Ownable);
  deployer.deploy(ZombieFactory);
  deployer.deploy(ZombieFeeding);
  deployer.deploy(ZombieHelper);
};
