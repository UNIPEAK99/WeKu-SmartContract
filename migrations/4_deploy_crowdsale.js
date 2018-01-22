var Crowdsale = artifacts.require("./Crowdsale.sol");

module.exports = function(deployer) {	
  	deployer.deploy(Crowdsale, 0x914e22e872928aae6b0a68d87fe936dca3242a0e, 30000, 43200, 8000, 0x914e22e872928aae6b0a68d87fe936dca3242a0e); 
};