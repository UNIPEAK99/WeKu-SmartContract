pragma solidity ^0.4.16;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/WEKUToken.sol";

contract TestWEKUToken {
  event Log(string msg);

  function testBasics() public {
    uint total = 4e26;
    uint teamTotal = 8e25;

    Assert.equal(total / 5, teamTotal, "Team should get 20% of total.");

  }

  function testLimitWithdraw1() public{
    uint amount = 6e25;
    uint teamTotal = 8e25;
    uint teamWithdrawed = 1e25;
    uint currentTime = now;
    uint deployedTime = currentTime - 3 days; 

    bool flag =  limitTeamWithdrawInternal(amount, teamTotal, teamWithdrawed, deployedTime, currentTime); 
    Assert.equal(flag, false, "Should not be able to withdraw over 40% in first year.");

  }

  function testLimitWithdraw2() public{
    uint amount = 1e25;
    uint teamTotal = 8e25;
    uint teamWithdrawed = 1e25;
    uint currentTime = now;
    uint deployedTime = currentTime - 3 days; 

    bool flag =  limitTeamWithdrawInternal(amount, teamTotal, teamWithdrawed, deployedTime, currentTime); 
    Assert.equal(flag, true, "Should  be able to withdraw within 40% in first year.");

  }

  function testLimitWithdraw3() public{
    uint amount = 6e25;
    uint teamTotal = 8e25;
    uint teamWithdrawed = 1e25;
    uint currentTime = now;
    uint deployedTime = currentTime - 1 years - 3 days; 

    bool flag =  limitTeamWithdrawInternal(amount, teamTotal, teamWithdrawed, deployedTime, currentTime); 
    Assert.equal(flag, false, "Should not be able to withdraw over 70% in second year.");

  }

  function testLimitWithdraw4() public{
    uint amount = 6e25;
    uint teamTotal = 8e25;
    uint teamWithdrawed = 1e25;
    uint currentTime = now;
    uint deployedTime = currentTime - 2 years - 3 days; 

    bool flag =  limitTeamWithdrawInternal(amount, teamTotal, teamWithdrawed, deployedTime, currentTime); 
    Assert.equal(flag, true, "Should be able to withdraw over 70 after second year.");

  }

  function limitTeamWithdrawInternal(uint _amount, uint _teamTotal, uint _teamWithrawed, uint _deployedTime, uint _currentTime) public returns(bool){
        
        bool flag  = true;

        uint _tenPercent = _teamTotal / 10;  

        if(_currentTime <= _deployedTime + 1 years && _amount + _teamWithrawed >= _tenPercent * 4) 
            flag = false;
        else if(_currentTime <= _deployedTime + 2 years && _amount + _teamWithrawed >= _tenPercent * 7) 
            flag = false; 

        return flag;

    }
}