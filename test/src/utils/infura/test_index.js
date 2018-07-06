import contractMethods from "../../../../src/utils/infura/index";
import accounts from "../../../../src/utils/web3/addresses/accounts.json"
const chai = require('chai');
const assert = chai.assert;

describe('Calling contractMethods in infura index', () => {
    const account_1 =  accounts.acc1.address
    const private_key = accounts.acc1.private_key
    const account_2 = accounts.acc2.address

    it('should return the private key of account_1', async () => {
        const key = contractMethods.getPrivateKey(account_1)
        assert.equal(key, private_key)
    });

    it('should correctly create a zombie in the first account', async () => {
        try{
            await contractMethods.createRandomZombie(account_1,"Banter");
        }catch(err){
            assert.strictEqual(err.name, 'Error', 'Create double zombie Error not being thrown');
        }
        const result =await contractMethods.getZombieById(0);
        assert.equal(result.name,"Banter");
    });

    it('should correctly level up a zombie', async () => {
        const zombieBefore=await contractMethods.getZombieById(0);
        const levelBefore=zombieBefore.level;
        await contractMethods.levelUp(account_1,0);
        const zombieAfter =await contractMethods.getZombieById(0);
        const levelAfter=zombieAfter.level;
        assert.equal(levelAfter-1,levelBefore);
    });

    it('should correctly attack a second zombie', async () => {
        try{
            await contractMethods.createRandomZombie(account_2,"Enemy");
        }catch(err){
            assert.strictEqual(err.name, 'Error', 'Create double zombie Error not being thrown');
        }
        const zombieBefore = await contractMethods.getZombieById(0);
        const battlesBefore = Number(zombieBefore.winCount) + Number(zombieBefore.lossCount);
        await contractMethods.attack(account_1,0,1);
        const zombieAfter = await contractMethods.getZombieById(0);
        const battlesAfter = Number(zombieAfter.winCount) + Number(zombieAfter.lossCount);
        assert.equal(battlesAfter-1,battlesBefore);
    });

    // it('should correctly feed on kitty', async () => {
    //     const out = await contractMethods.feedOnKitty();
    // });

    it('should correctly retrieve zombie by Id', async () => {
        const zombie = await contractMethods.getZombieById(0);
        var size = Object.keys(zombie).length;
        assert.equal(size, 13, 'Zombie object does not contain 6 data properties')
        assert.equal(zombie.name, 'Banter', 'Banter is not the first zombie')
    });

    it('should return zombies of owner', async () => {
        const zombies = await contractMethods.getZombiesByOwner(account_1);
        assert.isTrue(zombies.length > 0)
    });

    // it('should return total number of zombies', async () => {
    //     const zombies = await contractMethods.getNumberOfZombies();
    //     console.log('adaas', zombies)
    // });

});
