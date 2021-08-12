const EthSwap = artifacts.require("EthSwap");
const Token   = artifacts.require("Token");
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm')

module.exports = async function(deployer, network, accounts) {

  // Deploy Dapp Token
  await deployer.deploy(Token);
  const token   = await Token.deployed();

  await deployer.deploy(EthSwap,token.address);
  const ethSwap = await EthSwap.deployed();
  

  // Deploy Mock DAI Token
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  // Deploy TokenFarm
  await deployer.deploy(TokenFarm, token.address, daiToken.address)
  const tokenFarm = await TokenFarm.deployed()
  

  //Transfer all token to EthSwap
  await token.transfer(ethSwap.address,'500000000000000000000000')

  // Transfer 100 Mock DAI tokens to investor
  await daiToken.transfer(accounts[0], '100000000000000000000')

   // Transfer all tokens to TokenFarm (1 million)
   await token.transfer(tokenFarm.address, '500000000000000000000000')
};
