const utils = require("./utils.js")

class DVFBot{
    constructor(controller){
        this.controller = controller;
    }

    /**
     * @param {String} symbol - symbol of the pair
     * @returns {Array} symbol and the amount (either negative or positive)
     */
    async sellHighestBalance(symbol){
        // determine the pair with most money
        const pair_symbols = symbol.split(':');
        try{
            const balances = await this.controller.getBalance(...pair_symbols);
            if(parseFloat(balances[pair_symbols[0]]) > parseFloat(balances[pair_symbols[1]]) ){
                return [symbol, `-${balances[pair_symbols[0]]}`];
            } else{
                return [symbol, `${balances[pair_symbols[1]]}`];
            }
        } catch(e){
            console.log("error occured on determining token with highest balance", e);
            return -1;
        }
    }

    async tradeMarket(symbol){
        while(true){
            try{
                let args = await this.sellHighestBalance(symbol);
                await this.controller.tradeMarket(...args);
            } finally{
                await utils.sleep(5000);
                await this.controller.cancelOpenOrders();
            }
        } 
    }

    // method for retreiving data 
    async tradeBetween(symbol, buyPrice, sellPrice){
        while(true){
            try{
                let args = await this.sellHighestBalance(symbol);
                await this.controller.tradeLimit(...args, args[1][0] == '-' ? sellPrice : buyPrice);
            } finally{
                await utils.sleep(5000);
            }
        }
    }

    async automatedMarketMaking(symbol){
        
    }
}

module.exports = DVFBot;