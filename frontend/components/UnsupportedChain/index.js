import { useWeb3React } from '@web3-react/core';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { CHAINS } from '@config/chains';

import styles from './syles';
import { isChainSupported } from '@utils/chain';

const useStyles = makeStyles(styles);

const UnsupportedChain = () => {

  const classes = useStyles();
  const { chainId, active } = useWeb3React();

  console.log(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID);

  return <>{active && !isChainSupported(chainId) && <Box className={classes.unsupportedChain}>
    Unsupported Chain! Supported {CHAINS.hasOwnProperty(chainId) && CHAINS[process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID].name} network.
  </Box>}</>;
};

export default UnsupportedChain;
