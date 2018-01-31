pragma solidity ^0.4.16;

import "./Owned.sol";
import "./TokenERC20.sol";

contract WEKUToken is Owned, TokenERC20 {
    uint256 _initialSupply = 4 * 10 ** 8;
    string _tokenSymbol = "KUU2"; 
    string _tokenName = "KUU Token";       
    
    //uint256 public sellPrice;
    //uint256 public buyPrice;

    mapping (address => bool) public frozenAccount;

    uint256 deployedTime;
    uint256 deployedAmount;
    address founder;
    uint256 founderWithdrawed;

    /* This generates a public event on the blockchain that will notify clients */
    event FrozenFunds(address target, bool frozen);

    /* Initializes contract with initial supply tokens to the creator of the contract */
    function WEKUToken(
        address _founder
    ) TokenERC20(_initialSupply, _tokenName, _tokenSymbol) public {
        deployedTime = now;
        deployedAmount = _initialSupply;
        founder = _founder; 
        // assign 20% to founder team once and only once.
        _assignToFounder(founder);
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

    /*
    /// @notice Allow users to buy tokens for `newBuyPrice` eth and sell tokens for `newSellPrice` eth
    /// @param newSellPrice Price the users can sell to the contract
    /// @param newBuyPrice Price users can buy from the contract
    function setPrices(uint256 newSellPrice, uint256 newBuyPrice) onlyOwner public {
        sellPrice = newSellPrice;
        buyPrice = newBuyPrice;
    }

    /// @notice Buy tokens from contract by sending ether
    function buy() payable public {
        uint amount = msg.value / buyPrice;               // calculates the amount
        _transfer(this, msg.sender, amount);              // makes the transfers
    }

    /// @notice Sell `amount` tokens to contract
    /// @param amount amount of tokens to be sold
    function sell(uint256 amount) public {
        require(this.balance >= amount * sellPrice);      // checks if the contract has enough ether to buy
        _transfer(msg.sender, this, amount);              // makes the transfers
        msg.sender.transfer(amount * sellPrice);          // sends ether to the seller. It's important to do this last to avoid recursion attacks
    }
    */

    function assignToEarlyBirds(address[] earlyBirds, uint256 amount) onlyOwner public {
        require(amount > 0);

        for (uint i = 0; i < earlyBirds.length; i++)
            _transfer(msg.sender, earlyBirds[i], amount);
    }

    // internal functions

    /* Internal transfer, only can be called by this contract */
    function _transfer(address _from, address _to, uint _value) internal { 
        require (_to != 0x0);                               // Prevent transfer to 0x0 address. Use burn() instead
        require (balanceOf[_from] >= _value);               // Check if the sender has enough
        require (balanceOf[_to] + _value > balanceOf[_to]); // Check for overflows
        require(!frozenAccount[_from]);                     // Check if sender is frozen
        require(!frozenAccount[_to]);                       // Check if recipient is frozen

        if(_from == founder && !_limitFounderWithdraw(_value)) revert();    // make sure founders can only withdraw 25% each year after first year       
             
        balanceOf[_from] = balanceOf[_from].sub(_value);                         // Subtract from the sender
        balanceOf[_to] = balanceOf[_to].add(_value);                           // Add the same to the recipient

        if(_from == founder) founderWithdrawed = founderWithdrawed.add(_value);    // record how many founder withdrawed

        Transfer(_from, _to, _value);
    }

    function _assignToFounder(address _founder) internal {
        require(_founder != address(0x0));

        uint256 amountForFounder = totalSupply / 5; // 20%
        
        _transfer(owner, _founder, amountForFounder);
    }

    function _limitFounderWithdraw (uint256 _amount) internal constant returns (bool){
        bool flag  = false;
        uint256 _25percent =  deployedAmount / (5*4);  // 25% of founder's total

        // first year 25% max
        if(now <= deployedTime + 1 years && _amount + founderWithdrawed >= _25percent) 
            flag = false;
        else if(now <= deployedTime + 2 years && _amount + founderWithdrawed >= _25percent * 2) 
            flag = false;
        else if(now <= deployedTime + 3 years && _amount + founderWithdrawed >= _25percent * 3) 
            flag = false;
        else
            flag = true;

        return flag;
    }
}
