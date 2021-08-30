const SampleToken = artifacts.require('SampleToken');

const tokens = (n) => web3.utils.toWei(String(n), 'ether');

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(SampleToken, tokens(13000000));
};