const DVF = require('dvf-client-js');
const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const fs = require('fs');
require('dotenv').config();


(async function(){
    // retreive ETH_PK
    const {ETH_PK, STARK_PK, RPC_URL, API_URL} = process.env;

    // create instances to use DVF library
    const provider = new HDWalletProvider(ETH_PK, RPC_URL);
    const web3 = new Web3(provider);
    provider.engine.stop()

    dvf = await DVF(web3, {
        api: API_URL
    });

    const keyPair = await dvf.stark.createKeyPair(STARK_PK);
    console.log(keyPair.starkPrivateKey);

    const registerResponse = await dvf.register(keyPair.starkPublicKey)
    console.log(registerResponse);
})();