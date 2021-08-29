import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import StakingInfoBox from '@components/StakingInfoBox';

const StakingInfo = () => {
  return <Grid container>
    <Grid item xs={12}>
      <Typography variant={'h3'} className={'mtb-mt-10 mtb-mb-10'}>Stake</Typography>
    </Grid>
    <StakingInfoBox title={'Stake holders'} value={'123213'}/>
    <StakingInfoBox title={'Total staked'} value={'123213'}/>
    <StakingInfoBox title={'APR'} value={'12%'}/>
  </Grid>;
};

export default StakingInfo;