import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { useSupportedNetwork } from '@hooks/chain';

const StakingHistoryItem = () =>{

  const isSupportedNetwork = useSupportedNetwork();

  return <Grid item xs={12} className={'mtb-mb-10'}>
    <Card className={'d-flex mtb-p-10 p-align-center'}>
      <Grid container alignItems={'center'}>
        <Grid item xs={2}>1. Phase: 1</Grid>
        <Grid item xs={2}>2021-01-01</Grid>
        <Grid item xs={2}>Token: 100</Grid>
        <Grid item xs={2}>Reward: 0.94ETB</Grid>
        <Grid item xs={2}>Active</Grid>
        <Grid item xs={2} className={'p-align-right '}>
          <Tooltip title={'Withdraw Reward'}>
            <Button
              color="primary"
              variant="contained"
              disabled={!isSupportedNetwork}
              disableElevation={true}
              size={'small'}
            >
              Withdraw
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Card>
  </Grid>
};
export default StakingHistoryItem