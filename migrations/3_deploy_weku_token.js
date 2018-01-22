var WEKUToken = artifacts.require("./WEKUToken.sol");

module.exports = function(deployer){
  	deployer.deploy(WEKUToken, 400000000, "WEKU Token", "WEKU", 0x6f003229ec072c5d017bd28e834f59ad914aacb0 ); 

};