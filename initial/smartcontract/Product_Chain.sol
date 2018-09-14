pragma solidity ^0.4.24;

import "./token/IERC20token.sol";
import "./Ownership/Ownable.sol";

contract Product_Chain is Ownable {
    
    string constant model_name = "sampleProduct";
    
    struct product{
        string serial_Number;
        uint256 price;
        uint32 resaleCount;
        uint256 created_at;
        address owner;
    }
    constructor () {
        
    }
    
    function produce (string _serial_Number, uint256 _price) public onlyOwner{
        
        
    }

    

}