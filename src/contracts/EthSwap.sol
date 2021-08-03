pragma solidity >=0.5.0;

import "./Token.sol" ;

contract EthSwap {
    string public name = "EthSwap Instant Exchange"; // read this variable value outside of the smart contract
    Token public token;
    uint public rate = 100 ;

    event TokenPurchased (address account , address token , uint amount , uint rate);
    event TokenSold (address account , address token , uint amount , uint rate);

    constructor (Token _token) public {
        token = _token;
    }

    function buyToken() public payable{
        // Calculate the number of token to buy
        uint tokenAmount = msg.value * rate ;

        //Require that EthSwap has enough token
        require(token.balanceOf(address(this)) >= tokenAmount);
        
        //Transfer token to the user
        token.transfer(msg.sender,tokenAmount);

        //Emit on event
        emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellToken(uint _amount) public  {  
    
        address payable addr = address(uint160(msg.sender));
       
         // User can't sell more tokens than they have
        require(token.balanceOf(msg.sender) >= _amount);

        // Calculate the amount of Ether to redeem
        uint etherAmount = _amount / rate;

        // Require that EthSwap has enough Ether
        require(address(this).balance >= etherAmount);

        // Perform sale
        token.transferFrom(msg.sender, address(this), _amount);
        addr.transfer(etherAmount);

        // Emit an event
        emit TokenSold(msg.sender, address(token), _amount, rate);
    }
}