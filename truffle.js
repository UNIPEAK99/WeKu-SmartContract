module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*" // Match any network id
    },
    test: {
      host: "demo.weku.io",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      host: "demo.weku.io", // Connect to geth on the specified
      port: 8545,
      from: "0x461d98d4dc9109a919c56c8f48d4522de9a73a61", // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
      gas: 4612388 // Gas limit used for deploys
    }
  }
};
