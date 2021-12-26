# DVFBot

A bot for designed to benefit from the reward program of DeversiFi.

DeversiFi, which is a Layer2 exchange platform based on StarkEx technology, launched a [reward program](https://deversifi.com/blog/trading-rewards-programme/) in order to increase trading activity on their platform. Total amount of 25000 DVF were being distributed to the users of the application based on their trading fee on a weekly basis. This bot was designed so that it benefits from the rewards program by automatically market making to burn money to fees without being bankrupt against slippage.

---

**IMPORTANT NOTE**
This bot is not profitable anymore as the DeversiFi team removed the stablecoin pairs from their reward programme. However this bot would have worked for 3 weeks if you have used it as they have launched their programme.

---

# Setup

- In order to start the bot, you need to know your Ethereum private key and its corresponding stark private key.
- Create a .env file in the folder and put the following info in the directory of DVFBot.
  ```
  ETH_PK=your_private_key
  STARK_PK=your_stark_pk
  API_URL=https://api.deversifi.com
  RPC_URL=https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161
  ```
- You also need the npm package manager installed on your computer. Then, in the DVFBot folder run the following command:
  ```
  npm install
  ```
- If you do not have any clue about what your stark_pk is and how to find it, I reccomend you to create another account by first filling the ETH_PK and STARK_PK properties in the .env file and then calling the following command from the console:

  ```
  npm run register
  ```

- After you have registered your account you can start the program by:
  ```
  npm start
  ```

# Warning

- You need USDC or USDT on you DeversiFi account to run the program
- If you want to use the DeversiFi app from their official website with the account we have created here, don't forget to call the following code from the console:
  ```
  localStorage.setItem('dtk-<ethAddressLowerCase>', '<yourStarkPrivateKeyHere>')
  ```

# Potential Risks

There are two main risks regarding to profitability of this bot. The first one is the price of DVF and the second one is the possible sudden increasement that can occur in the total volume on the platform (which would decrease your share on the rewards).

You should also be cautious about the slippage according to your expected profibality rate (the ratio of slippage/fee paid should not exceet profibality rate).

# Log

- 06.12.2021, if I have runned the bot this week, it would have profitability ratio around x2 or x2.5 (I did not write the bot then because I thought everyone would already create big volumes to benefit from rewards programme which would result in an unprofitable situation).
- 13.12.2021, burned 1600 USDT to the fees, retreived 1920 USDT. Profitability ratio is %20.
- 20.12.2021, burned 1500 USDT to the fees, retreived 1900 USDT. Profitability ratio is %26.6.
