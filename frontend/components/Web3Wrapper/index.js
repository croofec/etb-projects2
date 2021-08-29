import { useDispatch, useSelector } from 'react-redux';
import { selectChainConnector, setChainBalance } from '@redux/slices/blockchain';
import { useEagerConnect, useInactiveListener } from '@hooks/web3';
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

const Web3Wrapper = ({ children }) => {
  const activatingConnector = useSelector(selectChainConnector);
  const triedEager = useEagerConnect();
  const dispatch = useDispatch();

  const { account, library, chainId } = useWeb3React();

  useInactiveListener(!triedEager || !!activatingConnector);

  useEffect(async () => {
    if (!!account && !!library) {
      const balance = await library.getBalance(account);
      dispatch(setChainBalance(balance));
    }
  }, [account, library, chainId]);

  return (<>{children}</>);
};
export default Web3Wrapper;