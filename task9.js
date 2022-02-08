// Create a function that takes tx-hash as input and outputs whether the transaction is confirmed or failed, if confirmed display the amount of tx_fees incurred.
var Web3 = require("web3");

// IMPORTING ABI
var fs = require("fs");
var jsonFile = "./contracts/dsc.json";
var parsed = JSON.parse(fs.readFileSync(jsonFile));
var abi = parsed.abi;
// --------------- //

var address1 = "0x9Bc064652406A164b52B38056bd57808C3F88072";
const address2 = "0x378bb38127F58b7424dcc55f041F0A395DA84b9c";

var web3Url = "https://ropsten.infura.io/v3/1e744c5259c740ffb4a4a94b0ac330b8";
var web3 = new Web3(web3Url);
var web3ws = new Web3(
  new Web3.providers.WebsocketProvider(
    "wss://ropsten.infura.io/ws/v3/1e744c5259c740ffb4a4a94b0ac330b8"
  )
);
var DSC_CONTRACT_ADDRESS = "0xF6e13B49600DeF8cd5A1F90681b95Ce02Fb16821";
var contract = new web3ws.eth.Contract(
  abi,
  DSC_CONTRACT_ADDRESS,
  (error, result) => {
    if (error) console.log(error);
  }
);

const options = {
  fromBlock: "latest",
};

contract.events
  .Transfer({ options })
  .on("data", (event) => {
    console.log(event);
  })
  .on("error", console.error);
