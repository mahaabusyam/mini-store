import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Typography, IconButton, Fade } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { clearLastAdded } from '../features/cart/cartSlice';

function CartToast() {
  const dispatch = useDispatch();
  const lastAdded = useSelector((state) => state.cart.lastAdded);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!lastAdded) return;

    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000);

    return () => clearTimeout(timer); // cleanup: بيمنع التوقيت القديم من التنفيذ لو انضاف منتج جديد بالأثناء
  }, [lastAdded]);

  if (!lastAdded) return null;
  const { product } = lastAdded;

  return (
    <Fade in={visible} timeout={250} onExited={() => dispatch(clearLastAdded())}>
      <Paper
        elevation={6}
        sx={{
          position: 'fixed', top: 90, right: { xs: 16, md: 32 }, zIndex: 1300,
          width: 320, p: 2, borderRadius: 2, display: 'flex', gap: 1.5,
        }}
      >
        <Box component="img" src={product.image} alt={product.title}
          sx={{ width: 56, height: 56, borderRadius: 1, objectFit: 'cover', flexShrink: 0 }} />

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CheckCircleIcon sx={{ fontSize: 16, color: 'primary.main' }} />
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'primary.main' }}>
              Added to Cart
            </Typography>
          </Box>
          <Typography noWrap sx={{ fontWeight: 600, fontSize: 14, mt: 0.5 }}>
            {product.title}
          </Typography>
          <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
            ${product.price.toFixed(2)}
          </Typography>
        </Box>

        <IconButton size="small" onClick={() => setVisible(false)} sx={{ alignSelf: 'flex-start' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Paper>
    </Fade>
  );
}

export default CartToast;