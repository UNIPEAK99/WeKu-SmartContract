var WEKUToken = artifacts.require("./WEKUToken.sol");

module.exports = function(deployer) {
	uint256 intialSupply = 400 * 10 ** 6;
	string tokenName = "WEKU Token";
	string tokenSymbol = "WEKU";
	address founder = 0xa9dd4465940bee5daade3e52d5b282460d6cc366;
  	deployer.deploy(WEKUToken, intialSupply, tokenName, tokenSymbol, founder ); 
};