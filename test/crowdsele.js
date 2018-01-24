var Crowdsale = artifacts.require("./Crowdsale.sol");

contract('Crowdsale', function(accounts) {
 
  var meta;  

  before(async function() {    

    try{
      meta = await Crowdsale.new([0x914e22e872928aae6b0a68d87fe936dca3242a0e, 0x914e22e872928aae6b0a68d87fe936dca3242a0e]); 
    }catch(err){
      console.log(err);
    }
    
  });

  it("should have discount calculated correctly", async function() {   
     
      const price20off = await meta.getPriceByDiscount.call(8000, 20);
      const price10off = await meta.getPriceByDiscount.call(8000, 10);
      
      console.log('percent off ...');
      console.log(price20off);
      console.log(price10off);

      assert.equal(price20off, 6400, "10 percent off is not correct");  
      assert.equal(price10off, 7200, "20 percent off is not correct");   
  });

  
});
