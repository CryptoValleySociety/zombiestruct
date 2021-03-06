pragma solidity ^0.4.19;

import "./zombieHelper.sol";

contract ZombieAttack is ZombieHelper {
  uint randNonce = 0;
  uint attackVictoryProbability = 70;

  event Attack(string name);

  function randMod(uint _modulus) public returns(uint) {
    randNonce++;
    return uint(keccak256(now, msg.sender, randNonce)) % _modulus;
  }

  function getWinCount(uint _zombieId) external view returns(uint) {
    Zombie storage myZombie = zombies[_zombieId];
    return myZombie.winCount;
  }

  function getLossCount(uint _zombieId) external view returns(uint) {
    Zombie storage myZombie = zombies[_zombieId];
    return myZombie.lossCount;
  }

  function attack(uint _zombieId, uint _targetId) external onlyOwnerOf(_zombieId) returns(uint) {
    Zombie storage myZombie = zombies[_zombieId];
    Zombie storage enemyZombie = zombies[_targetId];
    uint rand = randMod(100);
    if (rand <= attackVictoryProbability) {
      Attack('win');
      myZombie.winCount++;
      myZombie.level++;
      enemyZombie.lossCount++;
      feedAndMultiply(_zombieId, enemyZombie.dna, "zombie");
      return myZombie.winCount;
    } else {
      Attack('loss');
      myZombie.lossCount++;
      enemyZombie.winCount++;
      _triggerCooldown(myZombie);
      return myZombie.lossCount;
    }
  }
}
