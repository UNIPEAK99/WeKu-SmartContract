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
      host: "localhost", // Connect to geth on the specified
      port: 8545,
      from: "0x83B50968ca759aE17DB0DFC2104eeAEEB7907d0e", // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
      gas: 4612388 // Gas limit used for deploys
    },
    "live": {
      from: "0x103a4547D8aB566C68c26Feea948b3BC125212f1", 
      network_id: 1,
      host: "127.0.0.1",
      port: 8545,   // Different than the default below
      gas: 4612388
    }
  }
};
