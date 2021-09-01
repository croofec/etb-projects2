import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { useSupportedNetwork } from '@hooks/chain';
import { useSnackbar } from 'notistack';
import { useWeb3React } from '@web3-react/core';
import { ETBStaking } from '@utils/contracts';
import { useRouter } from 'next/router';
import { selectStakingLoading, setStakingLoading } from '@redux/slices/staking';
import { useDispatch } from 'react-redux';

const StakingHistoryItem = ({ data }) => {

  const isSupportedNetwork = useSupportedNetwork();

  const { enqueueSnackbar } = useSnackbar();
  const { chainId, account } = useWeb3React();
  const dispatch = useDispatch();
  const route = useRouter();

  const stakingContract = ETBStaking(chainId);

  const handleWithdraw = async () => {
    if (stakingContract) {
      try {
        dispatch(setStakingLoading(true));
        await stakingContract.methods.withdraw(data.stage).send({
          from: account,
        });
        enqueueSnackbar('Success', {
          variant: 'success',
        });
        dispatch(setStakingLoading(false));
        route.reload(window.location.pathname);
      } catch (e) {
        console.error(e);
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

  return <Grid item xs={12} className={'mtb-mb-10'}>
    <Card className={'d-flex mtb-p-10 p-align-center'}>
      <Grid container alignItems={'center'}>
        <Grid item xs={2}>1. Phase: {data.stage + 1}</Grid>
        <Grid item xs={2}>{data.date}</Grid>
        <Grid item xs={3}>Token: {data.value}</Grid>
        <Grid item xs={3}>Reward: {data.reward}</Grid>
        <Grid item xs={2} className={'p-align-right '}>
          <Tooltip title={'Withdraw Reward'}>
            <Button
              color="primary"
              variant="contained"
              disabled={!isSupportedNetwork}
              disableElevation={true}
              size={'small'}
              onClick={handleWithdraw}
            >
              Withdraw
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Card>
  </Grid>;
};
export default StakingHistoryItem;