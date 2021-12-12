# DVFBot

A bot for designed to benefit from the reward program of DeversiFi

[explain what does it do]

# Setup

- In order to start the bot, you need to know your Ethereum private key and its corresponding stark private key.
- Create a .env folder and put the following info in the directory of DVFBot.
  ```
  ETH_PK=your_private_key
  STARK_PK=your_stark_pk
  API_URL=https://api.deversifi.com
  RPC_URL=https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161
  ```
- You also need the npm package manager installed on your computer.

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
