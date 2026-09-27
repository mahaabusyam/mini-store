import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardMedia, Chip, IconButton, Typography, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { addToCart } from '../features/cart/cartSlice';
import { toggleWishlist } from '../features/wishlist/wishlistSlice';

const badgeStyles = {
  'Best Seller': { bgcolor: '#065f46', color: '#fff' },
  'Staff Pick': { bgcolor: '#6ee7b7', color: '#064e3b' },
  Trending: { bgcolor: '#fde9c8', color: '#92400e' },
};

function ProductCard({ product, onQuickView }) {
  const dispatch = useDispatch();
  const isWished = useSelector((state) => state.wishlist.ids.includes(product.id));

  return (
    <Card 
      elevation={0} 
      onClick={() => onQuickView(product)} 
      sx={{ 
        p: 1.5, 
        borderRadius: 3, 
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)', 
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)', // رفع البطاقة للأعلى بسلاسة عند تمرير الماوس
          boxShadow: '0 12px 30px rgba(99, 102, 241, 0.12)', // تعميق الظل وإعطاء إيحاء تفاعلي
        }
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{ 
            aspectRatio: '1 / 1', 
            borderRadius: 2, 
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            '&:hover': {
              transform: 'scale(1.06)', // تكبير الصورة بحركة ناعمة جداً داخل الإطار
            }
          }}
        />

        {product.badge && (
          <Chip
            label={product.badge}
            size="small"
            sx={{
              position: 'absolute', top: 10, left: 10, fontWeight: 600, fontSize: 12,
              zIndex: 1,
              ...badgeStyles[product.badge],
            }}
          />
        )}

        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleWishlist(product.id));
          }}
          sx={{
            position: 'absolute', top: 10, right: 10,
            bgcolor: 'rgba(255,255,255,0.9)', 
            backdropFilter: 'blur(4px)',
            transition: 'all 0.2s ease',
            '&:hover': { bgcolor: '#fff', transform: 'scale(1.1)' },
            '&:active': { transform: 'scale(0.9)' }
          }}
        >
          {isWished ? <FavoriteIcon fontSize="small" color="error" /> : <FavoriteBorderIcon fontSize="small" />}
        </IconButton>
      </Box>

      <Box sx={{ px: 0.5, pt: 1.5 }}>
        <Typography sx={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.5, color: 'primary.main' }}>
          {product.label}
        </Typography>

        <Typography noWrap sx={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 18, mt: 0.5 }}>
          {product.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
          <StarBorderIcon sx={{ fontSize: 16, color: '#f59e0b' }} />
          <Typography sx={{ fontSize: 12, fontWeight: 700 }}>{product.rating}</Typography>
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>({product.reviews} reviews)</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 22 }}>
              ${product.price.toFixed(2)}
            </Typography>
            {product.oldPrice && (
              <Typography sx={{ fontSize: 13, color: 'text.secondary', textDecoration: 'line-through' }}>
                ${product.oldPrice.toFixed(2)}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 0.75 }}>
            {product.colors.map((color) => (
              <Box
                key={color}
                sx={{ 
                  width: 14, 
                  height: 14, 
                  borderRadius: '50%', 
                  bgcolor: color, 
                  border: '1px solid #e2e8f0',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.2)' }
                }}
              />
            ))}
          </Box>
        </Box>

        <Button
          fullWidth
          variant="contained"
          startIcon={<ShoppingCartOutlinedIcon />}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCart(product));
          }}
          sx={{
            bgcolor: '#e8ebfb', 
            color: 'text.primary', 
            boxShadow: 'none', 
            py: 1.2,
            borderRadius: 2,
            transition: 'all 0.3s ease',
            '&:hover': { 
              bgcolor: 'primary.main', 
              color: '#fff', 
              boxShadow: '0 6px 15px rgba(99, 102, 241, 0.3)',
              transform: 'translateY(-2px)'
            },
            '&:active': { transform: 'scale(0.97)' }
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
}

export default ProductCard;
