import contractMethods from "../../../../src/utils/calls/component";
const chai = require('chai');
const assert = chai.assert;

describe('Contract Method Library For Components', () => {
    const gas = 300000

    let contract = '';
    let accounts = [];

    before(async () => {
        const obj = await contractMethods.initialize();
        contract = obj.contract
        accounts = obj.accounts
    })

    it('should initialize contract and return obj with accounts', async () => {
        assert.equal(typeof (contract._address), 'string', 'address is expected to be string');
        assert.equal(accounts.length, 10, 'accounts arr is supposed to contain 10 accounts')
    });

    it('should create random zombie and return a transaction reciept', async () => {
        try {
            const res = await contractMethods.createRandomZombie(contract, 'Banter', accounts[0], gas)
            assert.equal(res.events.NewZombie.event, 'NewZombie')
            const resp = await contractMethods.createRandomZombie(contract, 'NotBanter', accounts[1], gas)
            assert.equal(resp.events.NewZombie.event, 'NewZombie')
        } catch (err) {
            assert.strictEqual(err.name, 'Error', 'Create double zombie Error not being thrown');
        }
    });

    it('should get zombies array of 2', async () => {
        const res = await contractMethods.getZombieById(contract, 0);
        assert.equal(res.name, 'Banter');
        const resp = await contractMethods.getZombieById(contract, 1);
        assert.equal(resp.name, 'NotBanter');
    });

    it('should get zombie array of owner if zombies exist', async () => {
        const arr = await contractMethods.getZombiesByOwner(contract, accounts[0])
        assert.isAtLeast(arr.length, 1, 'zombie array of owner supposed to have atleast 1 zombie')
    });

    it('should return [] if owner has no zombies', async () => {
        const arr = await contractMethods.getZombiesByOwner(contract, accounts[2])
        assert.equal(arr.length, 0, 'zombie array is supposed to be empty')
    });

    it('should retrieve zombie by Id with the name of Banter', async () => {
        const res = await contractMethods.getZombieById(contract, 0);
        assert.equal(res.name, 'Banter');
    });

    it('should attack and return the attack response', async () => {
        const arr1 = await contractMethods.getZombiesByOwner(contract, accounts[0])
        const zomb1 = arr1[0]
        const arr2 = await contractMethods.getZombiesByOwner(contract, accounts[1])
        const zomb2 = arr2[0]
        const res = await contractMethods.attack(contract, accounts[0], gas, zomb1, zomb2)
        assert.equal(res, 1, 'attack result should return one')
    });

    it('should level up zombie', async () => {
        const start = await contractMethods.getZombieById(contract, 0);
        const startNum = parseInt(start.level)
        await contractMethods.levelUp(contract, 0, accounts[0], () => { });
        const res = await contractMethods.getZombieById(contract, 0);
        assert.equal(parseInt(res.level), startNum + 1);
    });

    it('should create a new zombie after feeding on a kitty', async () => {
        await contractMethods.feedOnKitty(contract, accounts[0], gas)
        const zombies = await contractMethods.getZombiesByOwner(contract, accounts[0])
        const zombId = zombies[zombies.length - 1]
        const zombie = await contractMethods.getZombieById(zombId)
        assert.equal(zombie['1'], "The Kitty for Mo", 'The new zombie created should have the name: `The Kitty for Mo`')
    })
});
