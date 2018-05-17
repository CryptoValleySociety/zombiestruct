pragma solidity ^0.4.17;

import "../contracts/zombieFactory.sol";

contract TestrandomDna {
  

// Testing the generateRandomDna() function

function testgenerateRandomDna() internal {
  
  uint returnedrandom = rand % dnaModulus;

  uint expected = //16 digits long;

  Assert.equal(returnedrandom, expected, "Number should be 16 digits long");
}

}
