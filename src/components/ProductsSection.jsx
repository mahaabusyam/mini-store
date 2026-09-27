import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, CircularProgress, Alert, Button, Fade, Slide } from '@mui/material';
import CategoryBar from './CategoryBar';
import ProductCard from './ProductCard';
import { fetchProducts, selectVisibleProducts } from '../features/products/productsSlice';
import QuickViewModal from './QuickViewModal';

function ProductsSection() {
  const dispatch = useDispatch();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const products = useSelector(selectVisibleProducts);
  const { status, error } = useSelector((state) => state.products);

  useEffect(() => {
    const request = dispatch(fetchProducts());

    return () => request.abort();
  }, [dispatch]);

  return (
    <Box component="section">
      <CategoryBar />

      <Box sx={{ px: { xs: 2, md: 6 }, py: 6, bgcolor: '#fafaff', overflow: 'hidden' }}>
        
        {/* عنوان القسم مع انيميشن انزلاق من الأعلى */}
        <Slide direction="down" in={true} timeout={700}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: 1,
              mb: 4,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1,
                  color: 'primary.main',
                }}
              >
                CATALOG DIRECTORY
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  fontFamily: 'Outfit',
                  fontWeight: 600,
                  fontSize: { xs: 30, md: 40 },
                }}
              >
                Crafted Essentials
              </Typography>
            </Box>

            <Typography sx={{ fontSize: 14 }}>
              Showing {products.length} meticulously engineered editions
            </Typography>
          </Box>
        </Slide>

        {status === 'loading' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {status === 'failed' && (
          <Alert
            severity="error"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => dispatch(fetchProducts())}
              >
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        )}

        {status === 'succeeded' && products.length === 0 && (
          <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            No products in this category.
          </Typography>
        )}

        {status === 'succeeded' && (
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
            }}
          >
            {products.map((product, index) => (
              // انيميشن ظهور تدريجي لكل بطاقة بفرق زمني بسيط بناءً على ترتيبها (Staggered Fade)
              <Fade in={true} timeout={800} key={product.id} style={{ transitionDelay: `${index * 100}ms` }}>
                <Box
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'translateY(-6px)' }, // تأثير رفع البطاقة عند تمرير الماوس
                  }}
                >
                  <ProductCard product={product} onQuickView={setQuickViewProduct} />
                </Box>
              </Fade>
            ))}
          </Box>
        )}
      </Box>

      <QuickViewModal
        product={quickViewProduct}
        open={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </Box>
  );
}

export default ProductsSection;
