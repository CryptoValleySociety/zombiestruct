const ZombieFeeding = artifacts.require('./zombieFeeding.sol')
const ZombieHelper = artifacts.require('./zombieHelper.sol')

contract('ZombieFeeding', (accounts) => {
  const accountOne = accounts[0]
  const kittyContractAddress = '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d'
  let contract
  let newZombie


  // beforeEach runs before every test
  beforeEach(async ()  => {
        // returns instance of deployed contract
        contract = await ZombieFeeding.deployed()
    });


  const zombieByOwner = async (owner) => {
      const helperContract = await ZombieHelper.deployed()
      const ownerZombie = await helperContract.getZombiesByOwner.call(owner)
      return ownerZombie
    }

    // first need to create a Zombie
    const createZombie = async () => {
      await contract.createRandomZombie('Mohammad', { from: accountOne })
      newZombie = await zombieByOwner(accountOne)
      // am not getting the zombie i want. Why not?
      console.log(newZombie)
    }

    it("", async () => {
        await createZombie()
        assert.equal(1, 1, 'the number one is equal to 1')
    });

    // it("setKittyContractAddress test", async () => {
    //     await contract.setKittyContractAddress(kittyContractAddress, { from: accountOne })
    //     const kitty = await contract.getKitty.call(1)
    //     console.log(kitty)
    //     assert.equal(1, 1, 'fuck me up ')
    // })

})
