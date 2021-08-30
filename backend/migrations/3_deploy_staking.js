const BEP20Token = artifacts.require('BEP20Token');
const ETBStaking = artifacts.require('ETBStaking');


module.exports = async function(deployer, network, accounts) {

  const sampleToken = await BEP20Token.deployed();

  await deployer.deploy(ETBStaking,
    sampleToken.address,
    sampleToken.address,
  );
};