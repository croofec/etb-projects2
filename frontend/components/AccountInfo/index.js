import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';

import { Box } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';

import Button from '@material-ui/core/Button';

import AddressesIdentIcon from '@components/AddressesIdentIcon';

import { CHAINS, MAIN_NETS } from '@config/chains';
import { formatAccount, formatWei } from '@utils/chain';
import { selectChainBalance } from '@redux/slices/blockchain';

const AccountInfo = () => {

  const { account, chainId, deactivate } = useWeb3React();
  const balance = useSelector(selectChainBalance);

  return <Box display="flex" alignItems={'center'}>
    <Box m={2}>
      {!(MAIN_NETS.indexOf(chainId) !== -1) && <Chip label={CHAINS[chainId].name}/>}
    </Box>
    <Box m={2}>
      {`${formatWei(balance)} ${CHAINS[chainId].currency}`}
    </Box>
    <Box m={2}>
      <Button variant="outlined" color="secondary" endIcon={<AddressesIdentIcon account={account}/>} onClick={() => deactivate()}>
        {formatAccount(account)}
      </Button>
    </Box>
  </Box>;
};
export default AccountInfo;