pragma solidity ^0.4.24;

import "./ownership/Ownable.sol";
import "./Product_Chain.sol";

contract Company is Ownable {
	
	Product public product;

	constructor () public
	Ownable() {

	}	
	
	
}