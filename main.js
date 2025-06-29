import { IncentivSigner, IncentivResolver } from "https://cdn.jsdelivr.net/gh/IncentivNetwork/incentiv-dapp-sdk/dist/index.module.js";

let address, signer, provider;

const ENV = {
  Portal: "https://testnet.incentiv.net",
  RPC: "https://rpc.testnet.incentiv.net"
};

window.connectWallet = async function () {
  try {
    address = await IncentivResolver.getAccountAddress(ENV.Portal);
    provider = new ethers.providers.StaticJsonRpcProvider(ENV.RPC);
    signer = new IncentivSigner({ address, provider, environment: ENV.Portal });
    document.getElementById("status").innerText = "Wallet connected: " + address;
  } catch (e) {
    document.getElementById("status").innerText = "Connection failed.";
    console.error(e);
  }
};

window.enterGame = async function () {
  if (!signer) return alert("Connect wallet first");

  const to = "0xdddcb5275f1a8619b87da36d04bc6b019c6c66c7";
  const value = ethers.utils.parseEther("0.005");

  try {
    document.getElementById("status").innerText = "Sending entry fee...";
    const tx = await signer.sendTransaction({ to, value });
    document.getElementById("status").innerText = "Entry sent! Hash: " + tx.hash;
    startGame();
  } catch (e) {
    document.getElementById("status").innerText = "Transaction failed.";
    console.error(e);
  }
};

function startGame() {
  document.getElementById("game").style.display = "block";
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  let x = 300, y = 200;

  document.onkeydown = function(e) {
    if (e.key === "ArrowUp") y -= 5;
    if (e.key === "ArrowDown") y += 5;
    if (e.key === "ArrowLeft") x -= 5;
    if (e.key === "ArrowRight") x += 5;
  };

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#0f0";
    ctx.fill();
    requestAnimationFrame(loop);
  }
  loop();
}