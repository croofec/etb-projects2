import { useWeb3React } from '@web3-react/core';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

import makeStyles from '@material-ui/core/styles/makeStyles';

import ChainInfo from '@components/ChainInfo';
import styles from './styles';

const useStyles = makeStyles(styles);

const Header = () => {

  const classes = useStyles();

  return <AppBar elevation={2} style={{ backgroundColor: '#54595F' }}>
    <Toolbar>
      <Typography variant="h6" className={classes.title}>
        <img src={'/etb-logo.png'} height={'25px'}/><span className={'mtb-pl-20'}>Token Staking</span>
      </Typography>
      <ChainInfo/>
    </Toolbar>
  </AppBar>;
};
export default Header;