var WEKUToken = artifacts.require("./WEKUToken.sol");

module.exports = function(deployer){
	var initSupply = 400000000;
	var tokenSymbol = "WEKU";
	var tokenName = "WEKU Token";
	var founderAddress = 0x6f003229ec072c5d017bd28e834f59ad914aacb0;
  	deployer.deploy(WEKUToken, initSupply, tokenName, tokenSymbol,  founderAddress); 
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
