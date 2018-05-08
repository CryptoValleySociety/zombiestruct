var ZombieHelper = artifacts.require("ZombieHelper");

contract('ZombieHelper', function(accounts) {
  var account_one = accounts[0];
  var account_two = accounts[1];
  var id1=-1;
  var id2=-1;
  var zombieCon;

  //get the level of a zombie with specific id
  //returns -1 if it fails
  function getZombieLevel(id){
    return ZombieHelper.deployed().then(function(instance){
      zombieCon = instance;
      return zombieCon.zombies.call(id).then(function(result){return result[2].toNumber();}).catch(function(){return -1});
    });
  }

  //get the name of a zombie with specific id
  //returns "" if it fails
  function getZombieName(id){
    return ZombieHelper.deployed().then(function(instance){
      zombieCon = instance;
      return zombieCon.zombies.call(id).then(function(result){return result[0];}).catch(function(){return ""});
    });
  }

  //get the dna of a zombie with specific id
  //returns -1 if it fails
  function getZombieDna(id){
    return ZombieHelper.deployed().then(function(instance){
      zombieCon = instance;
      return zombieCon.zombies.call(id).then(function(result){return result[1].toNumber();}).catch(function(){return -1});
    });
  }

  it("Should add and check existance of two zombies", async function() {
    await ZombieHelper.deployed().then(function(instance) {
      zombieCon = instance;
      //Create a random zombie for account_one
      return zombieCon.createRandomZombie("Simon",{from: account_one});
    }).then(function(){
      //Create a random zombie for account_two
      return zombieCon.createRandomZombie("My friend",{from: account_two});
    }).then(function(){
      //get ID of zombie owned by account_one
      return zombieCon.getZombiesByOwner.call(account_one);
    }).then(function(zombies1){
      id1=zombies1[0].toNumber();
      //get ID of zombie owned by account_two
      return zombieCon.getZombiesByOwner.call(account_two);
    }).then(function(zombies2){
      id2=zombies2[0].toNumber();
      //check if IDs match
      assert.equal(id1,0,"Zombie with ID 0 not owned by first account");
      assert.equal(id2,1,"Zombie with ID 1 not owned by second account");
    });
  });

  it("Should successfully level up two zombies, change the fee and fail if fee is not enough", async function() {
    var i;

    //level up zombie 0 to lvl 20
    for(i=0;i<19;i++){
      await zombieCon.levelUp(0,{from:account_one,value:web3.toWei(0.001,"ether")});
    }

    //level up zombie 1 to lvl 2 after raising the fee
    await zombieCon.setLevelUpFee(web3.toWei(0.01,"ether"),{from:account_one});
    await zombieCon.levelUp(1,{from:account_two,value:web3.toWei(0.01,"ether")});

    //try leveling up zombie 1 with not enough fee; levelUp should be "false"
    var levelUp;
    await zombieCon.levelUp(1,{from:account_two,value:web3.toWei(0.001,"ether")}).then(function(){levelUp=true;}).catch(function(){levelUp=false;});
    assert.equal(levelUp,false,"Somehow leveled up with not enough fee");

    //check if zombie levels are correct
    getZombieLevel(0).then(function(lvl){
      assert.equal(lvl,20,"1st Zombie not leveled up to lvl 20");
    });
    getZombieLevel(1).then(function(lvl){
      assert.equal(lvl,2,"2nd Zombie not leveled up to lvl 2");
    });
  });

  it("Should change name and dna of zombie and fail if level is too low",async function(){

    //change DNA of first zombie
    await zombieCon.changeDna(0,123456789,{from:account_one});

    //change name of 2nd zombie
    await zombieCon.changeName(1,"New Name",{from:account_two});

    //try changing dna of 2nd zombie, should fail
    var dnaChanged;
    await zombieCon.changeDna(1,123456789,{from:account_two}).then(function(){dnaChanged=true;}).catch(function(){dnaChanged=false;});
    assert.equal(dnaChanged,false,"Changed DNA of zombie even though lvl was too low");

    //check if zombie dna and name are correct
    getZombieDna(0).then(function(dna){
      assert.equal(dna,123456789,"1st Zombie didnt change DNA");
    });
    getZombieName(1).then(function(name){
      assert.equal(name,"New Name","2nd Zombie didnt change name");
    });
  });

  it("Should withdraw all the ether placed into the contract",function(){

    //Variable definitions
    var weiInContract = web3.eth.getBalance(ZombieHelper.address);
    var initBal=web3.eth.getBalance(account_one);
    var finalBal;

    //withdraw ether from contract
    zombieCon.withdraw({from:account_one}).then(function(result){

      //check if the amount matches
      var gas=result.receipt.gasUsed*(10**11);
      finalBal=new web3.BigNumber(web3.eth.getBalance(account_one));
      var expected=weiInContract.minus(gas);
      var whatIgot=finalBal.minus(initBal);
      var difference=expected.minus(whatIgot).toNumber();
      assert.equal(difference,0,"Didnt get the right amount of ether from the contract");
    });
  });
});
