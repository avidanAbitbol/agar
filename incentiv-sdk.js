window.IncentivResolver = {
  getAccountAddress: async (url) => {
    return "0xDEMOACCOUNT00000000000000000000000000000000";
  }
};

window.IncentivSigner = class {
  constructor({ address, provider, environment }) {
    this.address = address;
    this.provider = provider;
    this.environment = environment;
  }

  async sendTransaction(tx) {
    console.log("Simulated tx to:", tx.to, "value:", tx.value.toString());
    return "0xSIMULATEDTXHASH";
  }
};
