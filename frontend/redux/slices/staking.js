import { createSlice } from "@reduxjs/toolkit";

const stakingSlice = createSlice({
  name: "staking",
  initialState: {
    isLoading: false,
    items: [],
  },
  reducers: {
    setStakingItem: (state, action) => {
      state.items = action.payload;
    },
    setStakingLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const selectStakingItems = (state) => state.staking.items;
export const selectStakingLoading = (state) => state.staking.isLoading;

export const { setStakingItem, setStakingLoading } = stakingSlice.actions;

export default stakingSlice.reducer;
