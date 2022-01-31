var Web3 = require("web3");

// IMPORTING ABI
var fs = require("fs");
var jsonFile = "./contract/dsc.json";
var parsed = JSON.parse(fs.readFileSync(jsonFile));
var abi = parsed.abi;
// --------------- //

var web3Url = "https://ropsten.infura.io/v3/1e744c5259c740ffb4a4a94b0ac330b8";
var address = "0xb9eC43E9eFa48E4b9c3667E66732f521E1Bc633f";

var DSC_CONTRACT_ADDRESS = "0xF6e13B49600DeF8cd5A1F90681b95Ce02Fb16821";

var web3 = new Web3(web3Url);

// Initialize contract
var contract = new web3.eth.Contract(abi, DSC_CONTRACT_ADDRESS);

// takes in the address and a callback function
async function findEthBalance() {
  const wei = await web3.eth.getBalance(address, (err, bal) => {
    return bal;
  });
  const eth = web3.utils.fromWei(wei, "ether");
  console.log(eth);
}

async function getContractName() {
  const name = await contract.methods.name().call();
  console.log(name);
}

async function getTotalTokenSupply() {
  const supply = await contract.methods.totalSupply().call();
  console.log(supply);
}
async function getDscBalance() {
  const balance = await contract.methods.balanceOf(address).call();
  console.log("DSC", balance);
}

web3.eth.getBlockNumber(function (error, result) {
  console.log(result);
});

web3.eth.getBlock("latest", function (err, result) {
  console.log(result.hash);
});

// get last 10 block hashes.
// web3.eth.getBlockNumber().then((latest) => {
//   for (i = 0; i < 10; i++) {
//     web3.eth.getBlock(latest - i, function (error, block) {
//       console.log(block.hash);
//     });
//   }
// });

web3.eth.getTransactionFromBlock(
  "0xdfac85b8e912b08b27a86faae3b150f6331a8ebe9f94399c80cd0922bdec0161",
  2,
  function (error, result) {
    console.log(result);
  }
);

findEthBalance();
getContractName();
getTotalTokenSupply();
getDscBalance();
