
pragma solidity ^0.4.16;

import "./SafeMath.sol";

interface token {
    function transfer(address receiver, uint amount) public;
}

contract Crowdsale {
    using SafeMath for uint;

    uint public constant FUNDING_GOAL = 30 * 1 ether;     
    uint public constant DURATION_IN_DAYS = 3; 
        
    uint public constant FIRST_RATE = 8500;   // ICO Day 1 -10: 1ETH can purchase 8500 WeKu tokens.
    uint public constant SECOND_RATE = 8000;  // ICO Day 11-25: 1ETH can purchase 8000 WeKu tokens.
    uint public constant THIRD_RATE = 7000;   // ICO Day 26-30: 1ETH can purchase 7000 WeKu tokens.
    uint public constant FIRST_RATE_DAYS = 1;   
    uint public constant SECOND_RATE_DAYS = 2;  

    address public beneficiary;    
    uint public amountRaised;
    uint public deadline;
    token public tokenReward;
    uint deployedTime;

    event GoalReached(address recipient, uint totalAmountRaised);
    event FundTransfer(address backer, uint amount, bool isContribution);
    
    function Crowdsale(
        address ifSuccessfulSendTo,        
        address addressOfTokenUsedAsReward
    ) public {
        deployedTime = now;
        deadline = now + DURATION_IN_DAYS * 1 days;   

        beneficiary = ifSuccessfulSendTo;
        tokenReward = token(addressOfTokenUsedAsReward);   
       
        amountRaised = 0;
    }

    /**
     * Fallback function
     *
     * The function without name is the default function that is called whenever anyone sends funds to a contract
     */
    function () public payable {
        require(now <= deadline);
        require(amountRaised <= FUNDING_GOAL);

        uint amount = msg.value;
        amountRaised = amountRaised.add(amount);

        uint tokenAmount = getWEKUTokens(amount);

        tokenReward.transfer(msg.sender, tokenAmount);

        FundTransfer(msg.sender, amount, true);
    }

    function getWEKUTokens(uint _amount) public view returns(uint){
        uint rate = THIRD_RATE;        
        if(now <= deployedTime + FIRST_RATE_DAYS * 1 days)
            rate = FIRST_RATE;        
        else if(now <= deployedTime + SECOND_RATE_DAYS * 1 days)
            rate = SECOND_RATE;

        return _amount.mul(rate);
    }

    modifier afterDeadline() { if (now >= deadline) _; }

    function safeWithdrawal() public afterDeadline {     
        require(beneficiary == msg.sender);   
        beneficiary.transfer(amountRaised);
        FundTransfer(beneficiary, amountRaised, false);        
    }
}
