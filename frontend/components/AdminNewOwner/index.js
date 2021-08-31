import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { useSupportedNetwork } from '@hooks/chain';
import { ETBStaking } from '@utils/contracts';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import { useSnackbar } from 'notistack';

const AdminNewOwner = () => {
  const isSupportedNetwork = useSupportedNetwork();

  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState('');
  const { chainId, account } = useWeb3React();

  const stakingContract = ETBStaking(chainId);

  const handleSet = async () => {
    if (stakingContract) {
      try {
        await stakingContract.methods.transferOwnership(value).send({
          from: account,
        });
        enqueueSnackbar('Wallet connected', {
          variant: 'success',
        });
        setValue('');
      } catch (e) {
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

  return (
    <Card className={'w-100 mtb-px-30 mtb-py-20 mtb-round-10 p-relative mtb-z-10 mtb-my-10'} elevation={5}>
      <Grid container spacing={2}>
        <Grid item xs={12} container justifyContent={'flex-start'}>
          <Typography variant={'h5'} paragraph>Set New Owner</Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField fullWidth label="New Owner Address" value={value} onChange={(e) => setValue(e.target.value)} variant="outlined"/>
        </Grid>
        <Grid item xs={2}>
          <Tooltip title={'Set new owner address'}>
            <Button
              color="primary"
              variant="contained"
              disabled={!isSupportedNetwork}
              disableElevation={true}
              className={'mtb-mt-10'}
              size={'medium'}
              onClick={handleSet}
            >
              Set
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AdminNewOwner;