import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import localProducts from '../../data/products.js';
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    return localProducts;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    activeCategory: 'all',
    sortBy: 'featured',
    searchTerm: '',
  },
  reducers: {
    setCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
      state.activeCategory = 'all'; // البحث بيلغي فلتر التصنيف عشان يدور بكل المنتجات
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        if (action.meta.aborted) return; // الطلب انلغى بالـ cleanup، مش خطأ حقيقي
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setCategory, setSortBy, setSearchTerm } = productsSlice.actions;

// Selector: التصفية والترتيب
export const selectVisibleProducts = createSelector(
  [
    (state) => state.products.items,
    (state) => state.products.activeCategory,
    (state) => state.products.sortBy,
    (state) => state.products.searchTerm,
  ],
  (items, category, sortBy, searchTerm) => {
    let result = items.filter((p) => {
      if (category === 'all') return true;
      if (category === 'new') return p.isNew;
      if (category === 'sale') return Boolean(p.oldPrice);
      return p.category === category;
    });

    const term = searchTerm.trim().toLowerCase();
    if (term) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.fullTitle?.toLowerCase().includes(term) ||
          p.label?.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term)
      );
    }

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    return result;
  }
);
export const selectProductById = (id) => (state) =>
  state.products.items.find((p) => p.id === id);
export default productsSlice.reducer;