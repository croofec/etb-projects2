import { loadContract } from "@utils/chain";
import BEP20TokenAbi from "@abis/BEP20Token";
import ETBStakingAbi from "@abis/ETBStaking";

export const BEP20Token = (chainId) => loadContract(BEP20TokenAbi, chainId);
export const ETBStaking = (chainId) => loadContract(ETBStakingAbi, chainId);
