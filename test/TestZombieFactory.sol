pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/zombieFactory.sol";

// Inherit since we want to test internal functions
contract TestZombiefactory is ZombieFactory {
	
	function testZombieCreation() public {
		string memory name = "Test";
		uint dna = 0;
		// ZombieFactory zombFac = new ZombieFactory();
		_createZombie(name, dna);
		Zombie storage zombie = zombies[zombies.length - 1];
		Assert.equal(zombie.name, name, "New zombie does not have the proper name.");
		Assert.equal(zombie.dna, dna, "New zombie does not have the proper dna.");
	}

	function testDNA() public {
		string memory str1 = "DNA1";
		string memory str2 = "DNA2";
		
		uint equalDna1 = _generateRandomDna(str1);
		uint equalDna2 = _generateRandomDna(str1);

		uint dna3 = _generateRandomDna(str2);

		Assert.equal(equalDna1, equalDna2, "_generateRandomDna does not generate the same DNA for the same input.");
		Assert.notEqual(equalDna1, dna3, "_generateRandomDna should (in theory) not generate the same DNA for different inputs.");
	}

	// Solidity does not allow arrays of structs as parameters, so we have to resort
	// to taking some value of the individual entires.
	// Instead of multiple individual hashes we combine them with xor (to avoid hashing the hashes in the end).
	// The reasoning being: Hashes output uniformly distributed randomness, xor of a random value with something else
	// is still a random value. So the probability of having the same aggregated value for different arrays is small.
	function zombieArrayHash(uint length) internal view returns (uint) {
		uint concatValue = 0;
		for (uint i = 0; i < length; i++) {
			concatValue ^= uint(keccak256(zombies[i].name, zombies[i].dna, zombies[i].level, zombies[i].readyTime,
				zombies[i].winCount, zombies[i].lossCount));
		}
		return concatValue;
	}

	// Check that the _createZombie function does not change the array content
	function testZombieArray() public {
		string memory name = "Name";
		uint dna = 0;
		
		uint preHash = zombieArrayHash(zombies.length);
		_createZombie(name, dna);
		uint postHash = zombieArrayHash(zombies.length - 1);
		Assert.equal(preHash, postHash, "createZombie changed the content of the array.");
	}
}