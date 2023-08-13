require("@nomicfoundation/hardhat-toolbox");

/**
 * We extracted `URL`, `PRIVATE_KEY` as const variable to set value easily.
 * Set your private key and klaytn node's URL in here.
 */
const PRIVATE_KEY_ACC01 = '3d31f2f1c1de57e57c2830192cfab9032a88ce2ba4601dd307267bdf59be3edf'; // DevAccount01
const PRIVATE_KEY_ACC02 = 'e27f174aa00ec734667e96df5b178e30366b6d9ff194f65ade390d6bb1103561'; // DevAccount02
const PRIVATE_KEY_ACC03 = '1b253680e30916f2e6a1cbec23c6d751e4a1d968e4ffd135c84f315faa776a42'; // DevAccount03

/**
 * Aurora testnet config for testing deployments
 */
const AURORA_TESTNET_URL = `https://testnet.aurora.dev/`;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    aurora: {
      url: AURORA_TESTNET_URL,
      accounts: [PRIVATE_KEY_ACC01] // @TODO: Uses the private key from the .env file
    },
  }
};
