const EtbStaking = artifacts.require('ETBStaking');
const Bep20Token = artifacts.require('BEP20Token');
const Bep20RewardToken = artifacts.require('BEP20RewardToken');

const Web3Utils = require('web3-utils');

const { time } = require('@openzeppelin/test-helpers');

contract('ETBStaking', function(accounts) {

  const [owner, user1, user2, user3] = accounts;

  let staking;
  let payToken;
  let rewardToken;

  let startTime = Number();
  let day = Number(time.duration.days(1));
  let second = Number(time.duration.seconds(1));

  before(async function() {
    payToken = await Bep20Token.new(Web3Utils.toWei(String(100000), 'ether'), { from: owner });
    rewardToken = await Bep20RewardToken.new(Web3Utils.toWei(String(100000), 'ether'), { from: owner });
    staking = await EtbStaking.new(payToken.address, rewardToken.address, { from: owner });

    await payToken.approve(staking.address, Web3Utils.toWei(String(100000), 'ether'), { from: owner });
    await rewardToken.approve(staking.address, Web3Utils.toWei(String(100000), 'ether'), { from: owner });

    await payToken.transfer(user1, Web3Utils.toWei(String(100), 'ether'));
    await payToken.transfer(user2, Web3Utils.toWei(String(100), 'ether'));
    await payToken.transfer(user3, Web3Utils.toWei(String(100), 'ether'));

    startTime = Number(await time.latest());
  });

  describe('add:', () => {
    it('create a new stage', async () => {
      await staking.addStakeStage(
        Web3Utils.toWei(String(30 * 100), 'ether'),
        startTime,
        startTime + (30 * day),
        { from: owner },
      );

      let stages = await staking.getStackingStagesLength();
      assert.equal(stages, 1, 'Should be add stage 1');

      const stageData = await staking.getStackingStage(0);
      assert.equal(stageData[5], Web3Utils.toWei(String(30 * 100), 'ether'), 'Balance should be 3000');
      assert.equal(stageData[6], Web3Utils.toWei(String(100), 'ether'), 'Reward per day should be 100');
    });
    it('stake token by user1', async () => {
      let stages = await staking.getStackingStagesLength();
      assert.equal(stages, 1, 'Should be add stage 1');

      //next block
      await time.increase(second);
      await payToken.approve(staking.address, Web3Utils.toWei(String(100), 'ether'), { from: user1 });
      await staking.stake(0, Web3Utils.toWei(String(100)), { from: user1 });
      //
      const stageData = await staking.getStackingStage(0);
      assert.equal(stageData[4], 1, '1 stake holder');
    });

    it('stake token by user2', async () => {
      //next block
      await time.increase(second);
      await payToken.approve(staking.address, Web3Utils.toWei(String(100), 'ether'), { from: user2 });
      await staking.stake(0, Web3Utils.toWei(String(100)), { from: user2 });
      //
      const stageData = await staking.getStackingStage(0);
      assert.equal(stageData[4], 2, '2 stake holder');
    });

    it('ten days after - rewards', async () => {
      await time.increase(10 * day);
      const reward1 = await staking.getReward(0, user1);
      const reward2 = await staking.getReward(0, user2);
      assert.equal(Web3Utils.fromWei(reward1), 500, '2 stake holder');
      assert.equal(Web3Utils.fromWei(reward2), 500, '2 stake holder');
    });

    it('withdraw', async () => {
      await time.increase(second);
      await staking.withdraw(0, { from: user1 });

      const balanceUser1 = await payToken.balanceOf(user1, { from: user1 });
      const balanceRewardUser1 = await rewardToken.balanceOf(user1, { from: user1 });

      assert.equal(Web3Utils.fromWei(balanceUser1), 100, 'back 100');
      assert.equal(Web3Utils.fromWei(balanceRewardUser1), 500, 'reward 500');
    });
  });

});