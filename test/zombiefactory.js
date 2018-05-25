var ZombieFactory = artifacts.require("ZombieFactory");

contract("ZombieFactory", function(accounts) {

	var account_one = accounts[0];

	it("should have a working empty test", function() {
		return ZombieFactory.deployed().then(function() {
			assert.equal(0, 0, "Dummy test should never fail.");
		});
	});

	it("createZombie extends the zombies array by one", async function() {
		var preLength;
		var zfInstance;
		await ZombieFactory.deployed().
		then(function(instance) {
			zfInstance = instance;
			// Get the number of zombies before the create call
			return zfInstance.getNumberOfZombies.call().catch(function(e) {
				console.log("Error getting number of zombies.");
			});
		}).then(function(length) {
			preLength = length.toNumber();
			// Create a new random zombie
			return zfInstance.createRandomZombie("Test", {from: account_one}).catch(function(e) {
				console.log("Error while creating random zombie");
			});
		}).then(function() {
			// Get the new length
			return zfInstance.getNumberOfZombies.call().catch(function(e) {
				console.log("Error getting number of zombies.");
			});
		}).then(function(postLength) {
			assert.equal(preLength + 1, postLength.toNumber(), "createRandomZombie did not increase the array length by one.");
		});

	});
});
