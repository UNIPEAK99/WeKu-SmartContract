var WEKUToken = artifacts.require("./WEKUToken.sol");

module.exports = function(deployer) {
  deployer.deploy(WEKUToken, "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"); 
};


//WEKUToken.deployed().then(function(instance){return instance.balanceOf("0x627306090abaB3A6e1400e9345bC60c78a8BEf57").call();}).then(function(value){return value.toNumber()});