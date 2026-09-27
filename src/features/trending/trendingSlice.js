import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import trendingProducts from '../../data/trending.js';

export const fetchTrending = createAsyncThunk(
  'trending/fetchTrending',
  async () => {
    return trendingProducts;
  }
);

const trendingSlice = createSlice({
  name: 'trending',

  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTrending.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })

      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })

      .addCase(fetchTrending.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default trendingSlice.reducer;