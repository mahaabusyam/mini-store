import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';
import { saveToStorage } from '../utils/localStorage';
import trendingReducer from '../features/trending/trendingSlice';
import ordersReducer from '../features/orders/ordersSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    wishlist: wishlistReducer,
    trending: trendingReducer,
    orders: ordersReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveToStorage('cart', state.cart.items);
  saveToStorage('savedItems', state.cart.savedItems);
  saveToStorage('wishlist', state.wishlist.ids);
  saveToStorage('lastOrder', state.orders.lastOrder);
});