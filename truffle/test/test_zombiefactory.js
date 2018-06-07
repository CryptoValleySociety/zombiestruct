const ZombieFactory = artifacts.require("ZombieAttack");

contract("ZombieFactory", (accounts) => {

	const account_one = accounts[0];
	const account_two = accounts[1];
	const name = "Name"
	let contract;

	beforeEach(async () => {
        contract = await ZombieFactory.deployed();
	});

	it("creates a new zombie with the given name in createRandomZombie", async () => {
		await contract.createRandomZombie(name, { from: account_one })
		const index = await contract.getZombieByName.call(name)
		const zombie = (await contract.zombies.call(index))

		// The call does not return the struct but rather an array of members.
		// Since "name" is the first member of the struct it is the first entry of the array.
		assert.equal(name, zombie[0], "createRandomZombie did not create a zombie with the specified name.")

	});

	// TODO: this is the race condition, need to send object of indexes from function above

	// it("creates zombies with equal DNA for equivalent names", async () => {
	// 	await contract.createRandomZombie(name, {from: account_two})
	// 	const index = await contract.getZombieByName.call(name)
	// 	const oldZombie = (await contract.zombies.call(index))
	// 	const newZombie = (await contract.zombies.call(3))

	// 	assert.equal(oldZombie[1].toNumber(), newZombie[1].toNumber(), "createRandomZombie did not create two zombies with equal DNA for the same name")
	// })
});
