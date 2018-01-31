var WEKUToken = artifacts.require("./WEKUToken.sol");

module.exports = function(deployer){	
	var team_account = "0x14a57942185A3F739340dA0ba8Ae268a65697773";
  	deployer.deploy(WEKUToken, team_account); 
};