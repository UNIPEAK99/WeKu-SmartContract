var WEKUToken = artifacts.require("./WEKUToken.sol");

module.exports = function(deployer){
	
	var founderAddress = 0x6f003229ec072c5d017bd28e834f59ad914aacb0;
  	deployer.deploy(WEKUToken, founderAddress); 
};

/*
var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
};
*/
