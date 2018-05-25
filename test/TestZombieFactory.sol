pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/zombieFactory.sol";

contract TestZombiefactory {
	function testDummySolidity() public {
		uint A = 1;
		uint B = 1;
		Assert.equal(A, B, "Dummy test failed.");
	}
}