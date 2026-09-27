import { createSlice } from '@reduxjs/toolkit';
import { loadFromStorage } from '../../utils/localStorage';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    lastOrder: loadFromStorage('lastOrder', null),
  },
  reducers: {
    placeOrder(state, action) {
      state.lastOrder = action.payload;
    },
  },
});

export const { placeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;