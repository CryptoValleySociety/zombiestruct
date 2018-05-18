const Ownable = artifacts.require('./ownable.sol')
const ZombieFeeding = artifacts.require('./zombieFeeding.sol')
const ZombieHelper = artifacts.require('./zombieHelper.sol')

contract('ZombieFeeding', (accounts) => {
  const accountOne = accounts[0]
  const kittyContractAddress = '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d'
  let contract
  let helperContract
  let newZombie


  // beforeEach runs before every test
  beforeEach(async ()  => {
        // returns instance of deployed contract
        contract = await ZombieFeeding.deployed()
        helperContract = await ZombieHelper.deployed()
    });

    const zombieByOwner = async (owner) => {
      const ownerZombie = await helperContract.getZombiesByOwner.call(owner)
      return ownerZombie
    }

    // first need to create a Zombie
    const createZombie = async () => {
      newZombie = await contract.createRandomZombie('Mohammad', { from: accountOne })
      // HOW AM I GETTING A CONTRACT HERE I AM SO CONFUSED
      console.log(newZombie);
    }


    it("setKittyContractAddress test", async () => {
        await createZombie()
        // if I get a DNA then the contract is set
        // await contract.setKittyContractAddress(kittyContractAddress, { from: accountOne })
        // const kittyDna = contract.getKitty(757681)
        //assert.notEqual(kittyDna, null)
    })

    it("feedOnKitty test", async () => {
      // contract.feedOnKitty(newZombie, 757681)
      // expect(err).to.not.exist
      // contract.feedOnKitty(newZombie, 757681)
      // expect(err).to.exist
    })

})
