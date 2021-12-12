const utils = require("./utils.js")

class DVFBot{
    constructor(controller){
        this.controller = controller;
    }

    async tradeMarket(symbol){
        // determine the pair with most money
        const pair_symbols = symbol.split(':');
                
        while(true){
            let orderID;
            try{
                const balances = await this.controller.getBalance(...pair_symbols);
                if(parseFloat(balances[pair_symbols[0]]) > parseFloat(balances[pair_symbols[1]]) ){
                    console.log(`${pair_symbols[0]} has more balance` )
                    orderID = await this.controller.tradeMarket(symbol, `-${balances[pair_symbols[0]]}`)
                } else{
                    console.log(`${pair_symbols[1]} has more balance` )
                    orderID = await this.controller.tradeMarket(symbol, `${balances[pair_symbols[1]]}`)
                }
                console.log("order opened");
            } catch(e){
                console.log("error occured");
            }
            await utils.sleep(5000);
            await this.controller.cancelOpenOrders();
        } 
    }

    // method for retreiving data 
    async tradeBetween(symbol, bid, ask){
        // determine the pair with most money
        const pair_symbols = symbol.split(':');        
    }
    // 
}

module.exports = DVFBot;