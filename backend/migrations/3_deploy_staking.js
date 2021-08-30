const SampleToken = artifacts.require('SampleToken');
const ETBStaking = artifacts.require('ETBStaking');


module.exports = async function(deployer, network, accounts) {

  const sampleToken = await SampleToken.deployed();

  await deployer.deploy(ETBStaking,
    sampleToken.address,
    sampleToken.address,
  );
};