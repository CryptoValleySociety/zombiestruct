var ZombieAttack = artifacts.require("./zombieattack.sol");

contract('ZombieAttack', (accounts) => {
    let contract;
    var account_one = accounts[0];
    var account_two = accounts[1];
    let zombie_one;
    let zombie_two;

    beforeEach(async ()  => {
        contract = await ZombieAttack.new();
    });

    var createRandomZombies = async () => {
        await contract.createRandomZombie("Banter", { from: account_one });

        await contract.createRandomZombie("Joker", { from: account_two });

        var zombies1 = await contract.getZombiesByOwner.call(account_one);
        zombie_one = zombies1[0].toNumber();

        var zombies2 = await contract.getZombiesByOwner.call(account_two);
        zombie_two = zombies2[0].toNumber();

        assert.equal(zombie_one, 0, "Zombie with ID 0 not owned by first account");
        assert.equal(zombie_two, 1, "Zombie with ID 1 not owned by second account");
    }

    it("returns the modulo of the hash of msg.sender and randnonce", async () => {
        var result = await contract.randMod.call(5, { from: account_one });
        assert.equal(result.toNumber(), 2, 'return value should be zero');
    });

    it('creates two random zombies and attack with either a win or loss count', async () => {
        createRandomZombies()
        .then(async () => {
            var winCount = await contract.getWinCount.call(zombie_one)
            var lossCount = await contract.getWinCount.call(zombie_one)
            assert.equal(winCount.toNumber(), 0, 'zombie should have no wins before attack')
            assert.equal(lossCount.toNumber(), 0, 'zombie should have no wins before attack')

            // var resultTx = await contract.attack.call(zombie_one, zombie_two, {from: account_one})
            // TODO: call function without revert error
            // TODO: https://stackoverflow.com/questions/36627733/test-ethereum-event-logs-with-truffle LAST COMMENT
            // TODO: catch event value of win or loss and assert if value has changed
        })
    })
});