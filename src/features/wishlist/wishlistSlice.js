import { createSlice } from '@reduxjs/toolkit';
import { loadFromStorage } from '../../utils/localStorage';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { ids: loadFromStorage('wishlist', []) },
  reducers: {
    toggleWishlist(state, action) {
      const id = action.payload;
      state.ids = state.ids.includes(id)
        ? state.ids.filter((i) => i !== id)
        : [...state.ids, id];
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;