import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

import AccountInfo from '@components/AccountInfo';

import { injected } from '@connectors/connectors';
import { setChainConnector } from '@redux/slices/blockchain';

const ChainInfo = () => {
  const { active, activate } = useWeb3React();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleConnectToWallet = async () => {
    try {
      // dispatch(setChainConnector(injected));
      await activate(injected);
      enqueueSnackbar('Wallet connected', {
        variant: 'success',
      });
    } catch (e) {
      console.error(e);
      enqueueSnackbar(e.message, {
        variant: 'error',
      });
    }
  };

  return (
    <>
      {active && <AccountInfo/>}
      {!active && <Tooltip title={'Connect with Metamask'}><Button onClick={handleConnectToWallet} startIcon={<img height={'25px'} src={'/mm.png'}/>} color="inherit" color="primary" variant="contained">Connect wallet</Button></Tooltip>}
    </>
  );
};
export default ChainInfo;