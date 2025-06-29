let signer;

async function connectWallet() {
  const portalUrl = "https://testnet.incentiv.net";
  const rpcUrl = "https://rpc.testnet.incentiv.net";

  const address = await IncentivResolver.getAccountAddress(portalUrl);
  const provider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);

  signer = new IncentivSigner({
    address,
    provider,
    environment: portalUrl
  });

  document.getElementById("status").textContent = "Wallet connected: " + address;
}

async function enterGame() {
  if (!signer) {
    alert("Please connect wallet first!");
    return;
  }

  const tx = {
    to: "0xdddcb5275f1a8619b87da36d04bc6b019c6c66c7",
    value: ethers.utils.parseEther("0.005"),
    data: "0x"
  };

  try {
    const hash = await signer.sendTransaction(tx);
    document.getElementById("status").textContent = "Paid! Starting game...";
    document.getElementById("game").style.display = "block";
  } catch (err) {
    document.getElementById("status").textContent = "Transaction failed.";
    console.error(err);
  }
}
