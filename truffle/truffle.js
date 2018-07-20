const HDWalletProvider = require('truffle-hdwallet-provider')

const memonic = 'between club cereal pear olive flush crunch alcohol net mom barrel team'

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    networks: {
        development: {
            host: 'localhost',
            port: 7545,
            network_id: '*' // Match any network id
        },
        rinkeby: {
            provider: new HDWalletProvider(memonic, 'https://rinkeby.infura.io'),
            network_id: '*',
            gas: 4500000,
            gasPrice: 1000000000
        }
  }
};
