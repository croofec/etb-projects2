import { createSlice } from "@reduxjs/toolkit";

const stakingSlice = createSlice({
  name: "staking",
  initialState: {
    items: [],
  },
  reducers: {
    setStakingItem: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const selectStakingItems = (state) => state.staking.items;

export const { setStakingItem } = stakingSlice.actions;

export default stakingSlice.reducer;
