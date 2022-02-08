var Web3 = require("web3");

var web3Url = "https://ropsten.infura.io/v3/1e744c5259c740ffb4a4a94b0ac330b8";
var web3 = new Web3(web3Url);

const address = "0x9Bc064652406A164b52B38056bd57808C3F88072";

async function checkTransaction() {
  // search and log the latest block number
  let block = await web3.eth.getBlock("latest");
  console.log(block);
  // ------------------------------ //

  if (block && block.transactions) {
    // looping over the ball transactions in that block
    for (let txHash of block.transactions) {
      console.log("looping");
      let tx = await web3.eth.getTransaction(txHash);
      console.log("tx", tx);
      //is the the recieving field of a tx = the address we tracking?
      if (address === tx.to) {
        console.log("Transaction found on:", block.number);
        console.log({
          address: tx.to,
          value: web3.utils.fromWei(tx.value, "ether"),
          timestamp: new Date(),
        });
      }
    }
  }
}

checkTransaction();
