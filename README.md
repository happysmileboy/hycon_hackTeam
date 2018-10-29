## Inspiration
With the ever improving video editing technologies is it imperative to make sure the data we see has not been tampered with. Nowadays it is so easy to find shameful or fake videos with unbelievable credibility, like Jordan Peele puppeteering Barack Obama, having him call Donald Trump _a total and complete dipshit_.

We believe that, as digital evidence is becoming more a more important, we need to make sure that procedures and mechanisms for **verifying** the integrity of this **evidence** are kept up to date and appropriate for a modern and fair digital society.  


Imagine the following situation: 

_Marco_ kills _Lena_ in room 201. A CCTV camera installed in the corridor filmed him entering room 201. But then he manipulates the video recorded in order to incriminate the innocent _Paul_. He changes the video of the tape of room 201 for the one of room 101. The same room, but on the floor below.  

_Paul_, whose original room was 101, now he appears to have entered to 201 instead of 101. The police arrives to the hotel and when they see the surveillance videos, it looks like _Paul_ entered room 201 and committed the murder ._ Paul_ is arrested for the murder, and _Marco_ gets away.

Future video technology is going to make it easy for the next Marco’s to manipulate video and sound files in their favour. We need the technology to verify the integrity of digital evidence material and ensure that they adhere to the high security and justice level of society.

We hope that by implementing this project, we can create **awareness about the future dangers of video editing technology** that lie ahead. By getting as far as we could in just 36 hours, we hope that we can show others how feasible this is with more time and resources.

Our project is based upon the idea in this blog post: [link] (https://www.kinesense-vca.com/2018/03/13/blockchain-and-digital-chain-of-evidence/) 

## What it does

We apply a hash function* on the video data and video name, and upload the hash and video title onto the blockchain. The blockchain then has an immutable hash record of videos. This record can be used to compare evidence supplied in investigations and court to ensure the authenticity of the proof. When the CCTV company uploads a video for verification, the system will search for the title of the video on the blockchain. If the title is found, the system will compare the hashes, and the data found on the blockchain will be returned. A hash of the uploaded video will also be returned for comparison.

If the file hash already exists on the blockchain, the file is rejected and not saved on the blockchain. Only the CCTV company has the authority to upload videos on the blockchain. Each video has a unique name based on the date, time, place of the footage.

*Ideally, the hash should be generated from the video file. But because we did not have enough time, we were unable to generate hashes of the video file. Instead, we mock this procedure by generating a fixed-size string based on the video’s name, time of creation and size.

## How I built it
Solidity functions
=============
#####uploadVideoData(_name, _hash) 
-------------
* Hash is generated from the website -> then sendTransaction with two parameters -> they will be stored on blockchain
* The modifier “onlyOwner”, will only allow an authorized CCTV company to execute the functions
require() checks whether the name of the video already exists on the blockchain, and if that is the case, the file will not be uploaded. This is to prevent duplicates or that the record is tampered with later.

#####getVideoData(_name). 
-------------
* Uses mapping[] to return hashNumber which is stored on the blockchain.

#####compareVideoData(_name, _hashToCompare)
-------------
* Compares the hashes of two videos with the same name to see if they match.  

BackEnd for Server - express.js (framework for web).
------------- 
* Renders page, handles requests and responses port with 3000. 

BackEnd for Database - EVM using geth (tested on testNet for dev)
------------- 
* The command  “geth --dev --rpc --rpccordomain “*” --rpcaddr “0.0.0.0” --rpcport ”8545” --mine --unlock=0” 
starts the Etherum virtual machine.
* using web3.js, it connects to the FrontEnd.
* 0.0.0.0:3000/deploy : Create and deploy smart contract
* 0.0.0.0:3000/uploadVideoData
Generates a transaction that is sent to a smart contract. The smart contract creates a struct of the video, which contains the name and hash. The struct is then stored on the blockchain.
* 0.0.0.0:3000/compareVideoData
Generates a transaction that is sent to a smart contract. The smart contract executes the function compareVideoData in order to compare two video files.

FrontEnd for transaction - main.js, jquery.js(AJAX)
------------- 
* We use AJAX for speed and better UX

FrontEnd - html, css, js, bootstrap  
------------- 


## Challenges I ran into

We did a **design thinking** process to brainstorm and formally build up an idea, but ending up discarding all the work and ideas after rethinking and doing a market research. 
The error:  “Uncaught ReferenceError: Require is not defined” made us completely rewrite the hashing program in from Javascript to C# and in the end into node.js. 

Lack of energy when working continuously for long hours.  

## Accomplishments that I'm proud of
How we as almost 5 random strangers got together and started working together as a team, coming from different countries, facing language barriers, and diverse backgrounds (The Netherlands, Norway, Russia, Spain and Korea). Another struggle was to stay up and work for such a prolonged duration. 

## What I learned

We learned how to function and work as a **team**. Discuss ideas, work individually but still in coherence and actually try and create something. The hashing algorithm Blake2b is one of the fastest hash algorithms out there and still equally on par with security. Unfortunately, we weren’t able to implement it in the solution.

## What's next for: Using blockchain technology for the verification of video files. 
- Create a **control environment** to oversee the chain of custody over the videos/evidence for the parties that require access to them.  

- We made a function for a camera client to automatically send the hash to the server, but unfortunately didn't have opportunity to finish the server side. Afterwards videos' parameters and hash should be sent automatically to the server and stored in the blockchain. In an optimal situation, the entire process of saving the video file until verification by a blockchain transaction should take somewhere between 30s - 2min, mostly depending on the network.

- The use case is not only valid for videos, but any digital file, such as sound and images. The function of the system can expanded to include other types of media.

- Find a way to decentralize the solution so that it does not depend on a trusted third party. The current solution requires two assumptions: One, the CCTV company in charge of uploading content has to be trusted. One must assume that the video has not been tampered with prior to the upload. Two, we assume that the data is uploaded on the blockchain directly after capture. If there was a way to ensure that any upload made to the blockchain is always authentic, one would not need a trusted third party. This would also allow anyone to upload to and benefit from the system, not just verified CCTV authorities.

The camera providers are currently the only ones upholding the network. This in itself is not decentralized and we should therefore try to move away from that. We can do this by coming up with a proper incentivizing system of crypto-economics and decentralize the network.
