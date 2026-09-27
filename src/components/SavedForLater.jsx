import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, Fade, Slide } from '@mui/material';
import { moveToCart, removeSavedItem } from '../features/cart/cartSlice';

function SavedForLater() {
  const dispatch = useDispatch();
  const savedItems = useSelector((state) => state.cart.savedItems);

  if (savedItems.length === 0) return null;

  return (
    <Fade in={true} timeout={600}>
      <Box 
        sx={{ 
          bgcolor: '#fff', 
          border: '1px solid #f0f0f5', 
          borderRadius: 3, 
          p: 3, 
          mt: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          transition: 'all 0.3s ease'
        }}
      >
        <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: 'text.secondary', mb: 2.5 }}>
          SAVED FOR LATER ({savedItems.length})
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {savedItems.map((item, index) => (
            <Slide direction="up" in={true} timeout={500} key={item.id} style={{ transitionDelay: `${index * 100}ms` }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  p: 1.5,
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: '#fafafa',
                    transform: 'translateX(4px)'
                  }
                }}
              >
                {/* صورة المنتج مع تكبير ناعم عند الـ Hover */}
                <Box 
                  sx={{ 
                    width: 56, 
                    height: 56, 
                    borderRadius: 2, 
                    overflow: 'hidden', 
                    flexShrink: 0,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
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
                      transition: 'transform 0.4s ease',
                      '&:hover': { transform: 'scale(1.1)' }
                    }} 
                  />
                </Box>

                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography noWrap sx={{ fontWeight: 600, fontSize: 14 }}>{item.title}</Typography>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'secondary.main', mt: 0.25 }}>
                    ${item.price.toFixed(2)}
                  </Typography>
                </Box>

                {/* زر نقل للسلة مع تأثيرات انتقال */}
                <Button 
                  size="small" 
                  variant="outlined" 
                  onClick={() => dispatch(moveToCart(item.id))}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    borderColor: 'primary.main',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: '#fff',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)'
                    },
                    '&:active': { transform: 'scale(0.95)' }
                  }}
                >
                  Move to Bag
                </Button>

                {/* زر الحذف مع تأثير تلوين وتدوير خفيف */}
                <Button 
                  size="small" 
                  onClick={() => dispatch(removeSavedItem(item.id))} 
                  sx={{ 
                    color: 'text.secondary', 
                    minWidth: 'auto',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      bgcolor: 'rgba(220, 38, 38, 0.08)',
                      color: '#dc2626',
                      transform: 'scale(1.1)'
                    },
                    '&:active': { transform: 'scale(0.9)' }
                  }}
                >
                  ✕
                </Button>
              </Box>
            </Slide>
          ))}
        </Box>
      </Box>
    </Fade>
  );
}

export default SavedForLater;
