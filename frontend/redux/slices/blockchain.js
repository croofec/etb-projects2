import { createSlice } from '@reduxjs/toolkit';

const blockChainSlice = createSlice({
  name: 'blockChain',
  initialState: {
    connector: null,
    balance: 0,
  },
  reducers: {
    setChainConnector: (state, action) => {
      state.connector = action.payload;
    },
    setChainBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const selectChainConnector = (state) => state.blockChain.connector;
export const selectChainBalance = (state) => state.blockChain.balance;

export const { setChainConnector, setChainBalance } = blockChainSlice.actions;

export default blockChainSlice.reducer;
