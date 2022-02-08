var Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;
require("dotenv/config");

var web3Url = "https://ropsten.infura.io/v3/1e744c5259c740ffb4a4a94b0ac330b8";
var web3 = new Web3(web3Url);

var address1 = "0x9Bc064652406A164b52B38056bd57808C3F88072";
const address2 = "0x378bb38127F58b7424dcc55f041F0A395DA84b9c";

// buffer converts key to binary data
const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, "hex");
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, "hex");

// CHECK ACCOUNT BALANCES

web3.eth.getBalance(address1, function (error, result) {
  console.log("account 1 balance", web3.utils.fromWei(result, "ether"));
});
web3.eth.getBalance(address2, function (error, result) {
  console.log("account 2 balance", web3.utils.fromWei(result, "ether"));
});

web3.eth.getTransactionCount(address2, function (error, txCount) {
  // BUILD TX
  // nonce helps with the double spend problem. If new account, nonce value is zero and increases with transactions increasing
  const txobject = {
    nonce: web3.utils.toHex(txCount),
    to: address1,
    value: web3.utils.toHex(web3.utils.toWei("0.2", "ether")),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
  };

  console.log(txobject);

  // SIGN TX with out private key. That private key will already tell who this tx is from
  const tx = new Tx(txobject, { chain: "ropsten" });
  tx.sign(privateKey2);

  const serializedTransaction = tx.serialize();
  const raw = "0x" + serializedTransaction.toString("hex");

  // BROADCAST TX
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash:", txHash);
  });
});
