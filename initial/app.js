var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('json spaces', 100);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/public/index.html");
})

//web3
const Web3 = require("web3");
const fs = require("fs");
const solc = require('solc');
var Accounts = require('web3-eth-accounts');
var Tx = require('ethereumjs-tx');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Passing in the eth or web3 package is necessary to allow retrieving chainId, gasPrice and nonce automatically
// for accounts.signTransaction().
app.get("/createaddress", function(req,res) {
	const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	sampleaccounts = web3.eth.accounts.create();
	// sa = web3.eth.personal.newAccount('!@superpassword').then(console.log);
	web3.eth.accounts.signTransaction({chainId:1, gas:2000000},sampleaccounts.privateKey).then(console.log);
	web3.eth.getCoinbase()
	// web3.eth.sendTransaction({
	// 	from: sa, 
	// })
	res.send(sampleaccounts.accounts)
})


app.get("/deploy", function(req,res) {
	res.sendFile(__dirname + "/public/index.html");
	const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

	let source = fs.readFileSync(__dirname + '/smartcontract/VerifyVideo.sol', 'utf8');
	let compiledContract = solc.compile(source, 1);
	let abi = JSON.parse(compiledContract.contracts[':VerifyVideo'].interface);
	let bytecode = compiledContract.contracts[':VerifyVideo'].bytecode;
	let gasEstimate = web3.eth.estimateGas({data: "0x" + bytecode});
	sampleaccounts = web3.eth.accounts.create();
	let myContract = new web3.eth.Contract(abi, {from : sampleaccounts.address, gas: gasEstimate});
	myContract.deploy({
		data: "0x" + bytecode
	}).send({
		from: "0x13112C9398b3aEc546A956704336A6b7E4aC5B0C",
		gas: 1500000,
		gasPrice: '30000000000000'})
})

app.get("/uploadVideoData", function(req,res) {
	var fileName = req.query.name;
	var fileHash = req.query.hash;
	var proofContract = new web3.eth.Contract([ 	{ 		"constant": false, 		"inputs": [ 			{ 				"name": "_name", 				"type": "uint256" 			}, 			{ 				"name": "_videoHash", 				"type": "uint256" 			} 		], 		"name": "uploadVideoData", 		"outputs": [], 		"payable": false, 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"constant": true, 		"inputs": [ 			{ 				"name": "_name", 				"type": "uint256" 			}, 			{ 				"name": "_hashToCompare", 				"type": "uint256" 			} 		], 		"name": "compareVideoData", 		"outputs": [ 			{ 				"name": "", 				"type": "bool" 			} 		], 		"payable": false, 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"constant": false, 		"inputs": [], 		"name": "renounceOwnership", 		"outputs": [], 		"payable": false, 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"constant": true, 		"inputs": [ 			{ 				"name": "", 				"type": "uint256" 			} 		], 		"name": "nameToVideo", 		"outputs": [ 			{ 				"name": "name", 				"type": "uint256" 			}, 			{ 				"name": "videoHash", 				"type": "uint256" 			} 		], 		"payable": false, 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"constant": true, 		"inputs": [], 		"name": "owner", 		"outputs": [ 			{ 				"name": "", 				"type": "address" 			} 		], 		"payable": false, 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"constant": true, 		"inputs": [ 			{ 				"name": "", 				"type": "uint256" 			} 		], 		"name": "videoList", 		"outputs": [ 			{ 				"name": "name", 				"type": "uint256" 			}, 			{ 				"name": "videoHash", 				"type": "uint256" 			} 		], 		"payable": false, 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"constant": true, 		"inputs": [ 			{ 				"name": "_name", 				"type": "uint256" 			} 		], 		"name": "getVideoData", 		"outputs": [ 			{ 				"name": "", 				"type": "uint256" 			} 		], 		"payable": false, 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"constant": false, 		"inputs": [ 			{ 				"name": "_newOwner", 				"type": "address" 			} 		], 		"name": "transferOwnership", 		"outputs": [], 		"payable": false, 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"inputs": [], 		"payable": false, 		"stateMutability": "nonpayable", 		"type": "constructor" 	}, 	{ 		"anonymous": false, 		"inputs": [ 			{ 				"indexed": true, 				"name": "previousOwner", 				"type": "address" 			} 		], 		"name": "OwnershipRenounced", 		"type": "event" 	}, 	{ 		"anonymous": false, 		"inputs": [ 			{ 				"indexed": true, 				"name": "previousOwner", 				"type": "address" 			}, 			{ 				"indexed": true, 				"name": "newOwner", 				"type": "address" 			} 		], 		"name": "OwnershipTransferred", 		"type": "event" 	} ]
		, "0xaf7A11B964Ff6C7163b1516161Af57A6144E3B9F"); //set startcontract deployed
	proofContract.methods.uploadVideoData(fileName, fileHash).send({from: "0x13112C9398b3aEc546A956704336A6b7E4aC5B0C", gas: 1200000}).then(function(receipt) {
		var blockHash = receipt.blockHash;
		var blockNumber = receipt.blockNumber;
		var from = receipt.from;
		var gasUsed = receipt.gasUsed;
		var status = receipt.status;
		var to = receipt.to;
		var transactionHash = receipt.transactionHash;
		res.json({
			"blockHash": blockHash,
			"blockNumber": blockNumber,
			"from": from,
			"gasUsed": gasUsed,
			"status": status,
			"to": to,
			"transactionHash": transactionHash,
		});

	});
})

app.get("/getVideoData", function(req,res) {
	var fileName = req.query.name;
	var proofContract = new web3.eth.Contract([ 	{ 		"constant": false, 		"inputs": [ 			{ 				"name": "_name", 				"type": "uint256" 			}, 			{ 				"name": "_videoHash", 				"type": "uint256" 			} 		], 		"name": "uploadVideoData", 		"outputs": [], 		"payable": false, 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"constant": true, 		"inputs": [ 			{ 				"name": "_name", 				"type": "uint256" 			}, 			{ 				"name": "_hashToCompare", 				"type": "uint256" 			} 		], 		"name": "compareVideoData", 		"outputs": [ 			{ 				"name": "", 				"type": "bool" 			} 		], 		"payable": false, 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"constant": false, 		"inputs": [], 		"name": "renounceOwnership", 		"outputs": [], 		"payable": false, 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"constant": true, 		"inputs": [ 			{ 				"name": "", 				"type": "uint256" 			} 		], 		"name": "nameToVideo", 		"outputs": [ 			{ 				"name": "name", 				"type": "uint256" 			}, 			{ 				"name": "videoHash", 				"type": "uint256" 			} 		], 		"payable": false, 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"constant": true, 		"inputs": [], 		"name": "owner", 		"outputs": [ 			{ 				"name": "", 				"type": "address" 			} 		], 		"payable": false, 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"constant": true, 		"inputs": [ 			{ 				"name": "", 				"type": "uint256" 			} 		], 		"name": "videoList", 		"outputs": [ 			{ 				"name": "name", 				"type": "uint256" 			}, 			{ 				"name": "videoHash", 				"type": "uint256" 			} 		], 		"payable": false, 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"constant": true, 		"inputs": [ 			{ 				"name": "_name", 				"type": "uint256" 			} 		], 		"name": "getVideoData", 		"outputs": [ 			{ 				"name": "", 				"type": "uint256" 			} 		], 		"payable": false, 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"constant": false, 		"inputs": [ 			{ 				"name": "_newOwner", 				"type": "address" 			} 		], 		"name": "transferOwnership", 		"outputs": [], 		"payable": false, 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"inputs": [], 		"payable": false, 		"stateMutability": "nonpayable", 		"type": "constructor" 	}, 	{ 		"anonymous": false, 		"inputs": [ 			{ 				"indexed": true, 				"name": "previousOwner", 				"type": "address" 			} 		], 		"name": "OwnershipRenounced", 		"type": "event" 	}, 	{ 		"anonymous": false, 		"inputs": [ 			{ 				"indexed": true, 				"name": "previousOwner", 				"type": "address" 			}, 			{ 				"indexed": true, 				"name": "newOwner", 				"type": "address" 			} 		], 		"name": "OwnershipTransferred", 		"type": "event" 	} ]
		, "0xaf7A11B964Ff6C7163b1516161Af57A6144E3B9F");  //set startcontract deployed
	proofContract.methods.getVideoData(fileName).call().then(console.log);
})

app.get("/compareVideoData", function(req,res) {
	var fileName = req.query.name;
	var comparehash = req.query.hash;
	var proofContract = new web3.eth.Contract([ 	{ 		"constant": false, 		"inputs": [ 			{ 				"name": "_name", 				"type": "uint256" 			}, 			{ 				"name": "_videoHash", 				"type": "uint256" 			} 		], 		"name": "uploadVideoData", 		"outputs": [], 		"payable": false, 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"constant": true, 		"inputs": [ 			{ 				"name": "_name", 				"type": "uint256" 			}, 			{ 				"name": "_hashToCompare", 				"type": "uint256" 			} 		], 		"name": "compareVideoData", 		"outputs": [ 			{ 				"name": "", 				"type": "bool" 			} 		], 		"payable": false, 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"constant": false, 		"inputs": [], 		"name": "renounceOwnership", 		"outputs": [], 		"payable": false, 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"constant": true, 		"inputs": [ 			{ 				"name": "", 				"type": "uint256" 			} 		], 		"name": "nameToVideo", 		"outputs": [ 			{ 				"name": "name", 				"type": "uint256" 			}, 			{ 				"name": "videoHash", 				"type": "uint256" 			} 		], 		"payable": false, 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"constant": true, 		"inputs": [], 		"name": "owner", 		"outputs": [ 			{ 				"name": "", 				"type": "address" 			} 		], 		"payable": false, 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"constant": true, 		"inputs": [ 			{ 				"name": "", 				"type": "uint256" 			} 		], 		"name": "videoList", 		"outputs": [ 			{ 				"name": "name", 				"type": "uint256" 			}, 			{ 				"name": "videoHash", 				"type": "uint256" 			} 		], 		"payable": false, 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"constant": true, 		"inputs": [ 			{ 				"name": "_name", 				"type": "uint256" 			} 		], 		"name": "getVideoData", 		"outputs": [ 			{ 				"name": "", 				"type": "uint256" 			} 		], 		"payable": false, 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"constant": false, 		"inputs": [ 			{ 				"name": "_newOwner", 				"type": "address" 			} 		], 		"name": "transferOwnership", 		"outputs": [], 		"payable": false, 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"inputs": [], 		"payable": false, 		"stateMutability": "nonpayable", 		"type": "constructor" 	}, 	{ 		"anonymous": false, 		"inputs": [ 			{ 				"indexed": true, 				"name": "previousOwner", 				"type": "address" 			} 		], 		"name": "OwnershipRenounced", 		"type": "event" 	}, 	{ 		"anonymous": false, 		"inputs": [ 			{ 				"indexed": true, 				"name": "previousOwner", 				"type": "address" 			}, 			{ 				"indexed": true, 				"name": "newOwner", 				"type": "address" 			} 		], 		"name": "OwnershipTransferred", 		"type": "event" 	} ]
		, "0xaf7A11B964Ff6C7163b1516161Af57A6144E3B9F"); //set startcontract deployed
	var resultof;
	proofContract.methods.getVideoData(fileName).call().then(function(result){
		var hashonblockchain = result;
		proofContract.methods.compareVideoData(fileName,comparehash).call().then(function(result){
			console.log(result);
			resultof = result;
			res.json({
				"yourHash": comparehash,
				"result": resultof,
				"hashfound": hashonblockchain,
			});
		});
	});

})

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




app.get("/submit", function(req, res){
	console.log("submit")
	var name = "123";
	var hash = "12321";
	myContract.set.sendTransaction(name, hash, {
		from:web3.eth.account[0],
	}, function(error, transactionHash) {
		if (!error) {
			res.send(transactionHash);
		} else {
			res.send("Error");
		}
	})
})

app.listen(3000, function() {
	console.log("app listening on port 3000")
});

module.exports = app;

