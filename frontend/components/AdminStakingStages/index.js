import Web3 from 'web3';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment-timezone';
import { useSupportedNetwork } from '@hooks/chain';
import { useSnackbar } from 'notistack';
import { useWeb3React } from '@web3-react/core';
import { BEP20RewardToken, ETBStaking } from '@utils/contracts';
import { ALLOWANCE_MAX } from '@utils/chain';
import { BigNumber } from 'ethers';

const AdminStakingStages = () => {

  const isSupportedNetwork = useSupportedNetwork();

  const [reward, setReward] = useState(1000);
  const [startDate, setStartDate] = useState(moment().add(0, 'days').startOf('day').toDate());
  const [endDate, setEndDate] = useState(moment().add(30, 'days').startOf('day').toDate());
  const [duration, setDuration] = useState(0);
  const [stages, setStages] = useState([]);

  const { enqueueSnackbar } = useSnackbar();
  const { chainId, account, active } = useWeb3React();

  const stakingContract = ETBStaking(chainId);
  const rewardToken = BEP20RewardToken(chainId);


  useEffect(() => {
    const s = moment(startDate);
    const e = moment(endDate);
    setDuration(e.diff(s, 'days'));
  }, [startDate, endDate]);

  useEffect(async () => {
    if (active && chainId) {
      const stageCount = await stakingContract.methods.getStackingStagesLength().call();
      const results = [];
      for (let i = stageCount; i > 0; i--) {
        const stage = await stakingContract.methods.getStackingStage(i - 1).call();
        results.push({
          stage: i,
          reward: Web3.utils.fromWei(String(stage[0]), 'ether'),
          startDate: moment.utc(stage[1] * 1000).format('yyyy-MM-DD'),
          endDate: moment.utc(stage[2] * 1000).format('yyyy-MM-DD'),
          tokens: Web3.utils.fromWei(String(stage[3]), 'ether'),
          holders: stage[4],
        });
      }
      setStages(results);
    }
  }, [active, chainId]);


  const handleSet = async () => {
    if (stakingContract) {
      try {

        const isAllowed = await rewardToken.methods
          .allowance(account, stakingContract._address)
          .call();

        if (BigNumber.from(isAllowed).eq(BigNumber.from(0))) {
          await rewardToken.methods.approve(stakingContract._address, ALLOWANCE_MAX).send({
            from: account,
          });
        }

        await stakingContract.methods.addStakeStage(
          Web3.utils.toWei(String(reward), 'ether'),
          moment(startDate).unix(),
          moment(endDate).unix(),
        ).send({
          from: account,
        });
        setStages([{
          stage: stages.length + 1,
          reward: reward,
          startDate: moment.utc(startDate).format('yyyy-MM-DD'),
          endDate: moment.utc(endDate).format('yyyy-MM-DD'),
          holders: 0,
          tokens: 0,
        }, ...stages]);
        enqueueSnackbar('Success', {
          variant: 'success',
        });
      } catch (e) {
        enqueueSnackbar(e.message, {
          variant: 'error',
        });
      }
    } else {
      enqueueSnackbar('Not found deployed contract', {
        variant: 'error',
      });
    }
  };

  return <Card className={'w-100 mtb-px-30 mtb-py-20 mtb-round-10 p-relative mtb-z-10 mtb-my-10'} elevation={5}>
    <Grid container spacing={2}>
      <Grid item xs={12} container justifyContent={'flex-start'}>
        <Typography variant={'h5'} paragraph>Staking Stages</Typography>
      </Grid>
      <Grid item xs={3}>
        <KeyboardDatePicker
          margin="normal"
          label="Start date"
          format="yyyy-MM-DD"
          value={startDate}
          onChange={(date) => setStartDate(date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <KeyboardDatePicker
          margin="normal"
          label="End date"
          format="yyyy-MM-DD"
          value={endDate}
          onChange={(date) => setEndDate(date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField fullWidth label="Reward Value" value={reward} onChange={(e) => setReward(e.value)} variant="outlined"/>
        <Typography variant={'h7'}>{`Duration ${duration} days`}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Tooltip title={'Add stage staking'}>
          <Button
            color="primary"
            variant="contained"
            disableElevation={true}
            disabled={!isSupportedNetwork}
            className={'mtb-mt-10'}
            size={'medium'}
            onClick={handleSet}
          >
            Add
          </Button>
        </Tooltip>
      </Grid>
      <Grid item xs={12} container justifyContent={'flex-start'}>
        <Typography variant={'h5'} paragraph>History Stages</Typography>
      </Grid>
      <Grid item xs={12} container justifyContent={'flex-start'}>
        {
          stages.map((stage, i) => {
            return <Grid key={i} container spacing={4}>
              <Grid item xs={1}>s{stage.stage}.</Grid>
              <Grid item xs={3}>reward: {stage.reward}</Grid>
              <Grid item xs={3}>from: {stage.startDate}</Grid>
              <Grid item xs={2}>to: {stage.endDate}</Grid>
              <Grid item xs={1}>hold:{stage.holders}</Grid>
              <Grid item xs={2}>value: {stage.tokens}</Grid>
            </Grid>;
          })
        }
      </Grid>
    </Grid>
  </Card>;

};
export default AdminStakingStages;