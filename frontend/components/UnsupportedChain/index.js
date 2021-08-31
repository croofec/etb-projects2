import { useWeb3React } from '@web3-react/core';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { CHAINS } from '@config/chains';

import styles from './syles';

const useStyles = makeStyles(styles);

const UnsupportedChain = () => {

  const classes = useStyles();
  const { chainId, active } = useWeb3React();

  return <>{active && parseInt(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID) !== chainId && <Box className={classes.unsupportedChain}>
    Unsupported Chain! Supported {CHAINS[process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID].name} network.
  </Box>}</>;
};

export default UnsupportedChain;
