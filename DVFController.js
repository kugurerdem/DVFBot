const DVF = require('dvf-client-js');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("Web3");

class DVF_Controller{
    async init(object){
        const {ETH_PK, STARK_PK, API_URL, RPC_URL} = object;
        this.starkPrivateKey = STARK_PK;
        
        const provider = new HDWalletProvider(ETH_PK, RPC_URL);
        const web3 = new Web3(provider);
        provider.engine.stop()

        this.dvf = await DVF(web3, {
            api: API_URL
        });
    }

    async tradeLimit(symbol, amount, price){
        const order = await this._sign({
            symbol, 
            amount, 
            starkPrivateKey: this.starkPrivateKey,
            price
        })

        const orderId = await this.dvf.submitOrder(order); 
        console.log(orderId);
    }

    async orderBookData(symbol){
        const tickers = await this.dvf.getTickers(symbol);
        return this._orderBookPrice(tickers);
    }

    // price of the highest bid
    async orderBookBid(symbol){
        try{
            const data = await this.orderBookData(symbol);
            if(!data.length || !data[1]){
                console.log("Error getting highest bid from the api")
                return null;
            }
            return data[1];
        } catch(e){
            return null;
        }
    }

    // price of the lowest ask
    async orderBookAsk(symbol){
        try{
            const data = await this.orderBookData(symbol);
            if(!data.length || !data[3]){
                console.log("Error getting lowest ask from the api")
                return null;
            }
            return data[3];
        } catch(e){
            return null;
        }
    }

    _orderBookPrice(data = []){
        try {
            if (!data.length || !data[0] ) {
                console.log("Error getting order book from api")
                return null;
            }
            return data[0]
        } catch (e) {
            return null
        }
    }

    // this is needs to be improved
    async tradeMarket(symbol, amount){
        let price;
        if(amount > 0){
            price = await this.orderBookAsk(symbol);
        } else{
            price = await this.orderBookBid(symbol);
        }

        return await this.tradeLimit(symbol, amount, price);
    }

    /**
     * @param symbols - array of symbols (like ['USDT', 'USDC', 'BTC'])
     */
    async getBalance(...symbols){
        const balance = await this.dvf.getBalance();
        let result = {};
        for(let symbol of symbols){
            let obj = balance.find(element => element.token === symbol);
            result[symbol] = obj ? parseFloat(obj.balance) / Math.pow(10, 6) : 0;
        }
        
        return result;
    }

    // signs the object
    async _sign(obj){
        const nonce = (Date.now() / 1000).toString()
        const signature = await this.dvf.sign(nonce)

        return Object.assign(obj, {nonce, signature})
    }
}

module.exports = DVF_Controller;