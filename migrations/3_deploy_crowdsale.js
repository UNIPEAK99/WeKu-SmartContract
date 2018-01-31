var Crowdsale = artifacts.require("./Crowdsale.sol");

module.exports = function(deployer) {	
	var ifSuccessfulSendTo = "0x308dC8b184cf7225280feaf642C87cf1Cbd2fCe6";    // foundation account 
    var addressOfTokenUsedAsReward = "0x8e5f353bff2afe35a7d75d94b2debd1c63f1a146"; // token address
  	deployer.deploy(Crowdsale, ifSuccessfulSendTo, addressOfTokenUsedAsReward); 
};