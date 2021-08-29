import Web3 from "web3";

export const formatAccount = (account) => {
  return `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
};

export const formatWei = (value) => {
  if (value != null) return Number(Web3.utils.fromWei(String(value), 'ether')).toFixed(4);
  return value;
};