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
  "0x6cbb50f7c575371dbe085237fc5386b01da5f916be0376a611f70ebc9c4f6ea8";

//return tx fee for a transaction - displayed in eth
// Transaction Fee = gasPrice * gasUsed

function txDetails(hash) {
  web3.eth.getTransactionReceipt(hash, function (error, result) {
    let txFee = result.gasUsed * result.effectiveGasPrice;

    console.log(web3.utils.fromWei(txFee.toString(), "ether"));
  });
}

txDetails(hash);
