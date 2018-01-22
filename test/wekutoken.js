//var expect      = require('chai').expect;
var WEKUToken = artifacts.require("./WEKUToken.sol");

contract('WEKUToken', function(accounts) {
 
  var meta;
  const initSupply = 400;
  const tokenSymbol = "WEKU";
  const tokenName = "WEKU Token";

  const ownerAccount = accounts[0];
  const founderAccount = accounts[1]; //0x6f003229ec072c5d017bd28e834f59ad914aacb0;

  before(async function() {    

    try{
      meta = await WEKUToken.new(founderAccount); //.deployed(); //.new(accounts[1]);
      console.log("OK");
    }catch(err){
      console.log(err);
    }
    
  });

  it("should have intialized correctly", async function() {   
      console.log("start");

      const symbol = await meta.symbol.call();
      const name = await meta.name.call();      
      const ownerBalance = await meta.balanceOf.call(ownerAccount);
      const founderBalance = await meta.balanceOf.call(founderAccount);
    
      //console.log(name);
      //console.log(symbol);
      console.log(ownerBalance);
      console.log(founderBalance);

      assert.equal(symbol, "WEKU", "token symbol isn't correct");
      assert.equal(name, "WEKU Token", "token name isnt correct");
      assert.equal(ownerBalance.valueOf(), 3.2e+26, "owner account amount is not correct");  
      assert.equal(founderBalance.valueOf(), 8.0e+25, "founder account amount is not correct");   
  });

  it("should not be able to transfer over 25% from founder account during first year", async function() {
    
    var over_25_percent_amount = 2.1e+25;
    try
    {
      await meta.transfer(accounts[2], over_25_percent_amount, {from: founderAccount});
    }catch(err){
      //assert.include(err, "VM Exception while processing transaction", "No able to limit founder to withdraw");
      console.log('==== error ====');
      //console.log(err);
      console.log('==== error ====');
    }    

    const founderBalance2 = await meta.balanceOf.call(founderAccount);
    assert.equal(founderBalance2.valueOf(), 8.0e+25, "founder account amount is not correct");   
  });

  it("should send coin correctly", async function() {

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 1.5e+26;

    account_one_starting_balance =  await meta.balanceOf.call(account_one);    
    account_two_starting_balance = await meta.balanceOf.call(account_two);
    await meta.transfer(account_two, amount, {from: account_one});
    account_one_ending_balance =  await meta.balanceOf.call(account_one);    
    account_two_ending_balance = await meta.balanceOf.call(account_two);

    //assert.equal(account_one_ending_balance.toNumber(), account_one_starting_balance.toNumber() - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(account_two_ending_balance.toNumber(), account_two_starting_balance.toNumber() + amount, "Amount wasn't correctly sent to the receiver");

  });

  
});
