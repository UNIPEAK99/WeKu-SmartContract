var WEKUToken = artifacts.require("./WEKUToken.sol");

module.exports = function(deployer) {
  deployer.deploy(WEKUToken); 
};