import Web3 from "web3";
let mainNet;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    mainNet = new Web3(window.web3.currentProvider);
}
else {
    const provider = new Web3.providers.HttpProvider(
        'https://mainnet.infura.io/jPiJrcWGbsmizzEQTGeZ'
    );

    mainNet = new Web3(provider);
}

export default mainNet;
