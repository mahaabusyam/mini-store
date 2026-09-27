import { useDispatch, useSelector } from 'react-redux';
import { Box, Chip, Select, MenuItem, Typography } from '@mui/material';
import { setCategory, setSortBy } from '../features/products/productsSlice';

const categories = [
  { id: 'all', label: 'All Items', icon: '✨' },
  { id: 'electronics', label: 'Electronics', icon: '🎧' },
  { id: 'accessories', label: 'Everyday Carry & Accessories', icon: '💼' },
  { id: 'fashion', label: 'Minimal Fashion', icon: '👕' },
  { id: 'home', label: 'Home & Workspace', icon: '🪴' },
  { id: 'new', label: 'New Arrivals', icon: '⚡' },
  { id: 'sale', label: 'On Sale', icon: '🏷️' },
];

function CategoryBar() {
  const dispatch = useDispatch();
  const { activeCategory, sortBy } = useSelector((state) => state.products);

  return (
    <h1>categories</h1>
    /*
    <Box
      sx={{
        display: 'flex', alignItems: 'center', gap: 2,
        px: { xs: 2, md: 6 }, py: 1.5, bgcolor: '#fff', borderBottom: '1px solid #eee',
      }}
    >
      <Box
        sx={{
          display: 'flex', gap: 1.5, overflowX: 'auto', flexGrow: 1, py: 0.5,
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {categories.map((cat) => {
          const active = activeCategory === cat.id;
          return (
            <Chip
              key={cat.id}
              clickable
              label={`${cat.icon} ${cat.label}`}
              onClick={() => dispatch(setCategory(cat.id))}
              sx={{
                height: 40, px: 1, borderRadius: 99, fontWeight: 500, flexShrink: 0,
                bgcolor: active ? 'secondary.main' : '#e8ebfb',
                color: active ? '#fff' : 'text.primary',
                '&:hover': { bgcolor: active ? 'secondary.main' : '#d9def7' },
              }}
            />
          );
        })}
      </Box>

      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, flexShrink: 0 }}>
        <Typography variant="caption" sx={{ letterSpacing: 1, color: 'text.secondary' }}>
          SORT BY
        </Typography>
        <Select
          variant="standard"
          disableUnderline
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          sx={{ fontSize: 13, fontWeight: 600 }}
        >
          <MenuItem value="featured">Featured</MenuItem>
          <MenuItem value="price-asc">Price: Low to High</MenuItem>
          <MenuItem value="price-desc">Price: High to Low</MenuItem>
          <MenuItem value="rating">Top Rated</MenuItem>
        </Select>
      </Box>
    </Box>*/
  );
}

export default CategoryBar;