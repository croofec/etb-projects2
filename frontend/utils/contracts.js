import { loadContract } from "@utils/chain";
import BEP20TokenAbi from "@abis/BEP20Token";
import ETBStakingAbi from "@abis/ETBStaking";
import BEP20RewardTokenAbi from "@abis/BEP20RewardToken";

export const BEP20Token = (chainId) => loadContract(BEP20TokenAbi, chainId);
export const BEP20RewardToken = (chainId) => loadContract(BEP20RewardTokenAbi, chainId);
export const ETBStaking = (chainId) => loadContract(ETBStakingAbi, chainId);
