import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

const AdminNewOwner = () => {
  return (
    <Card className={'w-100 mtb-px-30 mtb-py-20 mtb-round-10 p-relative mtb-z-10 mtb-my-10'} elevation={5}>
      <Grid container spacing={2}>
        <Grid item xs={12} container justifyContent={'flex-start'}>
          <Typography variant={'h5'} paragraph>Set New Owner</Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField fullWidth label="New Owner Address" defaultValue={''} variant="outlined"/>
        </Grid>
        <Grid item xs={2}>
          <Tooltip title={'Set new owner address'}>
            <Button
              color="primary"
              variant="contained"
              disableElevation={true}
              className={'mtb-mt-10'}
              size={'medium'}
            >
              Set
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Card>
  )
};

export default AdminNewOwner;