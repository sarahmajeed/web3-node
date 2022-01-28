var Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;
require("dotenv/config");
// IMPORTING ABI
var fs = require("fs");
var jsonFile = "./contracts/dsc.json";
var parsed = JSON.parse(fs.readFileSync(jsonFile));
var abi = parsed.abi;
// --------------- //

var web3Url = "https://ropsten.infura.io/v3/1e744c5259c740ffb4a4a94b0ac330b8";
var web3 = new Web3(web3Url);

var address1 = "0x9Bc064652406A164b52B38056bd57808C3F88072";
const address2 = "0x378bb38127F58b7424dcc55f041F0A395DA84b9c";
// buffer converts key to binary data
const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, "hex");

var DSC_CONTRACT_ADDRESS = "0xF6e13B49600DeF8cd5A1F90681b95Ce02Fb16821";

var contract = new web3.eth.Contract(abi, DSC_CONTRACT_ADDRESS);

const transferData = contract.methods.transfer(address2, 1000).encodeABI();
const transferFromData = contract.methods
  .transferFrom(address1, address2, 1000)
  .encodeABI();

async function getContractName() {
  const name = await contract.methods.name().call();
  console.log(name);
}

async function getDscBalance() {
  const balance = await contract.methods.balanceOf(address1).call();
  console.log("DSC", balance);
}

// TRANSFER FUNCTION

web3.eth.getTransactionCount(address1, function (error, txCount) {
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(800000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    to: DSC_CONTRACT_ADDRESS,
    data: transferData,
  };

  const tx = new Tx(txObject, { chain: "ropsten" });

  tx.sign(privateKey1);

  const serializedTransaction = tx.serialize();
  const raw = "0x" + serializedTransaction.toString("hex");

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash:", txHash);
  });
});

// TransferFrom Function

// web3.eth.getTransactionCount(address1, function (error, txCount) {
//   const txObject = {
//     nonce: web3.utils.toHex(txCount),
//     gasLimit: web3.utils.toHex(1000000),
//     gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
//     to: DSC_CONTRACT_ADDRESS,
//     data: contract.methods.approve(address2, 1000).call(),
//   };

//   const tx = new Tx(txObject, { chain: "ropsten" });

//   tx.sign(privateKey1);

//   const serializedTransaction = tx.serialize();
//   const raw = "0x" + serializedTransaction.toString("hex");

//   web3.eth.sendSignedTransaction(raw, (err, txHash) => {
//     console.log("txHash:", txHash);
//   });
// });

const transferFrom = async () => {
  try {
    // console.log(web3.utils.fromWei("100000000000000"));
    const allow = await contract.methods
      .allowance(address1, address2)
      .call(function (err, res) {
        if (err) {
          console.log("An error occured in allownace", err);
          return;
        }
        console.log("Allowance amount ", res);
      });

    if (!Number(allow)) {
      await contract.methods
        .approve(address1, web3.utils.toWei("1000000000000000000"))
        .send({ from: user.address, gasLimit: "86000" }, function (err, res) {
          if (err) {
            console.log("An error occured in approve", err);
            return;
          }
          console.log("Hash of the  approve transaction: ", res);
        });
    }

    await erc20Token.methods
      .transferFrom(address1, address2, "100000000000000")
      .send({ from: user.address, gasLimit: "96000" }, function (err, res) {
        if (err) {
          console.log("An error occured in tf", err);
          return;
        }
        console.log("Hash of the transferFrommm transaction: ", res);
      });
  } catch (e) {
    console.log("Error in catch block", e);
  }
};

getDscBalance();
