var Crowdsale = artifacts.require("./Crowdsale.sol");

module.exports = function(deployer) {	
	var ifSuccessfulSendTo = "0x308dC8b184cf7225280feaf642C87cf1Cbd2fCe6";    // foundation account 
    var addressOfTokenUsedAsReward = "0xa8d3ecaaffb67e510d34c0ecaf86cc51db43d7c7"; // token address
  	deployer.deploy(Crowdsale, ifSuccessfulSendTo, addressOfTokenUsedAsReward); 
};