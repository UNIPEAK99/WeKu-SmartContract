var WEKUToken = artifacts.require("./WEKUToken.sol");
var Crowdsale = artifacts.require("./Crowdsale.sol");

module.exports = function(deployer){	
	var team_account = "0x14a57942185A3F739340dA0ba8Ae268a65697773";
	var foundation_account = "0x308dC8b184cf7225280feaf642C87cf1Cbd2fCe6"; 

  	deployer.deploy(WEKUToken, team_account).then(function() {
	  return deployer.deploy(Crowdsale, foundation_account, WEKUToken.address);
	});
};