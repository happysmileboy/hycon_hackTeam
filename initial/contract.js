const Web3 = require("web3");
const fs = require("fs");
const solc = require('solc');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));



let source = fs.readFileSync(__dirname + '/smartcontract/VerifyVideo.sol', 'utf8');
let compiledContract = solc.compile(source, 1);
let abi =  [{ 		"constant": false, 		"inputs": [ 			{ 				"name": "_name", 				"type": "uint256" 			}, 			{ 				"name": "_videoHash", 				"type": "uint256" 			} 		], 		"name": "uploadVideoData", 		"outputs": [], 		"payable": false, 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"constant": true, 		"inputs": [ 			{ 				"name": "_name", 				"type": "uint256" 			}, 			{ 				"name": "_hashToCompare", 				"type": "uint256" 			} 		], 		"name": "compareVideoData", 		"outputs": [ 			{ 				"name": "", 				"type": "bool" 			} 		], 		"payable": false, 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"constant": false, 		"inputs": [], 		"name": "renounceOwnership", 		"outputs": [], 		"payable": false, 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"constant": true, 		"inputs": [ 			{ 				"name": "", 				"type": "uint256" 			} 		], 		"name": "nameToVideo", 		"outputs": [ 			{ 				"name": "name", 				"type": "uint256" 			}, 			{ 				"name": "videoHash", 				"type": "uint256" 			} 		], 		"payable": false, 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"constant": true, 		"inputs": [], 		"name": "owner", 		"outputs": [ 			{ 				"name": "", 				"type": "address" 			} 		], 		"payable": false, 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"constant": true, 		"inputs": [ 			{ 				"name": "", 				"type": "uint256" 			} 		], 		"name": "videoList", 		"outputs": [ 			{ 				"name": "name", 				"type": "uint256" 			}, 			{ 				"name": "videoHash", 				"type": "uint256" 			} 		], 		"payable": false, 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"constant": true, 		"inputs": [ 			{ 				"name": "_name", 				"type": "uint256" 			} 		], 		"name": "getVideoData", 		"outputs": [ 			{ 				"name": "", 				"type": "uint256" 			} 		], 		"payable": false, 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"constant": false, 		"inputs": [ 			{ 				"name": "_newOwner", 				"type": "address" 			} 		], 		"name": "transferOwnership", 		"outputs": [], 		"payable": false, 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"inputs": [], 		"payable": false, 		"stateMutability": "nonpayable", 		"type": "constructor" 	}, 	{ 		"anonymous": false, 		"inputs": [ 			{ 				"indexed": true, 				"name": "previousOwner", 				"type": "address" 			} 		], 		"name": "OwnershipRenounced", 		"type": "event" 	}, 	{ 		"anonymous": false, 		"inputs": [ 			{ 				"indexed": true, 				"name": "previousOwner", 				"type": "address" 			}, 			{ 				"indexed": true, 				"name": "newOwner", 				"type": "address" 			} 		], 		"name": "OwnershipTransferred", 		"type": "event" 	} ]
let bytecode = "608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506106f9806100606000396000f30060806040526004361061008e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806311b69c3014610093578063348268e5146100ca578063715018a61461011957806376e66af9146101305780638da5cb5b14610178578063a3996731146101cf578063f249e3cc14610217578063f2fde38b14610258575b600080fd5b34801561009f57600080fd5b506100c8600480360381019080803590602001909291908035906020019092919050505061029b565b005b3480156100d657600080fd5b506100ff6004803603810190808035906020019092919080359060200190929190505050610390565b604051808215151515815260200191505060405180910390f35b34801561012557600080fd5b5061012e6103c9565b005b34801561013c57600080fd5b5061015b600480360381019080803590602001909291905050506104cb565b604051808381526020018281526020019250505060405180910390f35b34801561018457600080fd5b5061018d6104ef565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101db57600080fd5b506101fa60048036038101908080359060200190929190505050610514565b604051808381526020018281526020019250505060405180910390f35b34801561022357600080fd5b5061024260048036038101908080359060200190929190505050610547565b6040518082815260200191505060405180910390f35b34801561026457600080fd5b50610299600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061056c565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102f657600080fd5b6040805190810160405280838152602001828152506002600084815260200190815260200160002060008201518160000155602082015181600101559050506001600260008481526020019081526020016000209080600181540180825580915050906001820390600052602060002090600202016000909192909190915060008201548160000155600182015481600101555050505050565b60008060026000858152602001908152602001600020600101549050828114156103bd57600191506103c2565b600091505b5092915050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561042457600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a260008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b60026020528060005260406000206000915090508060000154908060010154905082565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60018181548110151561052357fe5b90600052602060002090600202016000915090508060000154908060010154905082565b6000806002600084815260200190815260200160002060010154905080915050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156105c757600080fd5b6105d0816105d3565b50565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561060f57600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a723058203828e9c8954f472b68ad4030159472f1a5f71b9ce75ca9deffa55fb5df2a3e7b0029"
let gasEstimate = web3.eth.estimateGas({data: bytecode});
let MyContract = new web3.eth.Contract(abi, {from :"0xc1f18604cD79F394Aa46D9E18F334F1CFD7D31be", gas: gasEstimate}, function(err, myContract){
   if(!err) {
      // NOTE: The callback will fire twice!
      // Once the contract has the transactionHash property set and once its deployed on an address.
       // e.g. check tx hash on the first call (transaction send)
      if(!myContract.address) {
          console.log(myContract.transactionHash) // The hash of the transaction, which deploys the contract
      
      // check address on the second call (contract deployed)
      } else {
          console.log(myContract.address) // the contract address
      }
       // Note that the returned "myContractReturned" === "myContract",
      // so the returned "myContractReturned" object will also get the address set.
}});
