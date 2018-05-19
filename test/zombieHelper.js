let ZombieHelper = artifacts.require("ZombieAttack");

contract("ZombieAttack",(accounts)=> {
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
    return ZombieHelper.deployed().then((instance)=>{
      zombieCon = instance;
      return zombieCon.zombies.call(id).then((result)=>{return result[2].toNumber();}).catch(()=>{return -1});
    });
  }

  //get the name of a zombie with specific id
  //returns "" if it fails
  let getZombieName = (id) =>{
    return ZombieHelper.deployed().then((instance)=>{
      zombieCon = instance;
      return zombieCon.zombies.call(id).then((result)=>{return result[0];}).catch(()=>{return ""});
    });
  }

  //get the dna of a zombie with specific id
  //returns -1 if it fails
  let getZombieDna = (id) =>{
    return ZombieHelper.deployed().then((instance)=>{
      zombieCon = instance;
      return zombieCon.zombies.call(id).then((result)=>{return result[1].toNumber();}).catch(()=>{return -1});
    });
  }

  it("Should add and check existance of two zombies", async () =>{
    await zombieCon.createRandomZombie("Simon",{from: account_one}).then(()=>{
      return zombieCon.createRandomZombie("My friend",{from: account_two});
    }).then(()=>{
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

  it("Should successfully level up two zombies, change the fee and fail if fee is not enough", async () =>{
    let i;

    for(i=0;i<19;i++){
      await zombieCon.levelUp(0,{from:account_one,value:web3.toWei(0.001,"ether")});
    }

    await zombieCon.setLevelUpFee(web3.toWei(0.01,"ether"),{from:account_one});
    await zombieCon.levelUp(1,{from:account_two,value:web3.toWei(0.01,"ether")});

    let levelUp;
    await zombieCon.levelUp(1,{from:account_two,value:web3.toWei(0.001,"ether")}).then(()=>{levelUp=true;}).catch(()=>{levelUp=false;});
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

  it("Should withdraw all the ether placed into the contract",()=>{
    let weiInContract = web3.eth.getBalance(ZombieHelper.address);
    let initBal=web3.eth.getBalance(account_one);
    let finalBal;

    zombieCon.withdraw({from:account_one}).then((result)=>{
      let gas=result.receipt.gasUsed*(10**11);
      finalBal=new web3.BigNumber(web3.eth.getBalance(account_one));
      let expected=weiInContract.minus(gas);
      let whatIgot=finalBal.minus(initBal);
      let difference=expected.minus(whatIgot).toNumber();
      assert.equal(difference,0,"Didnt get the right amount of ether from the contract");
    });
  });
});
