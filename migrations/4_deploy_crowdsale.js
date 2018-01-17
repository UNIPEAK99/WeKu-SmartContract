var Crowdsale = artifacts.require("./Crowdsale.sol");

module.exports = function(deployer) {	
	address ifSuccessfulSendTo = 0xa9dd4465940bee5daade3e52d5b282460d6cc366;
	uint256 fundingGoalInEthers = 7 * 10 ** 4;
	uint256 durationInMinutes = 60 * 24 * 30;
	uint256 etherCostOfEachToken = 3000;
	address addressOfTokenUsedAsReward = 0x123;
  	deployer.deploy(Crowdsale, ifSuccessfulSendTo, fundingGoalInEthers, durationInMinutes, etherCostOfEachToken, addressOfTokenUsedAsReward); 
};