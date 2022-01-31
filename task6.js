// Create a function that takes tx-hash as input and outputs whether the transaction is confirmed or failed, if confirmed display the amount of tx_fees incurred.
var Web3 = require("web3");

// IMPORTING ABI
var fs = require("fs");
var jsonFile = "./contracts/dsc.json";
var parsed = JSON.parse(fs.readFileSync(jsonFile));
var abi = parsed.abi;
// --------------- //

var web3Url = "https://ropsten.infura.io/v3/1e744c5259c740ffb4a4a94b0ac330b8";
var web3 = new Web3(web3Url);
var DSC_CONTRACT_ADDRESS = "0xF6e13B49600DeF8cd5A1F90681b95Ce02Fb16821";
var contract = new web3.eth.Contract(abi, DSC_CONTRACT_ADDRESS);

const hash =
  "0x2b2a95371cd721a03da2c0b50feb05a10ee327b1af85d7f57b1a199cefcd94b4";

//return tx fee for a transaction - displayed in eth
// Transaction Fee = gasPrice * gasUsed

function txDetails(hash) {
  //requires the block number for which we need the details
  web3.eth.getTransaction(hash, function (error, result) {
    let input_data = "0x" + result.input.slice(10);
    let params = web3.eth.abi.decodeParameters(
      ["address", "uint256"],
      input_data
    );

    console.log("value:", params[1]);
    console.log("Reciever:", params[0]);
    console.log("Sender:", result.from);
  });
}

txDetails(hash);
