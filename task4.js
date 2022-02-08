var Web3 = require("web3");

// IMPORTING ABI
var fs = require("fs");
var jsonFile = "./contracts/dsc.json";
var parsed = JSON.parse(fs.readFileSync(jsonFile));
var abi = parsed.abi;
// --------------- //

var web3Url = "https://ropsten.infura.io/v3/1e744c5259c740ffb4a4a94b0ac330b8";
var web3 = new Web3(
  new Web3.providers.WebsocketProvider(
    "wss://ropsten.infura.io/ws/v3/1e744c5259c740ffb4a4a94b0ac330b8"
  )
);
var DSC_CONTRACT_ADDRESS = "0xF6e13B49600DeF8cd5A1F90681b95Ce02Fb16821";
var contract = new web3.eth.Contract(abi, DSC_CONTRACT_ADDRESS);

let options = {
  fromBlock: 0,
  toBlock: 5,
};

let subscription = web3.eth.subscribe("logs", options, (err, result) => {
  console.log(result);
});

subscription.on("data", (event) => console.log(event));
subscription.on("changed", (changed) => console.log(changed));
subscription.on("error", (err) => {
  throw err;
});
// subscription.on("connected", (nr) => console.log(nr));
// const subscribeToEvents = (fromBlock, toBlock, eventName) => {
//   // subscribe
//   web3.eth.subscribe("logs", (err, result) => {
//     console.log(result);
//   });
// };

// subscribeToEvents();
