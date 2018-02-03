var Crowdsale = artifacts.require("./Crowdsale.sol");

module.exports = function(deployer) {	
	var ifSuccessfulSendTo = "0x308dC8b184cf7225280feaf642C87cf1Cbd2fCe6";    // foundation account 
    var addressOfTokenUsedAsReward = "0x662cc06988c51879602c44288f6add0086377b74"; // token address
  	deployer.deploy(Crowdsale, ifSuccessfulSendTo, addressOfTokenUsedAsReward); 
};