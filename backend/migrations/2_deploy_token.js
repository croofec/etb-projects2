const BEP20Token = artifacts.require('BEP20Token');

const tokens = (n) => web3.utils.toWei(String(n), 'ether');

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(BEP20Token, tokens(13000000));
};