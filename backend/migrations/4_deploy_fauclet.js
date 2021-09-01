const BEP20Token = artifacts.require('BEP20Token');
const BEP20TokenFaucet = artifacts.require('BEP20TokenFaucet');

const tokens = (n) => web3.utils.toWei(String(n), 'ether');

module.exports = async function(deployer, network, accounts) {

  const sampleToken = await BEP20Token.deployed();

  await deployer.deploy(BEP20TokenFaucet,
    sampleToken.address
  );

  const faucet = await BEP20TokenFaucet.deployed();
  await sampleToken.approve(faucet.address, tokens(10000000));
  await faucet.recharge(tokens(10000000))
};