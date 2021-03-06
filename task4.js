var Web3 = require("web3");
require("dotenv/config");

var web3Url = "https://ropsten.infura.io/v3/1e744c5259c740ffb4a4a94b0ac330b8";
var web3ws = new Web3(
  new Web3.providers.WebsocketProvider(
    "wss://ropsten.infura.io/ws/v3/1e744c5259c740ffb4a4a94b0ac330b8"
  )
);
var web3 = new Web3(web3Url);

const address1 = "0x9Bc064652406A164b52B38056bd57808C3F88072";
const address2 = "0x378bb38127F58b7424dcc55f041F0A395DA84b9c";

function watchTransactions(topic) {
  console.log("Watching all pending Transactions");
  var subscription = web3ws.eth.subscribe(topic, (err, result) => {
    if (err) console.log(err);
  });

  subscription.on("data", (txHash) => {
    console.log("subscribing....");
    setTimeout(async () => {
      console.log(txHash);
    }, 1);
  });
}

watchTransactions("pendingTransactions");
