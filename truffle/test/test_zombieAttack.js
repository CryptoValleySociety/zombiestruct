const ZombieAttack = artifacts.require("ZombieAttack");

contract('ZombieAttack', (accounts) => {
    const account_one = accounts[2];
    const account_two = accounts[3];
    let contract;
    let zombie_one;
    let zombie_two;

    beforeEach(async ()  => {
        contract = await ZombieAttack.deployed();
    });

    var createRandomZombies = async () => {
        await contract.createRandomZombie("Banter", { from: account_one });
        await contract.createRandomZombie("Joker", { from: account_two });
    
        const zombies1 = await contract.getZombiesByOwner.call(account_one);
        zombie_one = zombies1[zombies1.length - 1].toNumber();
        const zombies2 = await contract.getZombiesByOwner.call(account_two);
        zombie_two = zombies2[zombies1.length - 1].toNumber();
    }

    it("returns the modulo hash of msg.sender and randnonce", async () => {
        const result = await contract.randMod.call(5, { from: account_one });
        assert.equal(typeof(result.toNumber()), 'number', 'return value should be zero');
    });

    it('creates two random zombies and attack with either a win or loss count', async () => {
        createRandomZombies()
        .then(async () => {
            var resultTx = await contract.attack.call(zombie_one, zombie_two, {from: account_one})
            assert.equal(resultTx.toNumber(), 1, 'zombie should have 1 win/loss after attack')
        })
    })
});