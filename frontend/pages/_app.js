import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import CssBaseline from '@material-ui/core/CssBaseline';

import Web3Wrapper from '@components/Web3Wrapper';
import store from '@redux/store';

import theme from '@theme/theme';
import MomentUtils from '@date-io/moment';

import moment from 'moment';
import '../styles/styles.scss';

function MyApp({ Component, pageProps }) {

  function getLibrary(provider) {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  }

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return <React.Fragment>
    <Head>
      <title>ETB - Staking</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
    </Head>
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3} SnackbarProps={{ autoHideDuration: 4000 }}>
          <ThemeProvider theme={theme}>
            <Web3ReactProvider getLibrary={getLibrary}>
              <CssBaseline/>
              <Web3Wrapper>
                <Component {...pageProps} />
              </Web3Wrapper>
            </Web3ReactProvider>
          </ThemeProvider>
        </SnackbarProvider>
      </Provider>
    </MuiPickersUtilsProvider>
  </React.Fragment>;
}

export default MyApp;
