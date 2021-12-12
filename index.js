const DVFController = require("./DVFController.js")
const DVFBot = require("./DVFBot.js")
require('dotenv').config();

async function main(){
  const controller = new DVFController(process.env);
  await controller.init(process.env);

  const bot = new DVFBot(controller);
  
  // controller.tradeMarket("USDC:USDT", 37);
  await bot.tradeMarket("USDC:USDT", 1, 1);
}
main();

