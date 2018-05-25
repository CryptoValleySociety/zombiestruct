var ZombieFactory = artifacts.require("ZombieFactory");

contract("ZombieFactory", function(accounts) {

	const account_one = accounts[0];
	const account_two = accounts[1];
	const name = "Name"
	let contract;

	beforeEach(async () => {
        contract = await ZombieFactory.deployed();
	});

	it("extends the zombies array by exactly one with createRandomZombie", async () =>  {
		const preLength = (await contract.getNumberOfZombies.call()).toNumber()
		await contract.createRandomZombie(name, {from: account_one})	
		const postLength = (await contract.getNumberOfZombies.call()).toNumber()
		assert.equal(preLength + 1, postLength, "createRandomZombie did not increase the array length by one.");
	});

	it("creates a new zombie with the given name in createRandomZombie", async () => {
		const zombie = (await contract.zombies.call(0))

		// The call does not return the struct but rather an array of members.
		// Since "name" is the first member of the struct it is the first entry of the array.
		assert.equal(name, zombie[0], "createRandomZombie did not create a zombie with the specified name.")

	});

	it("creates zombies with equal DNA for equivalent names", async () => {
		await contract.createRandomZombie(name, {from: account_two})
		const oldZombie = (await contract.zombies.call(0))
		const newZombie = (await contract.zombies.call(1))

		assert.equal(oldZombie[1].toNumber(), newZombie[1].toNumber(), "createRandomZombie did not create two zombies with equal DNA for the same name")
	})
});
