import { useDispatch } from 'react-redux';
import { Box, Typography, IconButton, Fade, Slide } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DeleteIcon from "@mui/icons-material/Delete";
import { removeFromCart, updateQuantity, saveForLater } from '../features/cart/cartSlice';

function BagItem({ item }) {
  const dispatch = useDispatch();

  return (
    <Fade in={true} timeout={500}>
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 2, 
          py: 2.5, 
          borderBottom: '1px solid #f0f0f5', 
          minWidth: 0,
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: 'rgba(247, 247, 255, 0.5)',
            px: 1,
            borderRadius: 2
          }
        }}
      >
        {/* صورة المنتج مع انيميشن تكبير عند الـ Hover */}
        <Box 
          sx={{ 
            width: 88, 
            height: 88, 
            borderRadius: 2, 
            overflow: 'hidden', 
            flexShrink: 0,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}
        >
          <Box 
            component="img" 
            src={item.image} 
            alt={item.title}
            sx={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              transition: 'transform 0.5s ease',
              '&:hover': { transform: 'scale(1.08)' }
            }} 
          />
        </Box>

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: 'primary.main' }}>
                {item.label}
              </Typography>
              <Typography noWrap sx={{ fontWeight: 700, fontSize: 15, mt: 0.25 }}>{item.title}</Typography>
              <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.25 }}>
                {item.selectedColor ?? 'Standard'}
                {item.selectedCushion ? ` • ${item.selectedCushion}` : ''}
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 16, color: 'secondary.main' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </Typography>
              <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                {item.quantity > 1 ? `${item.quantity} × $${item.price.toFixed(2)}` : `Unit: $${item.price.toFixed(2)}`}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'space-between', alignItems: 'center', mt: 1.5 }}>
            {/* أزرار التحكم بالكمية مع تأثيرات حركية */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                border: '1px solid #e2e8f0', 
                borderRadius: 1.5, 
                flexShrink: 0,
                bgcolor: '#fff',
                boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
              }}
            >
              <IconButton 
                size="small" 
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                sx={{ transition: 'transform 0.2s', '&:active': { transform: 'scale(0.85)' } }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography sx={{ width: 28, textAlign: 'center', fontWeight: 600, fontSize: 14 }}>{item.quantity}</Typography>
              <IconButton 
                size="small" 
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                sx={{ transition: 'transform 0.2s', '&:active': { transform: 'scale(0.85)' } }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* أزرار الحفظ للحذف أو لاحقاً مع تأثيرات تلوين وانتقال */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box
                onClick={() => dispatch(saveForLater(item.id))}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 0.5, 
                  fontSize: 13, 
                  color: 'text.secondary', 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': { color: 'primary.main', transform: 'translateY(-1px)' } 
                }}
              >
                <BookmarkBorderIcon sx={{ fontSize: 16 }} /> Save for Later
              </Box>
              <Box
                onClick={() => dispatch(removeFromCart(item.id))}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 0.5, 
                  fontSize: 13, 
                  color: 'text.secondary', 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': { color: '#dc2626', transform: 'translateY(-1px)' } 
                }}
              >
                <DeleteIcon sx={{ fontSize: 16 }} /> Remove
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}

export default BagItem;
