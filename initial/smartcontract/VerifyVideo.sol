pragma solidity ^0.4.24;

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
  address public owner;


  event OwnershipRenounced(address indexed previousOwner);
  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  constructor() public {
    owner = msg.sender;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  /**
   * @dev Allows the current owner to relinquish control of the contract.
   * @notice Renouncing to ownership will leave the contract without an owner.
   * It will not be possible to call the functions with the `onlyOwner`
   * modifier anymore.
   */
  function renounceOwnership() public onlyOwner {
    emit OwnershipRenounced(owner);
    owner = address(0);
  }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param _newOwner The address to transfer ownership to.
   */
  function transferOwnership(address _newOwner) public onlyOwner {
    _transferOwnership(_newOwner);
  }

  /**
   * @dev Transfers control of the contract to a newOwner.
   * @param _newOwner The address to transfer ownership to.
   */
  function _transferOwnership(address _newOwner) internal {
    require(_newOwner != address(0));
    emit OwnershipTransferred(owner, _newOwner);
    owner = _newOwner;
  }
}

contract VerifyVideo is Ownable {
    struct Video{
        uint256 name;
        uint256 videoHash;
    }
    
    Video[] public videoList;
    mapping(uint256 => Video) public nameToVideo;
    
    constructor () public Ownable() {
        
    }
    
    function uploadVideoData (uint256 _name, uint256 _videoHash) public {
        nameToVideo[_name] = Video(_name, _videoHash);
        videoList.push(nameToVideo[_name]);
    }
    
    function getVideoData(uint256 _name) public view returns (uint256) {
        uint hash = nameToVideo[_name].videoHash;
        return hash;
    }
    
    function compareVideoData(uint256 _name, uint256 _hashToCompare) public view returns (bool) {
        uint256 hash = nameToVideo[_name].videoHash;
        
        if (hash == _hashToCompare) {
            return true;
        } else {
            return false;
        }
    }
}