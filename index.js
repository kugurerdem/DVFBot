const DVFController = require("./DVFController.js")
const DVFBot = require("./DVFBot.js")
require('dotenv').config();

async function main(){
  const controller = new DVFController(process.env);
  await controller.init(process.env);

  const bot = new DVFBot(controller);
  
  // bot.tradeMarket("USDC:USDT");
  bot.tradeBetween("USDC:USDT", 0.9999, 0.999);
  bot.automatedMarketMaking("USDC:USDT");
  bot.sellDVF();
}

main();