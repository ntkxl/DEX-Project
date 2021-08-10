// pragma solidity >=0.5.0;

// import "./Token.sol" ;

// contract EthSwap {
//     string public name = "EthSwap Instant Exchange"; // read this variable value outside of the smart contract
//     Token public token;
//     uint public rate = 100 ;

//     event TokenPurchased (address account , address token , uint amount , uint rate);
//     event TokenSold (address account , address token , uint amount , uint rate);

//     constructor (Token _token) public {
//         token = _token;
//     }

//     function buyToken() public payable{
//         // Calculate the number of token to buy
//         uint tokenAmount = msg.value * rate ;

//         //Require that EthSwap has enough token
//         require(token.balanceOf(address(this)) >= tokenAmount);
        
//         //Transfer token to the user
//         token.transfer(msg.sender,tokenAmount);

//         //Emit on event
//         emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
//     }

//     function sellToken(uint _amount) public  {  
    
//         address payable addr = address(uint160(msg.sender));
       
//          // User can't sell more tokens than they have
//         require(token.balanceOf(msg.sender) >= _amount);

//         // Calculate the amount of Ether to redeem
//         uint etherAmount = _amount / rate;

//         // Require that EthSwap has enough Ether
//         require(address(this).balance >= etherAmount);

//         // Perform sale
//         token.transferFrom(msg.sender, address(this), _amount);
//         addr.transfer(etherAmount);

//         // Emit an event
//         emit TokenSold(msg.sender, address(token), _amount, rate);
//     }
// }
pragma solidity >=0.5.0;

import "./Token.sol" ;

contract EthSwap {
    string public name = "EthSwap Instant Exchange"; // read this variable value outside of the smart contract
    Token public token;
    uint public rate = 100 ;
    uint public totalLiquidity;
    mapping (address => uint) public liquidity;

    event TokenPurchased (address account , address token , uint amount , uint rate);
    event TokenSold (address account , address token , uint amount , uint rate);

    constructor (Token _token) public {
        token = _token;
    }
    
    function init(uint256 tokens) public payable returns (uint) {
      require(totalLiquidity==0,"DEX:init - already has liquidity");
    //   totalLiquidity = address(this).balance;
      totalLiquidity = tokens;
      liquidity[msg.sender] = totalLiquidity;
      //require(token.transferFrom(msg.sender, address(this), tokens));
      return totalLiquidity;
    }
    
    function price(uint256 input_amount, uint256 input_reserve, uint256 output_reserve) public view returns (uint) {
      uint256 input_amount_with_fee = input_amount/997;
      uint256 numerator = input_amount_with_fee/output_reserve;
      uint256 denominator = input_reserve/1000+input_amount_with_fee;
      return numerator / denominator;
    }
    
    function addre() view public returns (address){
        return address(this);
    }
    function addre_ba() view public returns (uint){
        return address(this).balance;
    }

    function buyToken() public payable{
        // Calculate the number of token to buy
        uint tokenAmount = ethToToken() ;

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
        uint etherAmount = tokenToEth(_amount);

        // Require that EthSwap has enough Ether
        require(address(this).balance >= etherAmount);

        // Perform sale
        token.transferFrom(msg.sender, address(this), _amount);
        addr.transfer(etherAmount);

        // Emit an event
        emit TokenSold(msg.sender, address(token), _amount, rate);
    }
    
    function deposit() public payable returns (uint256) {
      uint256 eth_reserve = address(this).balance-(msg.value);
      uint256 token_reserve = token.balanceOf(address(this));
      uint256 token_amount = (msg.value*(token_reserve) / eth_reserve)+(1);
      uint256 liquidity_minted = msg.value*(totalLiquidity) / eth_reserve;
      liquidity[msg.sender] = liquidity[msg.sender]+(liquidity_minted);
      totalLiquidity = totalLiquidity+(liquidity_minted);
      require(token.transferFrom(msg.sender, address(this), token_amount));
      return liquidity_minted;
    }
    function withdraw(uint256 amount) public returns (uint256, uint256) {
      address payable addr = address(uint160(msg.sender));
      uint256 token_reserve = token.balanceOf(address(this));
      uint256 eth_amount = amount*(address(this).balance) / totalLiquidity;
      uint256 token_amount = amount*(token_reserve) / totalLiquidity;
      liquidity[msg.sender] = liquidity[msg.sender]-(eth_amount);
      totalLiquidity = totalLiquidity-(eth_amount);
      addr.transfer(eth_amount);
      require(token.transfer(msg.sender, token_amount));
      return (eth_amount, token_amount);
    }
    function ethToToken() public payable returns (uint256) {
      uint256 token_reserve = token.balanceOf(address(this));
      uint256 tokens_bought = price(msg.value, address(this).balance-(msg.value), token_reserve);
      //require(token.transfer(msg.sender, tokens_bought));
      return tokens_bought;
    }
    function tokenToEth(uint256 tokens) public returns (uint256) {
      address payable addr = address(uint160(msg.sender));
      uint256 token_reserve = token.balanceOf(address(this));
      uint256 eth_bought = price(tokens, token_reserve, address(this).balance);
      addr.transfer(eth_bought);
      //require(token.transferFrom(msg.sender, address(this), tokens));
      return eth_bought;
    }
}