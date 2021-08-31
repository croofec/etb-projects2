import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { useSupportedNetwork } from '@hooks/chain';

const Staking = () => {

  const isSupportedNetwork = useSupportedNetwork();

  return <>
    <Grid item xs={12}>
      <Alert severity="error">Token isn&apos;t supported by Ramp</Alert>
    </Grid>
    <Grid item xs={12}>
      <Card className={'w-100 mtb-px-30 mtb-py-20 mtb-round-10 p-relative mtb-z-10'} elevation={5}>
        <Grid container spacing={2}>
          <Grid item xs={6} container justifyContent={'flex-end'} className={'mtb-p-15'}>
            <Typography variant={'h7'} paragraph>Your balance:1232 LP</Typography>
            <TextField
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              value={0}
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
                disabled={!isSupportedNetwork}
                disableElevation={true}
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