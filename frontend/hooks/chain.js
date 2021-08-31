import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { isChainSupported } from '@utils/chain';

export function useSupportedNetwork() {
  const { active, chainId } = useWeb3React();
  const [isSupportedNetwork, setSupportedNetwork] = useState(false);

  useEffect(() => {
    setSupportedNetwork(active && isChainSupported(chainId));
  }, [active, chainId]);

  return isSupportedNetwork;
};