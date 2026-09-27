import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, Button, IconButton, CircularProgress, Fade } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import api from '../api/axiosInstance';
import { addToCart } from '../features/cart/cartSlice';

function CompanionProducts() {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const { data } = await api.get('/data/companionProducts.json', { signal: controller.signal });
        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error.name !== 'CanceledError') console.error(error);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort(); // cleanup: بيلغي الطلب لو الكومبوننت انحذف قبل ما يخلص
  }, []);

  // دالة لتمرير المنتجات يميناً ويساراً بسلاسة عند الضغط على الأسهم
  const scroll = (direction) => {
    const el = scrollRef.current;
    if (el) {
      el.scrollBy({ left: direction * 240, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}><CircularProgress size={22} color="primary" /></Box>;
  }

  if (items.length === 0) return null;

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
          <Box>
            <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: 'text.secondary' }}>
              RECOMMENDED COMPANION GOODS
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 17, mt: 0.25 }}>Frequently Added Together</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton 
              size="small" 
              onClick={() => scroll(-1)}
              sx={{ 
                bgcolor: '#f3f3f3',
                transition: 'all 0.2s',
                '&:hover': { bgcolor: '#e5e7f5', transform: 'scale(1.05)' } 
              }}
            >
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => scroll(1)}
              sx={{ 
                bgcolor: '#f3f3f3',
                transition: 'all 0.2s',
                '&:hover': { bgcolor: '#e5e7f5', transform: 'scale(1.05)' } 
              }}
            >
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Box 
          ref={scrollRef}
          sx={{ 
            display: 'flex', 
            gap: 2, 
            overflowX: 'auto', 
            pb: 1,
            '&::-webkit-scrollbar': { display: 'none' } // إخفاء شريط التمرير لإطلالة أنظف
          }}
        >
          {items.map((product) => (
            <Box 
              key={product.id} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5, 
                bgcolor: '#f7f7ff', 
                borderRadius: 2, 
                p: 1.5, 
                flexShrink: 0, 
                minWidth: 240,
                border: '1px solid transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 15px rgba(99, 102, 241, 0.08)'
                }
              }}
            >
              {/* صورة المنتج مع تكبير ناعم عند مرور الماوس */}
              <Box sx={{ width: 48, height: 48, borderRadius: 1.5, overflow: 'hidden', flexShrink: 0 }}>
                <Box 
                  component="img" 
                  src={product.image} 
                  alt={product.title}
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
                <Typography noWrap sx={{ fontWeight: 600, fontSize: 13 }}>{product.title}</Typography>
                <Typography sx={{ fontSize: 13, color: 'primary.main', fontWeight: 700, mt: 0.25 }}>
                  +${product.price.toFixed(2)}
                </Typography>
              </Box>

              <Button
                size="small" 
                variant="contained" 
                startIcon={<AddIcon sx={{ fontSize: 14 }} />}
                onClick={() => dispatch(addToCart(product))}
                sx={{ 
                  flexShrink: 0,
                  borderRadius: 1.5,
                  textTransform: 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)' },
                  '&:active': { transform: 'scale(0.95)' }
                }}
              >
                Add
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Fade>
  );
}

export default CompanionProducts;
