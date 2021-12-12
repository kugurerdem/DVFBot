const utils = require("./utils.js")

class DVFBot{
    constructor(controller){
        this.controller = controller;
    }

    async tradeMarket(symbol){
        // determine the pair with most money
        const pair_symbols = symbol.split(':');
                
        while(true){
            try{
                const balances = await this.controller.getBalance(...pair_symbols);
                if(parseFloat(balances[pair_symbols[0]]) > parseFloat(balances[pair_symbols[1]]) ){
                    console.log(`${pair_symbols[0]} has more balance` )
                    await this.controller.tradeMarket(symbol, `-${balances[pair_symbols[0]]}`)
                } else{
                    console.log(`${pair_symbols[1]} has more balance` )
                    await this.controller.tradeMarket(symbol, `${balances[pair_symbols[1]]}`)
                }
                console.log("transaction successfull");
            } catch(e){
                console.log("error occured");
            }
            await utils.sleep(5000);
            // delete order if any exists
            
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