import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import makeStyles from '@material-ui/core/styles/makeStyles';

import styles from './styles';

const useStyles = makeStyles(styles);

const Header = () => {

  const classes = useStyles();

  return <AppBar elevation={2} style={{ backgroundColor: '#54595F' }}>
    <Toolbar>
      <Typography variant="h6" className={classes.title}>
        <img src={'/etb-logo.png'} height={'25px'}/><span className={'mtb-pl-20'}>Token Staking</span>
      </Typography>
      <Tooltip title={'Connect with Metamask'}><Button startIcon={<img height={'25px'} src={'/mm.png'}/>} color="inherit" color="primary" variant="contained">Connect wallet</Button></Tooltip>
    </Toolbar>
  </AppBar>;
};
export default Header;