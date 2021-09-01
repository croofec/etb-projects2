import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { useSupportedNetwork } from '@hooks/chain';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useWeb3React } from '@web3-react/core';
import { BEP20Token, ETBStaking } from '@utils/contracts';
import Web3 from 'web3';
import { BigNumber } from 'ethers';
import { ALLOWANCE_MAX } from '@utils/chain';
import { useRouter } from 'next/router';

const Staking = () => {

  const isSupportedNetwork = useSupportedNetwork();

  const [amount, setAmount] = useState(0);

  const { enqueueSnackbar } = useSnackbar();
  const { chainId, account } = useWeb3React();
  const router = useRouter();

  const stakingContract = ETBStaking(chainId);
  const token = BEP20Token(chainId);

  const [balance, setBalance] = useState(0);
  const [stages, setStages] = useState(0);

  useEffect(async () => {
    if (token && stakingContract) {
      const balance = await token.methods.balanceOf(account).call();
      setBalance(Web3.utils.fromWei(String(balance), 'ether'));
      const stageCount = await stakingContract.methods.getStackingStagesLength().call();
      console.log(stageCount);
      setStages(stageCount)
    }

  }, [account, chainId]);

  const handleMax = async () => {
    if (token) {
      const balance = await token.methods.balanceOf(account).call();
      setAmount(Web3.utils.fromWei(String(balance), 'ether'));
    }
  };



  const handleStake = async () => {
    if (stakingContract) {
      try {
        const stageCount = await stakingContract.methods.getStackingStagesLength().call();
        const isAllowed = await token.methods
          .allowance(account, stakingContract._address)
          .call();

        if (BigNumber.from(isAllowed).eq(BigNumber.from(0))) {
          await token.methods.approve(stakingContract._address, ALLOWANCE_MAX).send({
            from: account,
          });
        }

        await stakingContract.methods.stake(
          stageCount - 1,
          Web3.utils.toWei(String(amount), 'ether'),
        ).send({
          from: account,
        });

        router.reload(window.location.pathname);

        setAmount(0);
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

  return <>
    <Grid item xs={12}>
      <Card className={'w-100 mtb-px-30 mtb-py-20 mtb-round-10 p-relative mtb-z-10'} elevation={5}>
        <Grid container spacing={2}>
          <Grid item xs={6} container justifyContent={'flex-end'} className={'mtb-p-15'}>
            <Typography variant={'h7'} paragraph>Your balance:{balance}</Typography>
            <TextField
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              label={'Amount'}
              variant="outlined"
              type="number"
              fullWidth
            />
            <Tooltip title={'Max balance'}>
              <Button
                color="primary"
                variant="contained"
                disableElevation={true}
                size={'small'}
                disabled={!isSupportedNetwork}
                className={'mtb-mt-10'}
                onClick={handleMax}
              >
                Max
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
            <Typography variant={'h6'} paragraph>ETB Staking</Typography>
            <Typography variant={'h7'} paragraph>Get a reward every day</Typography>
            <Typography variant={'h6'} gutterBottom>
              Stake LP Token to Earn ETB
            </Typography>
            <Tooltip title={'Stake tokens'}>
              <Button
                color="primary"
                fullWidth
                variant="contained"
                disabled={!isSupportedNetwork || parseInt(stages) === 0}
                disableElevation={true}
                onClick={handleStake}
              >
                Stake
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  </>;
};

export default Staking;