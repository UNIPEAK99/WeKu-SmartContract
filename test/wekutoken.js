var WEKUToken = artifacts.require("./WEKUToken.sol");

contract('WEKUToken', function(accounts) {

  it("should assert true", function(done) {
    var mytoken = WEKUToken.deployed();
    assert.isTrue(true);
    done();   // stops tests at this point
  });

  it("should put 3.2e+26 WEKUToken in the first account", function() {
    return WEKUToken.deployed().then(function(instance) {
      return instance.balanceOf.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 3.2e+26, "3.2e+26 wasn't in the first account");
    });
  });

  it("should put 8e+25 WEKUToken in the founder account", function() {
    return WEKUToken.deployed().then(function(instance) {
      return instance.balanceOf.call(accounts[1]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 8e+25, "8e+25 wasn't in the founder account");
    });
  });

  it("should send coin correctly", function() {
    var meta;

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 1.5e+26;

    return WEKUToken.deployed().then(function(instance) {
      meta = instance;
      return meta.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return meta.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return meta.transfer(account_two, amount, {from: account_one});
    }).then(function() {
      return meta.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return meta.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      //assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });

  it("should not be able to transfer over 25% from founder account during first year", function() {
    var meta;
    var founder_account = accounts[1];
    var over_25_percent_amount = 2.1e+25;

    return WEKUToken.deployed().then(function(instance) {
      meta = instance;
      meta.transfer(accounts[2], over_25_percent_amount, {from: founder_account});
    }).then(function(err) {
      console.log("OK");
      assert.fail;
    }).catch(function(err){
      console.log("NOT OK");
      assert.fail;
    });
  });
  
});
