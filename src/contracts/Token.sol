pragma solidity >=0.5.0;


// contract Owner {
//     string public owner ;
//     string public newOwner ;

//     event OwnershipTransferred(address indexed _from, address indexed _to);

//     constructor() public {
//         owner + msg.sender ;
//     }
//     modifier onlyOwner {
//         require(msg.sender == owner);
//         _;
//     }
//     function transferOwnership(address _newOwner) public onlyOwner {
//         newOwner = _newOwner ;
//     }
// }
contract Token {
    string  public name = "DApp Token";
    string  public symbol = "DAPP";
    uint8   public decimals = 18;
    uint    public totalTokenSupply = 100000000000000000000; // 1 million tokens

    //EVENTS
    event Transfer(address indexed _from,address indexed _to,uint _value);
    event Approval(address indexed _owner,address indexed _spender,uint _value);

    mapping(address => uint) public balances;
    mapping(address => mapping(address => uint)) public allowed;

    constructor() public {
        balances[msg.sender] = totalTokenSupply;
    }

    // GETTERS
    function nameToken() view public returns (string memory){
        return name ;
    }

    function symbolToken() view public returns (string memory){
        return symbol ;
    }

    function totalSupply () view public returns (uint){
        return totalTokenSupply ;
    }

    function balanceOf(address _owner)  view public returns (uint){
        return balances[_owner] ;
    }

    function allowance(address _owner, address _spender) public view returns (uint remaining){
        return allowed[_owner][_spender];
    }

    // FUNCTIONS

    function transfer(address _to, uint _value) public returns (bool success) {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint _value) public returns (bool success) {
        require(_value <= balances[_from]);
        require(_value <= allowed[_from][msg.sender]);
        balances[_from] -= _value;
        balances[_to] += _value;
        allowed[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
    
    

}