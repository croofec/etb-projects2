import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StakingHistoryItem from '@components/StakingHistoryItem';
import { useSupportedNetwork } from '@hooks/chain';
import { useSnackbar } from 'notistack';
import { useWeb3React } from '@web3-react/core';
import { ETBStaking } from '@utils/contracts';
import { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import Web3 from 'web3';
import Card from '@material-ui/core/Card';

const StakingHistory = () => {

  const isSupportedNetwork = useSupportedNetwork();

  const { enqueueSnackbar } = useSnackbar();
  const { chainId, account, active } = useWeb3React();

  const stakingContract = ETBStaking(chainId);

  const [stakes, setStakes] = useState([]);

  useEffect(async () => {
    try {
      const stageCount = await stakingContract.methods.getStackingStagesLength().call();
      const results = [];
      for (let i = stageCount; i > 0; i--) {
        const stake = await stakingContract.methods.getHolderInfo(i - 1, account).call();
        if (parseInt(stake[1]) > 0) {
          results.push({
            stage: i - 1,
            date: moment.utc(stake[0] * 1000).format('yyyy-MM-DD'),
            value: Web3.utils.fromWei(String(stake[1]), 'ether'),
            reward: Web3.utils.fromWei(String(stake[2]), 'ether'),
          });
        }
      }
      setStakes(results);
    } catch (e) {
      console.error(e);
    }
  }, [chainId, active]);

  return <Grid container>
    {isSupportedNetwork && <><Grid item xs={12} className={'mtb-mt-25'}>
      <Typography component={'h1'} variant={'h3'} className={'mtb-mt-10 mtb-mb-10'}>Staked</Typography>
    </Grid>
      {
        stakes.length === 0 && <Grid item xs={12} className={'mtb-mb-10'}><Card className={'d-flex mtb-p-10 p-align-center'}>
          <Grid container alignItems={'center'}>
            <Grid item xs={12}>No stakes found</Grid>
          </Grid>
        </Card>
        </Grid>
      }
      {
        stakes.map((stake, i) => {
          return <StakingHistoryItem key={i} data={stake}/>;
        })
      }
    </>
    }
  </Grid>;
};

export default StakingHistory;