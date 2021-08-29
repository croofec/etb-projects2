import { useWeb3React } from '@web3-react/core';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';

import styles from './syles';

const useStyles = makeStyles(styles);

const UnsupportedChain = () => {

  const classes = useStyles();
  const { chainId } = useWeb3React();

  return <>{parseInt(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID) !== chainId && <Box className={classes.unsupportedChain}>
    Unsupported Chain!
  </Box>}</>;
};

export default UnsupportedChain;
