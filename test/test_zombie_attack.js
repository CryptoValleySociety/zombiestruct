var ZombieAttack = artifacts.require("./zombieattack.sol");

contract('ZombieAttack', (accounts) => {
    const account_one = accounts[0];
    const account_two = accounts[1];
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
        zombie_one = zombies1[0].toNumber();
        const zombies2 = await contract.getZombiesByOwner.call(account_two);
        zombie_two = zombies2[0].toNumber();

        assert.equal(zombie_one, 0, "Zombie with ID 0 not owned by first account");
        assert.equal(zombie_two, 1, "Zombie with ID 1 not owned by second account");
    }

    it("returns the modulo hash of msg.sender and randnonce", async () => {
        const result = await contract.randMod.call(5, { from: account_one });
        assert.equal(typeof(result.toNumber()), 'number', 'return value should be zero');
    });

    it('creates two random zombies and attack with either a win or loss count', async () => {
        createRandomZombies()
        .then(async () => {
            const winCount = await contract.getWinCount.call(zombie_one)
            const lossCount = await contract.getWinCount.call(zombie_one)
            assert.equal(winCount.toNumber(), 0, 'zombie should have no wins before attack')
            assert.equal(lossCount.toNumber(), 0, 'zombie should have no wins before attack')

            // var resultTx = await contract.attack.call(zombie_one, zombie_two, {from: account_one})
            // TODO: call function without revert error https://github.com/OpenZeppelin/openzeppelin-solidity/issues/584
            // TODO: https://stackoverflow.com/questions/36627733/test-ethereum-event-logs-with-truffle LAST COMMENT
            // TODO: catch event value of win or loss and assert if value has changed
        })
    })
});