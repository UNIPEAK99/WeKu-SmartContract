var WEKUToken = artifacts.require("./WEKUToken.sol");

contract('WEKUToken', function(accounts) {
 
  var meta;  

  const ownerAccount = accounts[0];
  const founderAccount = accounts[1]; 

  before(async function() {    

    try{
      meta = await WEKUToken.new(founderAccount); 
    }catch(err){
      console.log(err);
    }
    
  });

  it("should have intialized correctly", async function() { 
      const ownerBalance = await meta.balanceOf.call(ownerAccount);
      const founderBalance = await meta.balanceOf.call(founderAccount);    
     
      assert.equal(ownerBalance.valueOf(), 3.2e+26, "owner account amount is not correct");  
      assert.equal(founderBalance.valueOf(), 8.0e+25, "founder account amount is not correct");   
  });
  

  it("should send coin correctly", async function() {

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 1e+25;

    account_one_starting_balance =  await meta.balanceOf.call(account_one);    
    account_two_starting_balance = await meta.balanceOf.call(account_two);
    await meta.transfer(account_two, amount, {from: account_one});
    account_one_ending_balance =  await meta.balanceOf.call(account_one);    
    account_two_ending_balance = await meta.balanceOf.call(account_two);

    //assert.equal(account_one_ending_balance.toNumber(), account_one_starting_balance.toNumber() - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(account_two_ending_balance.toNumber(), account_two_starting_balance.toNumber() + amount, "Amount wasn't correctly sent to the receiver");

  });

  it("should assign to early birds correctly", async function() {

    // Get initial balances of first and second account.
    var account_one = accounts[3];
    var account_two = accounts[4];
    var account_three = accounts[5];

    var earlyBirds = [account_one, account_two, account_three];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_three_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;
    var account_three_ending_balance;

    var amount = 1.0e+20;

    account_one_starting_balance =  await meta.balanceOf.call(account_one);    
    account_two_starting_balance = await meta.balanceOf.call(account_two);
    account_three_starting_balance = await meta.balanceOf.call(account_three);

    await meta.assignToEarlyBirds(earlyBirds, amount);

    account_one_ending_balance =  await meta.balanceOf.call(account_one);    
    account_two_ending_balance = await meta.balanceOf.call(account_two);
    account_three_ending_balance = await meta.balanceOf.call(account_three);

    assert.equal(account_one_ending_balance.toNumber(), account_one_starting_balance.toNumber() + amount, "Amount wasn't correctly sent to the account one");
    assert.equal(account_two_ending_balance.toNumber(), account_two_starting_balance.toNumber() + amount, "Amount wasn't correctly sent to the account two");
    assert.equal(account_three_ending_balance.toNumber(), account_three_starting_balance.toNumber() + amount, "Amount wasn't correctly sent to the account three");

  });

  /*
  it("should fail if withdraw over 40% in first year.", async function() {
    
    var amount = 5e+25;
    var teamTotal = 8e+25;
    var teamWithdrawed = 0;
    
    var deployedTime = new Date();
    deployedTime.setFullYear(2018, 1, 1);
    var currentTime = new Date();
    currentTime.setFullYear(2018, 2, 1);

    var flag =  await meta.limitWithdrawTestWrapper.call(amount, teamTotal, teamWithdrawed, deployedTime.getTime(), currentTime.getTime()); 
    assert.equal(flag, false, "Should not be able to withdraw over 40% in first year.");

  });

  it("should pass if withdraw within 40% in first year.", async function() {
    
    var amount = 1e+25;
    var teamTotal = 8e+25;
    var teamWithdrawed = 0;
    
    var deployedTime = new Date();
    deployedTime.setFullYear(2018, 1, 1);
    var currentTime = new Date();
    currentTime.setFullYear(2018, 2, 1);

    var flag =  await meta.limitWithdrawTestWrapper.call(amount, teamTotal, teamWithdrawed, deployedTime.getTime(), currentTime.getTime()); 
    assert.equal(flag, true, "Should not be able to withdraw within 40% in first year.");

  });

  it("should fail if withdraw over 70% in second year.", async function() {
    
    var amount = 7e+25;
    var teamTotal = 8e+25;
    var teamWithdrawed = 0;
    
    var deployedTime = new Date();
    deployedTime.setFullYear(2018, 1, 1);
    var currentTime = new Date();
    currentTime.setFullYear(2019, 2, 1);

    var flag =  await meta.limitWithdrawTestWrapper.call(amount, teamTotal, teamWithdrawed, deployedTime.getTime(), currentTime.getTime()); 
    assert.equal(flag, false, "Should not be able to withdraw over 70% in second year.");

  });*/

  
});
