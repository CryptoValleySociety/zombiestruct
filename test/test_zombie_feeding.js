const Ownable = artifacts.require('./ownable.sol')
const ZombieFeeding = artifacts.require('./zombieFeeding.sol')
const ZombieHelper = artifacts.require('./zombieHelper.sol')

contract('ZombieFeeding', (accounts) => {
  const accountOne = accounts[0]
  const kittyContractAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"
  let contract
  let helperContract
  let newZombie


  // beforeEach runs before every test
  beforeEach(async ()  => {
        // returns instance of deployed contract
        contract = await ZombieFeeding.deployed()
    });

    const zombieByOwner = async (owner) => {
      helperContract = await ZombieHelper.deployed()
      const ownerZombie = await helperContract.getZombiesByOwner.call(owner)
      return ownerZombie
    }

    // first need to create a Zombie
    const createZombie = async () => {
      await contract.createRandomZombie('Mohammad', { from: accountOne })
    }


    it("setKittyContractAddress test", async () => {
        await createZombie()
        // if I get a DNA then the contract is set
        await contract.setKittyContractAddress(kittyContractAddress)
        const kittyDna = await contract.getKittyDna(1)
        console.log(kittyDna.toNumber());
        // assert.notEqual(kittyDna, null)
    })

    it("feedOnKitty test", async () => {
      // contract.feedOnKitty(newZombie, 757681)
      // expect(err).to.not.exist
      // contract.feedOnKitty(newZombie, 757681)
      // expect(err).to.exist
    })

})
