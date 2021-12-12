const utils = require("./utils.js")

class DVFBot{
    constructor(controller){
        this.controller = controller;
        this.sleepTime = 2500;
        this.buyPrice;
        this.sellPrice;
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
                console.log("Order opend");
            } catch(e){
                // something
            }
            finally{
                await utils.sleep(this.sleepTime);
                await this.controller.cancelOpenOrders();
            }
        } 
    }

    // method for retreiving data 
    async tradeBetween(symbol, buyPrice, sellPrice){
        this.buyPrice = buyPrice;
        this.sellPrice = sellPrice;
        while(true){
            await this._tradeBetween(symbol);
        }
    }

    async _tradeBetween(symbol){
        try{
            let args = await this.sellHighestBalance(symbol);
            await this.controller.tradeLimit(...args, args[1][0] == '-' ? this.sellPrice : this.buyPrice);
            console.log("Order opened");
        } catch(e){
            // something
        } finally{
            await utils.sleep(this.sleepTime);
        }
    }

    async automatedMarketMaking(symbol, sleepT = 10000){
        while(true){
            let cancel = false;
            try{
                // get best bid and ask
                let [bid, ask] = await Promise.all([this.controller.orderBookBid(symbol),
                    this.controller.orderBookAsk(symbol)]);
                cancel = this.sellPrice > ask || this.buyPrice < bid; 
                
                // calculate the difference 
                let diff = ask - bid;
                console.log(`difference between bid and ask prices: ${diff}`);
    
                // increase bid, decrease ask, update buyPrice and sellPrice
                this.buyPrice = bid + diff * 0.5;
                this.sellPrice = ask - diff * 0.5;
    
                console.log(`ask & bid prices updated \r\n bid price: ${this.buyPrice} \r\n sell price: ${this.sellPrice}`);
            } catch(e){
                console.log("Error occured during calculating slippage");
            } finally{
                if(cancel){
                    await this.controller.cancelOpenOrders();
                }
                await utils.sleep(this.sleepTime);
            }
        }
    }
}

module.exports = DVFBot;