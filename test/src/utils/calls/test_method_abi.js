import contractMethods from "../../../../src/utils/calls/method_abi";
import accounts from "../../../../src/utils/web3/addresses/accounts.json"
const chai = require('chai');
const assert = chai.assert;

describe('Correctly encoding methods into their respective abis', () => {
    const account_1 =  accounts.acc1.address

    it('should return encoded abi of createRandomZombie', async () => {
        const methodAbi = contractMethods.createRandomZombie('Banter')
        assert.equal(methodAbi.length, 202)
    });

    it('should return encoded abi of attack', async () => {
        const methodAbi = contractMethods.attack(1, 2)
        assert.equal(methodAbi.length, 138)
    });

    it('should return encoded abi of levelUp', async () => {
        const methodAbi = contractMethods.levelUp(1)
        assert.equal(methodAbi.length, 74)
    });

    it('should return encoded abi of getZombiesByOwner', async () => {
        const methodAbi = contractMethods.getZombiesByOwner(account_1)
        assert.equal(methodAbi.length, 74)
    });

    it('should return encoded abi of getZombieById', async () => {
        const methodAbi = contractMethods.getZombieById(1)
        assert.equal(methodAbi.length, 74)
    });
});