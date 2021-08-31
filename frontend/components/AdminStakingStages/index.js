import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';

const AdminStakingStages = () => {

  const [reward, setReward] = useState(1000);
  const [startDate, setStartDate] = useState(moment().add(0, 'days').startOf('day').toDate());
  const [endDate, setEndDate] = useState(moment().add(30, 'days').startOf('day').toDate());
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const s = moment(startDate);
    const e = moment(endDate);
    setDuration(e.diff(s, 'days'));
  }, [startDate, endDate]);

  return <Card className={'w-100 mtb-px-30 mtb-py-20 mtb-round-10 p-relative mtb-z-10 mtb-my-10'} elevation={5}>
    <Grid container spacing={2}>
      <Grid item xs={12} container justifyContent={'flex-start'}>
        <Typography variant={'h5'} paragraph>Staking Stages</Typography>
      </Grid>
      <Grid item xs={3}>
        <KeyboardDatePicker
          margin="normal"
          label="Start date"
          format="yyyy-MM-DD"
          value={startDate}
          onChange={(date) => setStartDate(date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <KeyboardDatePicker
          margin="normal"
          label="End date"
          format="yyyy-MM-DD"
          value={endDate}
          onChange={(date) => setEndDate(date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField fullWidth label="Reward Value" value={reward} onChange={(e) => setReward(e.value)} variant="outlined"/>
        <Typography variant={'h7'}>{`Duration ${duration} days`}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Tooltip title={'Add stage staking'}>
          <Button
            color="primary"
            variant="contained"
            disableElevation={true}
            className={'mtb-mt-10'}
            size={'medium'}
          >
            Add
          </Button>
        </Tooltip>
      </Grid>
      <Grid item xs={12} container justifyContent={'flex-start'}>
        <Typography variant={'h5'} paragraph>History Stages</Typography>
      </Grid>
    </Grid>
  </Card>;

};
export default AdminStakingStages;