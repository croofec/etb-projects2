import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import stakingReducer from '@redux/slices/staking';
import blockChainReducer from '@redux/slices/blockchain';

export default configureStore({
  reducer: {
    staking: stakingReducer,
    blockChain: blockChainReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        "blockChain/setChainConnector",
        "blockChain/setChainBalance",
      ],
      ignoredPaths: [
        "blockChain/setChainConnector",
        "blockChain.balance",
      ],
    },
  }),
});
