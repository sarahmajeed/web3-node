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

const displayEvents = (fromBlock, toBlock, eventName) => {
  // get events from this contract
  contract.getPastEvents(
    eventName,
    {
      fromBlock,
      toBlock,
    },
    (err, events) => {
      console.log(events);
    }
  );
};

displayEvents("11743590", "latest", "Transfer");
