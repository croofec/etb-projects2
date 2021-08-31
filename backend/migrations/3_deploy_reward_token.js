const BEP20RewardToken = artifacts.require('BEP20RewardToken');

const tokens = (n) => web3.utils.toWei(String(n), 'ether');

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(BEP20RewardToken, tokens(13000000));
};