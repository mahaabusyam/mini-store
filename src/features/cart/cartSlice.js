import { createSlice, createSelector } from '@reduxjs/toolkit';
import { loadFromStorage } from '../../utils/localStorage';

const initialState = {
  items: loadFromStorage('cart', []),
  savedItems: loadFromStorage('savedItems', []),
  lastAdded: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      state.lastAdded = { product, token: Date.now() };
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
    },
    clearLastAdded(state) {
      state.lastAdded = null;
    },
    clearCart(state) {
      state.items = [];
    },
    saveForLater(state, action) {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (!item) return;
      state.items = state.items.filter((i) => i.id !== id);
      state.savedItems.push(item);
    },
    moveToCart(state, action) {
      const id = action.payload;
      const item = state.savedItems.find((i) => i.id === id);
      if (!item) return;
      state.savedItems = state.savedItems.filter((i) => i.id !== id);
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
    },
    removeSavedItem(state, action) {
      state.savedItems = state.savedItems.filter((i) => i.id !== action.payload);
    },
  },
});

export const {
  addToCart, removeFromCart, updateQuantity, clearLastAdded, clearCart,
  saveForLater, moveToCart, removeSavedItem,
} = cartSlice.actions;

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = createSelector(
  (state) => state.cart.items,
  (items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export default cartSlice.reducer;