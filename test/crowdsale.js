var Crowdsale = artifacts.require("./Crowdsale.sol");

contract('Crowdsale', function(accounts) {
 
  var meta;  

  before(async function() {    

    try{
      meta = await Crowdsale.new([0x123, 0x234]); 
    }catch(err){
      console.log(err);
    }
    
  });

  it("should have get tokens calculated correctly", async function() {   
     
      const ether_1 = await meta.getWEKUTokens.call(1);
      const ether_100 = await meta.getWEKUTokens.call(100);
      
      console.log('get tokens ...');
      console.log(ether_1);
      console.log(ether_100);

      assert.equal(ether_1.valueOf(), 8500, "get tokens of 1 ether is not correct");  
      assert.equal(ether_100.valueOf(), 850000, "get tokens of 100 ether is not correct");   
  });

  
});
