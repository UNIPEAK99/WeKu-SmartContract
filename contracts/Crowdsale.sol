
pragma solidity ^0.4.16;

import "./SafeMath.sol";

interface token {
    function transfer(address receiver, uint amount) public;
}

contract Crowdsale {
    using SafeMath for uint;

    address public beneficiary;
    uint public fundingGoal;
    uint public amountRaised;
    uint public deadline;
    uint public price;
    token public tokenReward;
    mapping(address => uint256) public balanceOf;
    bool fundingGoalReached = false;
    bool crowdsaleClosed = false;
    uint deployedTime;

    event GoalReached(address recipient, uint totalAmountRaised);
    event FundTransfer(address backer, uint amount, bool isContribution);

    /**
     * Constrctor function
     *
     * Setup the owner
     */
    function Crowdsale(
        address ifSuccessfulSendTo,        
        address addressOfTokenUsedAsReward
    ) public {

        fundingGoal = 30000 * 1 ether;  // 3000 ether.        
        price = 1 ether / 8000;  // price in wei, 1 ether for 8000 tokens.

        uint durationInMinutes = 60 * 24 * 30; // 30 days sale
        deadline = now + durationInMinutes * 1 minutes;        
        deployedTime = now;

        beneficiary = ifSuccessfulSendTo;
        tokenReward = token(addressOfTokenUsedAsReward);   
    }

    /**
     * Fallback function
     *
     * The function without name is the default function that is called whenever anyone sends funds to a contract
     */
    function () public payable {
        require(!crowdsaleClosed);

        uint amount = msg.value;
        balanceOf[msg.sender] = balanceOf[msg.sender].add(amount);
        amountRaised = amountRaised.add(amount);

        uint tempPrice = price;

        // from 1st -10th, the price is 20% off.
        if(now <= deployedTime + 10 days)
            tempPrice = getPriceByDiscount(price, 20);
        // 10th - 20th, the price is 10% off.
        else if(now <= deployedTime + 20 days)
            tempPrice = getPriceByDiscount(price, 10); 

        tokenReward.transfer(msg.sender, amount / tempPrice);

        FundTransfer(msg.sender, amount, true);
    }

    function getPriceByDiscount(uint _price, uint _percentOff) public pure returns (uint) {
        return _price * (100 - _percentOff) / 100;
    }

    modifier afterDeadline() { if (now >= deadline) _; }

    /**
     * Check if goal was reached
     *
     * Checks if the goal or time limit has been reached and ends the campaign
     */
    function checkGoalReached() public afterDeadline {
        if (amountRaised >= fundingGoal){
            fundingGoalReached = true;
            GoalReached(beneficiary, amountRaised);
        }
        crowdsaleClosed = true;
    }


    /**
     * Withdraw the funds
     *
     * Checks to see if goal or time limit has been reached, and if so, and the funding goal was reached,
     * sends the entire amount to the beneficiary. If goal was not reached, each contributor can withdraw
     * the amount they contributed.
     */
    function safeWithdrawal() public afterDeadline {
        if (!fundingGoalReached) {
            uint amount = balanceOf[msg.sender];
            balanceOf[msg.sender] = 0;
            if (amount > 0) {
                if (msg.sender.send(amount)) {
                    FundTransfer(msg.sender, amount, false);
                } else {
                    balanceOf[msg.sender] = amount;
                }
            }
        }

        if (fundingGoalReached && beneficiary == msg.sender) {
            if (beneficiary.send(amountRaised)) {
                FundTransfer(beneficiary, amountRaised, false);
            } else {
                //If we fail to send the funds to beneficiary, unlock funders balance
                fundingGoalReached = false;
            }
        }
    }
}
