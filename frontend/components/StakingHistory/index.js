import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StakingHistoryItem from '@components/StakingHistoryItem';

const StakingHistory = () => {
  return <Grid container>
    <Grid item xs={12} className={'mtb-mt-25'}>
      <Typography component={'h1'} variant={'h3'} className={'mtb-mt-10 mtb-mb-10'}>Staking history</Typography>
    </Grid>
    <StakingHistoryItem/>
    <StakingHistoryItem/>
    <StakingHistoryItem/>
  </Grid>;
};

export default StakingHistory;