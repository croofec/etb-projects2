import Box from '@material-ui/core/Box';
import Header from '@components/Header';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import UnsupportedChain from '@components/UnsupportedChain';
import AdminNewOwner from '@components/AdminNewOwner';
import AdminRewardToken from '@components/AdminRewardToken';
import AdminSupportedToken from '@components/AdminSupportedToken';
import React from 'react';
import AdminStakingStages from '@components/AdminStakingStages';

const Admin = () => {
  return (
    <Container maxWidth="xl">
      <Box flexGrow={1}>
        <Header/>
      </Box>
      <Grid container mt={'80px'}>
        <Box display={'flex'} justifyContent={'center'} p={20} width={1}>
          <Container maxWidth="sm">
            <UnsupportedChain/>
            <Grid item xs={12}>
              <AdminStakingStages/>
            </Grid>
            <Grid item xs={12}>
              <AdminSupportedToken/>
            </Grid>
            <Grid item xs={12}>
              <AdminRewardToken/>
            </Grid>
            <Grid item xs={12}>
              <AdminNewOwner/>
            </Grid>
          </Container>
        </Box>
      </Grid>
    </Container>
  );
};
export default Admin;