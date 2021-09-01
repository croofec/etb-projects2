import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import StakingHistory from '@components/StakingHistory';
import Staking from '@components/Staking';
import StakingInfo from '@components/StakingInfo';
import Header from '@components/Header';
import UnsupportedChain from '@components/UnsupportedChain';
import TokenFaucet from '@components/TokenFaucet';

const Index = () => {
  return (<Container maxWidth="xl">
    <Box flexGrow={1}>
      <Header/>
    </Box>
    <Grid container mt={'80px'}>
      <Box display={'flex'} justifyContent={'center'} p={20} width={1}>
        <Container maxWidth="sm">
          <UnsupportedChain/>
          <StakingInfo/>
          <Staking/>
          <TokenFaucet/>
          <StakingHistory/>
        </Container>
      </Box>
    </Grid>
  </Container>);
};

export default Index;