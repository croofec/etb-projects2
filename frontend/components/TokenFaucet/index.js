import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { useSupportedNetwork } from '@hooks/chain';
import { useSnackbar } from 'notistack';
import { useWeb3React } from '@web3-react/core';
import { BEP20Token, BEP20TokenFaucet } from '@utils/contracts';
import { useRouter } from 'next/router';
import Web3 from 'web3';
import Card from '@material-ui/core/Card';
import { BigNumber } from 'ethers';
import { ALLOWANCE_MAX } from '@utils/chain';
import { selectStakingLoading, setStakingLoading } from '@redux/slices/staking';
import { useDispatch } from 'react-redux';

const TokenFaucetComponent = () => {

  const isSupportedNetwork = useSupportedNetwork();

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const dispatch = useDispatch()

  const [value, setValue] = useState('');

  const { active, chainId, account } = useWeb3React();

  const [balance, setBalance] = useState(0);

  const tokenFaucetContract = BEP20TokenFaucet(chainId);
  const token = BEP20Token(chainId);

  const handleClick = async () => {
    if (tokenFaucetContract) {
      try {
        dispatch(setStakingLoading(true));
        const isAllowed = await token.methods
          .allowance(account, tokenFaucetContract._address)
          .call();

        if (BigNumber.from(isAllowed).eq(BigNumber.from(0))) {
          await token.methods.approve(tokenFaucetContract._address, ALLOWANCE_MAX).send({
            from: account,
          });
        }

        await tokenFaucetContract.methods.faucet(value, Web3.utils.toWei(String(100), 'ether')).send({
          from: account,
        });
        enqueueSnackbar('Success', {
          variant: 'success',
        });
        setValue('');
        dispatch(setStakingLoading(false));
        router.reload(window.location.pathname);
      } catch (e) {
        console.error(e)
        dispatch(setStakingLoading(false));
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

  useEffect(async () => {
    if (tokenFaucetContract) {
      const balance = await tokenFaucetContract.methods.balance().call();
      setBalance(Web3.utils.fromWei(String(balance), 'ether'));
    }
  }, [active, account, chainId]);

  return (
    <Card className={'w-100 mtb-px-30 mtb-py-20 mtb-round-10 p-relative mtb-z-10 mtb-mt-10'} elevation={5}>
      <Grid container justifyContent={'center'} alignItems={'center'}>
        <Grid item xs={12}>
          <Typography component={'h1'} variant={'h3'} className={' mtb-mb-10'}>Faucet</Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField fullWidth label="Receiver Faucet Address" value={value}
                     onChange={(e) => setValue(e.target.value)}
                     variant="outlined"/>
        </Grid>
        <Grid item xs={2} className={'mtb-pl-10 mtb-mb-10'}>
          <Tooltip title={'Set reward token address'}>
            <Button
              color="primary"
              variant="contained"
              disabled={!isSupportedNetwork}
              disableElevation={true}
              className={'mtb-mt-10'}
              size={'medium'}
              onClick={handleClick}
            >
              Send
            </Button>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <Typography variant={'h7'} className={'mtb-mt-10 mtb-mb-10'}>Faucet balance: {balance}</Typography>
        </Grid>
      </Grid>
    </Card>);
};

export default TokenFaucetComponent;