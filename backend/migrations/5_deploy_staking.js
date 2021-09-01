const BEP20Token = artifacts.require('BEP20Token');
const BEP20RewardToken = artifacts.require('BEP20RewardToken');
const ETBStaking = artifacts.require('ETBStaking');


module.exports = async function(deployer, network, accounts) {

  const sampleToken = await BEP20Token.deployed();
  const rewardToken = await BEP20RewardToken.deployed();

  await deployer.deploy(ETBStaking,
    sampleToken.address,
    rewardToken.address,
  );
};