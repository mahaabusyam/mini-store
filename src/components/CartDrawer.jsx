import { useDispatch, useSelector } from 'react-redux';
import {
  Drawer, Box, Typography, IconButton, Divider, Button, TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import {
  removeFromCart, updateQuantity, selectCartTotal,
} from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

function CartDrawer({ open, onClose }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = useSelector(selectCartTotal);
  const navigate = useNavigate();

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: '100vw', sm: 400 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* الرأس */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2.5, borderBottom: '1px solid #eee' }}>
          <Typography variant="h6" sx={{ fontFamily: 'Outfit', fontWeight: 700 }}>
            Your Cart ({items.length})
          </Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>

        {/* المحتوى */}
        {items.length === 0 ? (
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1.5, color: 'text.secondary' }}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 48, opacity: 0.4 }} />
            <Typography>Your cart is empty</Typography>
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2.5, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {items.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', gap: 1.5 }}>
                <Box component="img" src={item.image} alt={item.title}
                  sx={{ width: 72, height: 72, borderRadius: 1, objectFit: 'cover', flexShrink: 0 }} />

                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography noWrap sx={{ fontWeight: 600, fontSize: 14 }}>{item.title}</Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>${item.price.toFixed(2)}</Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <TextField
                      type="number"
                      size="small"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) || 1 }))
                      }
                      inputProps={{ min: 1, style: { width: 40, textAlign: 'center', padding: '4px 0' } }}
                    />
                    <IconButton size="small" onClick={() => dispatch(removeFromCart(item.id))}>
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Typography sx={{ fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* التذييل */}
        {items.length > 0 && (
          <Box sx={{ p: 2.5, borderTop: '1px solid #eee' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ fontWeight: 600 }}>Total</Typography>
              <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 20 }}>
                ${total.toFixed(2)}
              </Typography>
            </Box>
             <Button
              fullWidth variant="outlined" size="small"
              onClick={() => { onClose(); navigate('/cart'); }}
              sx={{ mb: 1 }}
            >
              View Full Bag
            </Button>
            <Button
              fullWidth variant="contained" size="large"
              onClick={() => { onClose(); navigate('/checkout'); }}
            >
              Checkout
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

export default CartDrawer;