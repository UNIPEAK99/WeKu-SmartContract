var WEKUToken = artifacts.require("./WEKUToken.sol");

module.exports = function(deployer){	
	var team_account       = "0xe1C8959A2A1023D1433f23a67f8cD63F27a51192";
  	deployer.deploy(WEKUToken, team_account);
};

