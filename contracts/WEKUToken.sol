pragma solidity ^0.4.16;

import "./Owned.sol";
import "./TokenERC20.sol";

contract WEKUToken is Owned, TokenERC20 {
    
    string public constant TOKEN_SYMBOL  = "KUU6"; 
    string public constant TOKEN_NAME    = "KUU6 Token";  
    uint public constant INITIAL_SUPPLLY = 4 * 10 ** 8; 

    uint256 deployedTime;   // the time this constract is deployed.
    address team;           // team account
    uint256 teamTotal;      // total amount of token assigned to team.    
    uint256 teamWithdrawed; // total withdrawed of team account

    mapping (address => bool) public frozenAccount;

    /* This generates a public event on the blockchain that will notify clients */
    event FrozenFunds(address target, bool frozen);

    /* Initializes contract with initial supply tokens to the creator of the contract */
    function WEKUToken(
        address _team
    ) TokenERC20(INITIAL_SUPPLLY, TOKEN_NAME, TOKEN_SYMBOL) public {
        deployedTime = now;
        team = _team; 
        teamTotal = (INITIAL_SUPPLLY * 10 ** 18) / 5; 
        // assign 20% to team team once and only once.         
        _transfer(owner, team, teamTotal);
    }

    /**
     * Transfer tokens
     *
     * Send `_value` tokens to `_to` from your account
     *
     * @param _to The address of the recipient
     * @param _value the amount to send
     */
    function transfer(address _to, uint256 _value) public {
        _transfer(msg.sender, _to, _value);
    }

    
    /// @notice Create `mintedAmount` tokens and send it to `target`
    /// @param target Address to receive the tokens
    /// @param mintedAmount the amount of tokens it will receive
    function mintToken(address target, uint256 mintedAmount) onlyOwner public {
        balanceOf[target] = balanceOf[target].add(mintedAmount);
        totalSupply = totalSupply.add(mintedAmount);

        Transfer(0, this, mintedAmount);
        Transfer(this, target, mintedAmount);
    }

    /// @notice `freeze? Prevent | Allow` `target` from sending & receiving tokens
    /// @param target Address to be frozen
    /// @param freeze either to freeze it or not
    function freezeAccount(address target, bool freeze) onlyOwner public {
        frozenAccount[target] = freeze;

        FrozenFunds(target, freeze);
    }

    /// @notice batch assign tokens to users registered in airdrops
    /// @param earlyBirds address[] format in wallet: ["address1", "address2", ...]
    /// @param amount without decimal amount: 10**18
    function assignToEarlyBirds(address[] earlyBirds, uint256 amount) onlyOwner public {
        require(amount > 0);

        for (uint i = 0; i < earlyBirds.length; i++)
            _transfer(msg.sender, earlyBirds[i], amount * 10 ** 18);
    }

    /* Internal transfer, only can be called by this contract */
    function _transfer(address _from, address _to, uint _value) internal { 
        require (_to != 0x0);                               // Prevent transfer to 0x0 address. Use burn() instead
        require (balanceOf[_from] >= _value);               // Check if the sender has enough
        require (balanceOf[_to] + _value > balanceOf[_to]); // Check for overflows
        require(!frozenAccount[_from]);                     // Check if sender is frozen
        require(!frozenAccount[_to]);                       // Check if recipient is frozen

        // make sure founders can only withdraw 25% each year after first year    
        if(_from == team){
            bool flag = _limitTeamWithdraw(_value, teamTotal, teamWithdrawed, deployedTime, now);
            if(!flag)
                revert();
        }          
             
        balanceOf[_from] = balanceOf[_from].sub(_value);                  // Subtract from the sender
        balanceOf[_to] = balanceOf[_to].add(_value);                      // Add the same to the recipient

        if(_from == team) teamWithdrawed = teamWithdrawed.add(_value);    // record how many team withdrawed

        Transfer(_from, _to, _value);
    }

    // setperate this function is for unit testing.
    // limited withdraw: 
    // after deployed:  40%
    // after one year:  30% 
    // after two years: 30%
    function _limitTeamWithdraw(uint _amount, uint _teamTotal, uint _teamWithrawed, uint _deployedTime, uint _currentTime) internal pure returns(bool){
        
        bool flag  = true;

        uint _tenPercent = _teamTotal / 10;    
        if(_currentTime <= _deployedTime + 1 days && _amount + _teamWithrawed >= _tenPercent * 4) 
            flag = false;
        else if(_currentTime <= _deployedTime + 2 days && _amount + _teamWithrawed >= _tenPercent * 7) 
            flag = false; 

        return flag;

    }

}
