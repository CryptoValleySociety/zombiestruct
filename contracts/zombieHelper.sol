pragma solidity ^0.4.19;

import "./zombiefeeding.sol";

contract ZombieHelper is ZombieFeeding {

  uint levelUpFee = 0.001 ether;

  //check if zombie is above certain level
  modifier aboveLevel(uint _level, uint _zombieId) {
    require(zombies[_zombieId].level >= _level);
    _;
  }

  //Withdraws Ether paid to the contract previously and transfers it to the owner
  function withdraw() external onlyOwner {
    owner.transfer(this.balance);
  }

  //Enables the owner to set the fee needed to level up a zombie
  function setLevelUpFee(uint _fee) external onlyOwner {
    levelUpFee = _fee;
  }

  //Call this function to level up your zombie
  function levelUp(uint _zombieId) external payable {
    require(msg.value == levelUpFee);
    zombies[_zombieId].level++;
  }

  //This changes the name of the zombie only if it is above level 2
  function changeName(uint _zombieId, string _newName) external aboveLevel(2, _zombieId) onlyOwnerOf(_zombieId) {
    zombies[_zombieId].name = _newName;
  }

  //This changes the Dna of a zombie if it is above level 20
  function changeDna(uint _zombieId, uint _newDna) external aboveLevel(20, _zombieId) onlyOwnerOf(_zombieId) {
    zombies[_zombieId].dna = _newDna;
  }

  //Gets the indices of the zombies someone owns
  function getZombiesByOwner(address _owner) external view returns(uint[]) {
    uint[] memory result = new uint[](ownerZombieCount[_owner]);
    uint counter = 0;
    for (uint i = 0; i < zombies.length; i++) {
      if (zombieToOwner[i] == _owner) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

}
