import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Button,
  InputBase,
  Badge,
  Avatar,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { selectCartCount } from '../features/cart/cartSlice';
import CartDrawer from './CartDrawer';
import { useNavigate } from 'react-router-dom';
import { setCategory, setSearchTerm } from '../features/products/productsSlice';

const categories = [
  { label: 'All', id: 'all' },
  { label: 'Electronics', id: 'electronics' },
  { label: 'Accessories', id: 'accessories' },
  { label: 'Fashion', id: 'fashion' },
  { label: 'Home Living', id: 'home' },
];

function Navbar() {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    
    <AppBar
  position="fixed"
  elevation={0}
  sx={{
    bgcolor: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(10px)',
    color: 'text.primary',
    transition: 'all 0.3s ease-in-out',
    zIndex: (theme) => theme.zIndex.appBar,
  }}
>
        <Toolbar disableGutters sx={{ px: { xs: 2, md: 6 }, justifyContent: 'space-between', minHeight: 80 }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
  color="inherit"
  onClick={() => setMenuOpen(true)}
  sx={{
    display: { xs: 'flex', md: 'none' },
    transition: 'transform 0.2s',
    '&:active': {
      transform: 'scale(0.9)',
    },
  }}
>
  <MenuIcon />
</IconButton>

            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                cursor: 'pointer',
                transition: 'opacity 0.2s',
                '&:hover': { opacity: 0.8 }
              }}
            >
              <StorefrontIcon color="primary" />
              <Typography variant="h6" sx={{ fontFamily: 'Outfit', fontWeight: 700, color: 'secondary.main' }}>
                Mini Store
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
  {categories.map((cat) => (
    <Button
      key={cat.id}
      color="inherit"
      onClick={() => {
        dispatch(setCategory(cat.id));
        navigate('/');
      }}
      sx={{
        fontWeight: 500,
        position: 'relative',
        transition: 'color 0.2s',
        '&:hover': {
          color: 'primary.main',
          bgcolor: 'transparent',
        },
      }}
    >
      {cat.label}
    </Button>
  ))}
</Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                gap: 1,
                bgcolor: '#f1f1fb',
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
                transition: 'all 0.3s ease',
                '&:focus-within': {
                  boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)', // إطار جمالي خفيف عند التركيز على البحث
                  bgcolor: '#fff',
                },
              }}
            >
              <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <InputBase
  inputRef={searchRef}
  placeholder="Search collection..."
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      dispatch(setSearchTerm(searchValue));
      navigate('/');
    }
  }}
  sx={{ fontSize: 14, width: 150 }}
/>
              <Box sx={{ bgcolor: '#e4e4f5', borderRadius: 1, px: 0.75, fontSize: 12, fontWeight: 600 }}>⌘K</Box>
            </Box>

            <IconButton 
              color="inherit" 
              onClick={() => setCartOpen(true)}
              sx={{
                transition: 'transform 0.2s',
                '&:hover': { color: 'primary.main' },
                '&:active': { transform: 'scale(0.85)' }
              }}
            >
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>

            <Avatar
              alt="User"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                },
              }}
            />
          </Box>
        </Toolbar>

        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        <Drawer
  anchor="left"
  open={menuOpen}
  onClose={() => setMenuOpen(false)}
>
  <Box
    sx={{
      width: 280,
      pt: 2,
    }}
    role="presentation"
  >
    <Box
      sx={{
        px: 3,
        pb: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <StorefrontIcon color="primary" />

      <Typography
        variant="h6"
        sx={{
          fontFamily: 'Outfit',
          fontWeight: 700,
          color: 'secondary.main',
        }}
      >
        Mini Store
      </Typography>
    </Box>

    <Divider />

    <List>
      {categories.map((cat) => (
        <ListItemButton
          key={cat.id}
          onClick={() => {
            dispatch(setCategory(cat.id));
            navigate('/');
            setMenuOpen(false);
          }}
        >
          <ListItemText
            primary={cat.label}
            primaryTypographyProps={{
              fontWeight: 500,
            }}
          />
        </ListItemButton>
      ))}
    </List>
  </Box>
</Drawer>
      </AppBar>
    
  );
}

export default Navbar;
