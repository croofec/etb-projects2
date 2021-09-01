import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import StakingInfoBox from '@components/StakingInfoBox';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { ETBStaking } from '@utils/contracts';
import Web3 from 'web3';

const StakingInfo = () => {

  const { active, chainId } = useWeb3React();

  const [currentStage, setCurrentStage] = useState(0);
  const [currentHolder, setCurrentHolder] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);

  const staking = ETBStaking(chainId);

  useEffect(async () => {
    if (staking) {
      const stages = await staking.methods.getStackingStagesLength().call();
      setCurrentStage(stages);
      const stageInfo = await staking.methods.getStackingStage(stages - 1).call();
      setCurrentHolder(stageInfo[4]);
      setCurrentValue(Web3.utils.fromWei(String(stageInfo[3]), 'ether'));
    }
  }, [active, chainId]);

  return <>{active && <Grid container>
    <Grid item xs={12}>
      <Typography variant={'h3'} className={'mtb-mt-10 mtb-mb-10'}>Stake</Typography>
    </Grid>
    <StakingInfoBox title={'Current Stage'} value={currentStage}/>
    <StakingInfoBox title={'Stake holders'} value={currentHolder}/>
    <StakingInfoBox title={'Total tokens'} value={currentValue}/>
  </Grid>}</>;
};

export default StakingInfo;