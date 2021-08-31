import Web3 from 'web3';

export const ALLOWANCE_MAX =
  "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";

export const formatAccount = (account) => {
  return `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
};

export const formatWei = (value) => {
  if (value != null) return Number(Web3.utils.fromWei(String(value), 'ether')).toFixed(4);
  return value;
};

export const loadContract = (contract, chainId) => {
  try {
    const web3 = new Web3(window.ethereum);
    const deployedNetwork = contract.networks[chainId];
    if (deployedNetwork == undefined) {
      return null; // wrong network
    } else {
      const instance = new web3.eth.Contract(
        contract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      return instance;
    }
  } catch (error) {
    return null;
  }
};

export function isChainSupported(chainId) {
  return parseInt(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID) === chainId;
}