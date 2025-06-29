import { IncentivSigner, IncentivResolver } from "https://cdn.jsdelivr.net/gh/IncentivNetwork/incentiv-dapp-sdk/dist/incentiv.min.js";
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";

const Environment = {
  Portal: "https://testnet.incentiv.net",
  RPC: "https://rpc.testnet.incentiv.net"
};

let signer;

async function connectWallet() {
  const address = await IncentivResolver.getAccountAddress(Environment.Portal);
  const provider = new ethers.providers.StaticJsonRpcProvider(Environment.RPC);
  signer = new IncentivSigner({
    address,
    provider,
    environment: Environment.Portal
  });

  document.getElementById("status").textContent = "Wallet connected: " + address;
}

async function enterGame() {
  if (!signer) return alert("Connect wallet first");

  const recipient = "0xdddcb5275f1a8619b87da36d04bc6b019c6c66c7";
  const txValue = ethers.utils.parseUnits("0.005", 18);

  try {
    const hash = await signer.sendTransaction({
      to: recipient,
      value: txValue
    });
    document.getElementById("status").textContent = "Payment sent. Hash: " + hash;
    document.getElementById("game").style.display = "block";
  } catch (e) {
    console.error(e);
    alert("Payment failed");
  }
}

// ✅ Connect to global scope
window.connectWallet = connectWallet;
window.enterGame = enterGame;
