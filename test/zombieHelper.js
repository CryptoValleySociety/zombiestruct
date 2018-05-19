let ZombieHelper = artifacts.require("ZombieAttack");

<<<<<<< HEAD
contract("ZombieAttack",(accounts)=> {
=======
contract("ZombieAttack", function(accounts) {
>>>>>>> e567ec9ff3aa8460c02c03e8c52f7f0756c95dc0
  let account_one = accounts[0];
  let account_two = accounts[1];
  let id1=-1;
  let id2=-1;
  let zombieCon;


  beforeEach(async ()  => {
    zombieCon = await ZombieHelper.deployed();
  });
  //get the level of a zombie with specific id
  //returns -1 if it fails
  let getZombieLevel = (id) => {
<<<<<<< HEAD
    return ZombieHelper.deployed().then((instance)=>{
=======
    return ZombieHelper.deployed().then(function(instance){
>>>>>>> e567ec9ff3aa8460c02c03e8c52f7f0756c95dc0
      zombieCon = instance;
      return zombieCon.zombies.call(id).then((result)=>{return result[2].toNumber();}).catch(()=>{return -1});
    });
  }

  //get the name of a zombie with specific id
  //returns "" if it fails
  let getZombieName = (id) =>{
<<<<<<< HEAD
    return ZombieHelper.deployed().then((instance)=>{
=======
    return ZombieHelper.deployed().then(function(instance){
>>>>>>> e567ec9ff3aa8460c02c03e8c52f7f0756c95dc0
      zombieCon = instance;
      return zombieCon.zombies.call(id).then((result)=>{return result[0];}).catch(()=>{return ""});
    });
  }

  //get the dna of a zombie with specific id
  //returns -1 if it fails
  let getZombieDna = (id) =>{
<<<<<<< HEAD
    return ZombieHelper.deployed().then((instance)=>{
=======
    return ZombieHelper.deployed().then(function(instance){
>>>>>>> e567ec9ff3aa8460c02c03e8c52f7f0756c95dc0
      zombieCon = instance;
      return zombieCon.zombies.call(id).then((result)=>{return result[1].toNumber();}).catch(()=>{return -1});
    });
  }

<<<<<<< HEAD
  it("Should add and check existance of two zombies", async () =>{
    await zombieCon.createRandomZombie("Simon",{from: account_one}).then(()=>{
      return zombieCon.createRandomZombie("My friend",{from: account_two});
    }).then(()=>{
=======
  it("Should add and check existance of two zombies", async function() {
    await zombieCon.createRandomZombie("Simon",{from: account_one}).then(function(){
      return zombieCon.createRandomZombie("My friend",{from: account_two});
    }).then(function(){
>>>>>>> e567ec9ff3aa8460c02c03e8c52f7f0756c95dc0
      return zombieCon.getZombiesByOwner.call(account_one);
    }).then((zombies1)=>{
      id1=zombies1[0].toNumber();
      return zombieCon.getZombiesByOwner.call(account_two);
    }).then((zombies2)=>{
      id2=zombies2[0].toNumber();
      assert.equal(id1,0,"Zombie with ID 0 not owned by first account");
      assert.equal(id2,1,"Zombie with ID 1 not owned by second account");
    });
  });

<<<<<<< HEAD
  it("Should successfully level up two zombies, change the fee and fail if fee is not enough", async () =>{
=======
  it("Should successfully level up two zombies, change the fee and fail if fee is not enough", async function() {
>>>>>>> e567ec9ff3aa8460c02c03e8c52f7f0756c95dc0
    let i;

    for(i=0;i<19;i++){
      await zombieCon.levelUp(0,{from:account_one,value:web3.toWei(0.001,"ether")});
    }

    await zombieCon.setLevelUpFee(web3.toWei(0.01,"ether"),{from:account_one});
    await zombieCon.levelUp(1,{from:account_two,value:web3.toWei(0.01,"ether")});

    let levelUp;
<<<<<<< HEAD
    await zombieCon.levelUp(1,{from:account_two,value:web3.toWei(0.001,"ether")}).then(()=>{levelUp=true;}).catch(()=>{levelUp=false;});
=======
    await zombieCon.levelUp(1,{from:account_two,value:web3.toWei(0.001,"ether")}).then(function(){levelUp=true;}).catch(function(){levelUp=false;});
>>>>>>> e567ec9ff3aa8460c02c03e8c52f7f0756c95dc0
    assert.equal(levelUp,false,"Somehow leveled up with not enough fee");

    getZombieLevel(0).then(function(lvl){
      assert.equal(lvl,20,"1st Zombie not leveled up to lvl 20");
    });
    getZombieLevel(1).then(function(lvl){
      assert.equal(lvl,2,"2nd Zombie not leveled up to lvl 2");
    });
  });

  it("Should change name and dna of zombie and fail if level is too low",async function(){
    await zombieCon.changeDna(0,123456789,{from:account_one});
    await zombieCon.changeName(1,"New Name",{from:account_two});

    let dnaChanged;
    await zombieCon.changeDna(1,123456789,{from:account_two}).then(function(){dnaChanged=true;}).catch(function(){dnaChanged=false;});
    assert.equal(dnaChanged,false,"Changed DNA of zombie even though lvl was too low");

    getZombieDna(0).then(function(dna){
      assert.equal(dna,123456789,"1st Zombie didnt change DNA");
    });
    getZombieName(1).then(function(name){
      assert.equal(name,"New Name","2nd Zombie didnt change name");
    });
  });

<<<<<<< HEAD
  it("Should withdraw all the ether placed into the contract",()=>{
=======
  it("Should withdraw all the ether placed into the contract",function(){
>>>>>>> e567ec9ff3aa8460c02c03e8c52f7f0756c95dc0
    let weiInContract = web3.eth.getBalance(ZombieHelper.address);
    let initBal=web3.eth.getBalance(account_one);
    let finalBal;

<<<<<<< HEAD
    zombieCon.withdraw({from:account_one}).then((result)=>{
=======
    zombieCon.withdraw({from:account_one}).then(function(result){
>>>>>>> e567ec9ff3aa8460c02c03e8c52f7f0756c95dc0
      let gas=result.receipt.gasUsed*(10**11);
      finalBal=new web3.BigNumber(web3.eth.getBalance(account_one));
      let expected=weiInContract.minus(gas);
      let whatIgot=finalBal.minus(initBal);
      let difference=expected.minus(whatIgot).toNumber();
      assert.equal(difference,0,"Didnt get the right amount of ether from the contract");
    });
  });
});
