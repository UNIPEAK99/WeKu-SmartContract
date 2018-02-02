var Crowdsale = artifacts.require("./Crowdsale.sol");

module.exports = function(deployer) {	
	var ifSuccessfulSendTo = "0x308dC8b184cf7225280feaf642C87cf1Cbd2fCe6";    // foundation account 
    var addressOfTokenUsedAsReward = "0x06b56ff741ad40a4cd67fc84ef689e88dee0b0fc"; // token address
  	deployer.deploy(Crowdsale, ifSuccessfulSendTo, addressOfTokenUsedAsReward); 
};