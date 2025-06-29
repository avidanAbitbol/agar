
import { IncentivSigner, IncentivResolver } from "https://cdn.jsdelivr.net/gh/IncentivNetwork/incentiv-dapp-sdk/incentiv-sdk.min.js";
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";

const Environment = {
  Portal: "https://testnet.incentiv.net",
  RPC: "https://rpc.testnet.incentiv.net"
};

let signer, address;

window.connectWallet = async function () {
  try {
    address = await IncentivResolver.getAccountAddress(Environment.Portal);
    const provider = new ethers.providers.StaticJsonRpcProvider(Environment.RPC);
    signer = new IncentivSigner({ address, provider, environment: Environment.Portal });
    document.getElementById("status").innerText = "Connected: " + address;
  } catch (err) {
    console.error("Connection failed:", err);
    document.getElementById("status").innerText = "Connection failed";
  }
};

window.enterGame = async function () {
  try {
    const userOpHash = await signer.sendTransaction({
      to: "0xdddcb5275f1a8619b87da36d04bc6b019c6c66c7", // Game contract or receiver
      value: ethers.utils.parseEther("0.005"),
      data: "0x"
    });
    document.getElementById("status").innerText = "Transaction sent: " + userOpHash;
    document.getElementById("game").style.display = "block";
  } catch (err) {
    console.error("Transaction failed:", err);
    document.getElementById("status").innerText = "Transaction failed";
  }
};
