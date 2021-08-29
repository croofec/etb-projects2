import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const StakingInfoBox = ({title, value}) => {
  return <Grid xs={4} className={'mtb-p-10 mtb-pl-none'}>
    <Card className={clsx('p-align-center', 'mtb-p-10', 'mtb-round-10', 'mtb-z-10')}>
      <Typography variant={'h5'} paragraph>{title}</Typography>
      <Typography variant={'h6'} paragraph>{value}</Typography>
    </Card>
  </Grid>
};

export default StakingInfoBox;