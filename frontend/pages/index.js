import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(() => ({
  content: {
    marginTop: '80px',
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color:'#ffffff !important'
  },
}));

const Index = () => {

  const classes = useStyles();

  return (<Container maxWidth="xl">
    <div className={classes.root}>
      <AppBar elevation={2} style={{ backgroundColor: '#54595F'}}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img src={'/etb-logo.png'} height={'25px'}/><span className={'mtb-pl-20'}>Token Staking</span>
          </Typography>
          <Tooltip title={'Connect with Metamask'}><Button startIcon={<img height={'25px'} src={'/mm.png'} />} color="inherit" color="primary" variant="contained">Connect wallet</Button></Tooltip>
        </Toolbar>
      </AppBar>
    </div>
    <Grid container className={classes.content}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '20px 20px' }}>
        <Container maxWidth="sm">
          <Grid container>
            <Grid item xs={12}>
              <Typography variant={'h3'} className={'mtb-mt-10 mtb-mb-10'}>Stake</Typography>
            </Grid>
            <Grid xs={4} className={'mtb-p-10 mtb-pl-none'}>
              <Card className={clsx('p-align-center', 'mtb-p-10', 'mtb-round-10', 'mtb-z-10')}>
                <Typography variant={'h5'} paragraph>Stake holder</Typography>
                <Typography variant={'h6'} paragraph>123213</Typography>
              </Card>
            </Grid>
            <Grid xs={4} className={'mtb-p-10'}>
              <Card className={clsx('p-align-center', 'mtb-p-10', 'mtb-round-10', 'mtb-z-10')}>
                <Typography variant={'h5'} paragraph>Total staked</Typography>
                <Typography variant={'h6'} paragraph>12321321.02</Typography>
              </Card>
            </Grid>
            <Grid xs={4} className={'mtb-p-10 mtb-pr-none'}>
              <Card className={clsx('p-align-center', 'mtb-p-10', 'mtb-round-10', 'mtb-z-10')}>
                <Typography variant={'h5'} paragraph>APR</Typography>
                <Typography variant={'h6'} paragraph>12%</Typography>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Alert severity="error">Token isn&apos;t supported by Ramp</Alert>
            </Grid>
            <Grid item xs={12}>
              <Card className={'w-100 mtb-px-30 mtb-py-20 mtb-round-10 p-relative mtb-z-10'} elevation={5}>
                <Grid container spacing={2}>
                  <Grid item xs={6} container justifyContent={'flex-end'} className={'mtb-p-15'}>
                    <Typography variant={'h8'} paragraph>Your balance:1232 LP</Typography>
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
                        disableElevation={true}
                      >
                        Stake
                      </Button>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} className={'mtb-mt-25'}>
              <Typography component={'h1'} variant={'h3'} className={'mtb-mt-10 mtb-mb-10'}>Staking history</Typography>
            </Grid>
            <Grid item xs={12} className={'mtb-mb-10'}>
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
            <Grid item xs={12}>
              <Card className={'d-flex mtb-p-10 p-align-center'}>
                <Grid container alignItems={'center'}>
                  <Grid item xs={2}>2. Phase: 1</Grid>
                  <Grid item xs={2}>2021-01-02</Grid>
                  <Grid item xs={2}>Token: 100</Grid>
                  <Grid item xs={2}>Reward: 0.94ETB</Grid>
                  <Grid item xs={2}>Active</Grid>
                  <Grid item xs={2} className={'p-align-right '}>
                    <Tooltip title={'Withdraw Reward'}>
                      <Button
                        color="primary"
                        variant="contained"
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
          </Grid>
        </Container>
      </div>
    </Grid>
  </Container>);
};

export default Index;