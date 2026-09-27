import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Dialog, Box, Typography, IconButton, Button, Rating, Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import BoltIcon from '@mui/icons-material/Bolt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { addToCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

function QuickViewModal({ product, open, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // إعادة ضبط الاختيارات كل ما ينفتح منتج جديد
  useEffect(() => {
    if (open) {
      setActiveImage(0);
      setSelectedColor(0);
      setSelectedMaterial(0);
      setQuantity(1);
    }
  }, [open, product?.id]);

  if (!product) return null;

  const images = product.images?.length ? product.images : [product.image];
  const colorOptions = product.colorOptions?.length
    ? product.colorOptions
    : product.colors?.map((hex) => ({ hex, name: null })) ?? [];
  const materials = product.materials ?? [];

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        selectedColor: colorOptions[selectedColor]?.name ?? null,
        selectedMaterial: materials[selectedMaterial] ?? null,
        quantity,
      })
    );
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box sx={{ position: 'relative', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 0 }}>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2, bgcolor: '#fff', '&:hover': { bgcolor: '#f3f3f3' } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        {/* العمود الأيسر: الصور */}
        <Box sx={{ bgcolor: '#f5f5fb', p: { xs: 2, md: 3 } }}>
          <Box sx={{ position: 'relative' }}>
            {product.badge && (
              <Chip
                label={product.badge}
                size="small"
                sx={{ position: 'absolute', top: 10, left: 10, bgcolor: 'primary.main', color: '#fff', fontWeight: 600 }}
              />
            )}
            <Box
              component="img"
              src={images[activeImage]}
              alt={product.title}
              sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 2 }}
            />
          </Box>

          {images.length > 1 && (
            <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
              {images.slice(0, 3).map((img, i) => (
                <Box
                  key={img}
                  onClick={() => setActiveImage(i)}
                  component="img"
                  src={img}
                  sx={{
                    width: 64, height: 64, objectFit: 'cover', borderRadius: 1, cursor: 'pointer',
                    border: activeImage === i ? '2px solid' : '2px solid transparent',
                    borderColor: activeImage === i ? 'primary.main' : 'transparent',
                  }}
                />
              ))}
              {images.length > 3 && (
                <Box
                  sx={{
                    width: 64, height: 64, borderRadius: 1, bgcolor: '#e8ebfb',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 600, color: 'text.secondary',
                  }}
                >
                  +{images.length - 3} more
                </Box>
              )}
            </Box>
          )}
        </Box>

        {/* العمود الأيمن: التفاصيل */}
        <Box sx={{ p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'primary.main' }}>
            {product.label}
            {product.sku && <> &nbsp;•&nbsp; SKU: {product.sku}</>}
          </Typography>

          <Typography variant="h5" sx={{ fontFamily: 'Outfit', fontWeight: 700, mt: 0.5 }}>
            {product.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <Rating value={product.rating} precision={0.1} readOnly size="small" />
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{product.rating}</Typography>
            <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>({product.reviews} verified reviews)</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 2 }}>
            <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 34 }}>
              ${product.price.toFixed(2)}
            </Typography>
            {product.oldPrice && (
              <>
                <Typography sx={{ fontSize: 16, color: 'text.secondary', textDecoration: 'line-through' }}>
                  ${product.oldPrice.toFixed(2)}
                </Typography>
                <Chip label={`Save $${(product.oldPrice - product.price).toFixed(0)}`} size="small"
                  sx={{ bgcolor: '#d1fae5', color: 'primary.dark', fontWeight: 600 }} />
              </>
            )}
          </Box>

          {product.description && (
            <Typography sx={{ mt: 2, fontSize: 14, color: 'text.secondary', lineHeight: 1.6 }}>
              {product.description}
            </Typography>
          )}

          {colorOptions.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600 }}>Color finish:</Typography>
                <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                  {colorOptions[selectedColor]?.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {colorOptions.map((c, i) => (
                  <Box
                    key={c.hex}
                    onClick={() => setSelectedColor(i)}
                    sx={{
                      width: 28, height: 28, borderRadius: '50%', bgcolor: c.hex, cursor: 'pointer',
                      border: '2px solid', borderColor: selectedColor === i ? 'primary.main' : '#e2e8f0',
                      boxShadow: selectedColor === i ? '0 0 0 2px #fff inset' : 'none',
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {materials.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600 }}>Ear Cushion Material:</Typography>
                <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{materials[selectedMaterial]}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {materials.map((m, i) => (
                  <Chip
                    key={m}
                    label={m}
                    onClick={() => setSelectedMaterial(i)}
                    sx={{
                      fontWeight: 600, borderRadius: 1,
                      bgcolor: selectedMaterial === i ? 'secondary.main' : '#e8ebfb',
                      color: selectedMaterial === i ? '#fff' : 'text.primary',
                      '&:hover': { bgcolor: selectedMaterial === i ? 'secondary.main' : '#d9def7' },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: 1 }}>
              <IconButton size="small" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography sx={{ width: 28, textAlign: 'center', fontWeight: 600 }}>{quantity}</Typography>
              <IconButton size="small" onClick={() => setQuantity((q) => q + 1)}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>

            <Button
              fullWidth variant="contained" size="large"
              startIcon={<ShoppingBagOutlinedIcon />}
              onClick={handleAddToCart}
            >
              Add to Cart • ${(product.price * quantity).toFixed(2)}
            </Button>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: 13, color: 'primary.main' }}>
              <BoltIcon sx={{ fontSize: 16 }} />
              {product.inStock === false ? 'Out of Stock' : 'In Stock • Ships in 24 Hours'}
            </Box>
            <Button
  size="small"
  endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
  sx={{ color: 'text.primary' }}
  onClick={() => {
    onClose();
    navigate(`/product/${product.id}`);
  }}
>
  Full Specifications
</Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}

export default QuickViewModal;