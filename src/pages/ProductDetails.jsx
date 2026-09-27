import { useEffect, useRef, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, Breadcrumbs, Link, Chip, IconButton, Rating, Button,
  Accordion, AccordionSummary, AccordionDetails, CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AppleIcon from '@mui/icons-material/Apple';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import EnergySavingsLeafOutlinedIcon from '@mui/icons-material/EnergySavingsLeafOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { fetchProducts, selectProductById } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';
import SoundEngineering from '../components/SoundEngineering';
import ClientImpressions from '../components/ClientImpressions';
import StudioPhotos from '../components/StudioPhotos';
import ReviewsList from '../components/ReviewsList';

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProductById(Number(id)));
  const status = useSelector((state) => state.products.status);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedCushion, setSelectedCushion] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const addToCartRef = useRef(null);

  // جلب المنتجات دايماً عند فتح الصفحة
  useEffect(() => {
    const request = dispatch(fetchProducts());
    return () => request.abort();
  }, [dispatch]);

  // مراقبة زر الإضافة الأساسي: لما يختفي من الشاشة، نظهر الشريط الثابت
  useEffect(() => {
    const el = addToCartRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);

    return () => observer.disconnect(); // cleanup: بيوقف المراقبة عند مغادرة الصفحة
  }, [product]);

  if (status === 'loading' || status === 'idle') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ textAlign: 'center', py: 12 }}>
        <Typography variant="h6">Product not found</Typography>
        <Link component={RouterLink} to="/" sx={{ mt: 1, display: 'inline-block' }}>
          Back to store
        </Link>
      </Box>
    );
  }

  const images = product.images?.length ? product.images : [product.image];
  const colorOptions = product.colorOptions?.length
    ? product.colorOptions
    : product.colors?.map((hex) => ({ hex, name: null })) ?? [];
  const cushionOptions = product.earCushionOptions ?? [];
  const unitPrice = product.price + (cushionOptions[selectedCushion]?.priceAdd ?? 0);
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        selectedColor: colorOptions[selectedColor]?.name ?? null,
        selectedCushion: cushionOptions[selectedCushion]?.name ?? null,
        price: unitPrice,
      })
    );
  };

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 4, position: 'relative' }}>
      {/* الشريط الثابت أسفل الشاشة */}
      {showStickyBar && (
        <Box
          sx={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1200,
            bgcolor: '#fff', borderTop: '1px solid #eee', boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
            px: { xs: 1.5, md: 6 }, py: 1.5, display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 },
          }}
        >
          <Box component="img" src={images[0]} alt={product.fullTitle}
            sx={{ width: 44, height: 44, borderRadius: 1, objectFit: 'cover', flexShrink: 0 }} />
          <Box sx={{ flexGrow: 1, minWidth: 0, display: { xs: 'none', sm: 'block' } }}>
            <Typography noWrap sx={{ fontWeight: 700, fontSize: 14 }}>{product.fullTitle}</Typography>
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
              {colorOptions[selectedColor]?.name} • {cushionOptions[selectedCushion]?.name ?? 'Standard'}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right', flexShrink: 0, display: { xs: 'none', sm: 'block' } }}>
            <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18 }}>
              ${totalPrice.toFixed(2)}
            </Typography>
            <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>Free Express Shipping</Typography>
          </Box>
          <Button
            variant="contained" startIcon={<ShoppingBagOutlinedIcon />} onClick={handleAddToCart}
            sx={{ flexGrow: { xs: 1, sm: 0 }, flexShrink: 0, whiteSpace: 'nowrap' }}
          >
            ${totalPrice.toFixed(2)}
          </Button>
        </Box>
      )}

      {/* مسار التنقل */}
      <Breadcrumbs sx={{ fontSize: 13, mb: 2 }}>
        <Link component={RouterLink} to="/" underline="hover" color="text.secondary">Home</Link>
        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{product.label}</Typography>
        {product.subLabel && (
          <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{product.subLabel}</Typography>
        )}
        <Typography sx={{ fontSize: 13 }}>{product.fullTitle ?? product.title}</Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 4, md: 6 } }}>
        {/* العمود الأيسر: المعرض */}
        <Box>
          <Box sx={{ bgcolor: '#f5f5fb', borderRadius: 2, p: 2 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'space-between', mb: 1.5 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {product.productBadges?.map((b) => (
                  <Chip key={b} label={b} size="small" icon={<CheckCircleIcon sx={{ fontSize: 14 }} />}
                    sx={{ bgcolor: '#fff', fontSize: 12 }} />
                ))}
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip icon={<ThreeSixtyIcon sx={{ fontSize: 16 }} />} label="360° Interactive" size="small" sx={{ bgcolor: '#fff' }} />
                <IconButton size="small" sx={{ bgcolor: '#fff' }}><ZoomInIcon fontSize="small" /></IconButton>
              </Box>
            </Box>

            <Box component="img" src={images[activeImage]} alt={product.fullTitle}
              sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 1 }} />
          </Box>

          {images.length > 1 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 2 }}>
              {images.map((img, i) => (
                <Box
                  key={img}
                  onClick={() => setActiveImage(i)}
                  component="img"
                  src={img}
                  sx={{
                    width: 72, height: 72, objectFit: 'cover', borderRadius: 1, cursor: 'pointer',
                    border: '2px solid', borderColor: activeImage === i ? 'primary.main' : 'transparent',
                  }}
                />
              ))}
            </Box>
          )}

          {product.features?.length > 0 && (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 1.5, mt: 3 }}>
              {product.features.map((f) => (
                <Box key={f.title} sx={{ bgcolor: '#fff', border: '1px solid #eee', borderRadius: 1, p: 1.5 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 13 }}>{f.title}</Typography>
                  <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.5 }}>{f.desc}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* العمود الأيمن: التفاصيل */}
        <Box>
          {product.award && (
            <Chip label={product.award} size="small" sx={{ bgcolor: '#e8ebfb', fontWeight: 600, mb: 1.5 }} />
          )}

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            {product.brand && (
              <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: 'text.secondary' }}>
                {product.brand.toUpperCase()}
              </Typography>
            )}
            {product.dispatchNote && (
              <Chip icon={<LocalShippingOutlinedIcon sx={{ fontSize: 14 }} />} label={product.dispatchNote}
                size="small" sx={{ bgcolor: '#d1fae5', color: 'primary.dark', fontWeight: 600 }} />
            )}
          </Box>

          <Typography variant="h4" sx={{ fontFamily: 'Outfit', fontWeight: 700, mt: 0.5, fontSize: { xs: 26, md: 34 } }}>
            {product.fullTitle ?? product.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, flexWrap: 'wrap' }}>
            <Rating value={product.rating} precision={0.1} readOnly size="small" />
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{product.rating}</Typography>
            <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>({product.reviews} verified reviews)</Typography>
            {product.recommendPercent && (
              <Chip label={`${product.recommendPercent}% recommend`} size="small" sx={{ bgcolor: '#e8ebfb', fontSize: 12 }} />
            )}
          </Box>

          {/* السعر */}
          <Box sx={{ bgcolor: '#f7f7ff', borderRadius: 2, p: 2.5, mt: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
              <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: { xs: 28, md: 34 } }}>
                ${unitPrice.toFixed(2)}
              </Typography>
              {product.oldPrice && (
                <>
                  <Typography sx={{ fontSize: 18, color: 'text.secondary', textDecoration: 'line-through' }}>
                    ${product.oldPrice.toFixed(2)}
                  </Typography>
                  <Chip label={`Save $${(product.oldPrice - product.price).toFixed(0)} Today`} size="small"
                    sx={{ bgcolor: '#d1fae5', color: 'primary.dark', fontWeight: 600 }} />
                </>
              )}
            </Box>
            {product.klarnaInstallments && (
              <Typography sx={{ fontSize: 13, mt: 1 }}>
                or {product.klarnaInstallments} interest-free payments of ${(unitPrice / product.klarnaInstallments).toFixed(2)} with{' '}
                <Box component="span" sx={{ bgcolor: '#f9a8d4', px: 0.75, py: 0.25, borderRadius: 0.5, fontWeight: 700 }}>
                  KLARNA
                </Box>
              </Typography>
            )}
          </Box>

          {/* حالة المخزون */}
          {product.stockLocation && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'space-between', bgcolor: '#fff', border: '1px solid #eee', borderRadius: 1, px: 2, py: 1.25, mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: 14 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', flexShrink: 0 }} />
                In Stock — ready to ship from {product.stockLocation}
              </Box>
              {product.stockLeft && (
                <Typography sx={{ fontSize: 13, color: '#dc2626', fontWeight: 600 }}>
                  Only {product.stockLeft} left
                </Typography>
              )}
            </Box>
          )}

          {/* اللون */}
          {colorOptions.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                  Color Finish: {colorOptions[selectedColor]?.name}
                </Typography>
                {product.finishMaterial && (
                  <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{product.finishMaterial}</Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {colorOptions.map((c, i) => (
                  <Box
                    key={c.hex}
                    onClick={() => setSelectedColor(i)}
                    sx={{
                      width: 32, height: 32, borderRadius: '50%', bgcolor: c.hex, cursor: 'pointer', flexShrink: 0,
                      border: '2px solid', borderColor: selectedColor === i ? 'text.primary' : '#e2e8f0',
                      boxShadow: selectedColor === i ? '0 0 0 2px #fff inset' : 'none',
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* الوسادة */}
          {cushionOptions.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>Ear Cushion Architecture</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1.5 }}>
                {cushionOptions.map((c, i) => (
                  <Box
                    key={c.name}
                    onClick={() => setSelectedCushion(i)}
                    sx={{
                      position: 'relative', border: '1px solid', borderColor: selectedCushion === i ? 'text.primary' : '#e2e8f0',
                      borderRadius: 1, p: 1.5, cursor: 'pointer',
                    }}
                  >
                    {c.priceAdd > 0 && (
                      <Typography sx={{ position: 'absolute', top: 10, right: 10, fontSize: 12, color: 'text.secondary' }}>
                        +${c.priceAdd}
                      </Typography>
                    )}
                    {selectedCushion === i && (
                      <CheckCircleIcon sx={{ position: 'absolute', top: 10, right: 10, fontSize: 18, color: 'primary.main' }} />
                    )}
                    <Typography sx={{ fontWeight: 700, fontSize: 14, pr: 3 }}>{c.name}</Typography>
                    <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.5 }}>{c.desc}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* الكمية والإضافة للسلة */}
          <Box ref={addToCartRef} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: 1, flexShrink: 0 }}>
              <IconButton size="small" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography sx={{ width: 28, textAlign: 'center', fontWeight: 600 }}>{quantity}</Typography>
              <IconButton size="small" onClick={() => setQuantity((q) => q + 1)}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>

            <Button
              variant="contained" size="large" startIcon={<ShoppingBagOutlinedIcon />} onClick={handleAddToCart}
              sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 'auto' } }}
            >
              Add to Cart • ${totalPrice.toFixed(2)}
            </Button>
          </Box>

          <Button
            fullWidth size="large" startIcon={<AppleIcon />}
            sx={{ mt: 1.5, bgcolor: '#000', color: '#fff', '&:hover': { bgcolor: '#111' } }}
          >
            Buy with Pay
          </Button>

          {/* ثقة المستخدم */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, mt: 3, textAlign: 'center' }}>
            {[
              { icon: <RestartAltIcon color="primary" />, label: '30-Day Trial' },
              { icon: <EnergySavingsLeafOutlinedIcon color="primary" />, label: 'Zero Carbon' },
              { icon: <VerifiedUserOutlinedIcon color="primary" />, label: '2-Year Warranty' },
            ].map((t) => (
              <Box key={t.label}>
                {t.icon}
                <Typography sx={{ fontSize: { xs: 11, sm: 12 }, mt: 0.5 }}>{t.label}</Typography>
              </Box>
            ))}
          </Box>

          {/* الأكورديون */}
          <Box sx={{ mt: 3 }}>
            {product.specs && (
              <Accordion elevation={0} sx={{ border: '1px solid #eee', '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <TuneIcon sx={{ mr: 1, fontSize: 18 }} /> Technical Specifications
                </AccordionSummary>
                <AccordionDetails>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <Box key={key} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'space-between', py: 0.5, fontSize: 14 }}>
                      <Typography sx={{ color: 'text.secondary' }}>{key}</Typography>
                      <Typography sx={{ fontWeight: 600 }}>{value}</Typography>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            )}

            {(product.shippingInfo || product.returnsInfo) && (
              <Accordion elevation={0} sx={{ border: '1px solid #eee', borderTop: 0, '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <LocalShippingOutlinedIcon sx={{ mr: 1, fontSize: 18 }} /> Shipping & Returns Policy
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>{product.shippingInfo}</Typography>
                  <Typography sx={{ fontSize: 14, color: 'text.secondary', mt: 1 }}>{product.returnsInfo}</Typography>
                </AccordionDetails>
              </Accordion>
            )}

            {product.whatsInBox && (
              <Accordion elevation={0} sx={{ border: '1px solid #eee', borderTop: 0, '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Inventory2OutlinedIcon sx={{ mr: 1, fontSize: 18 }} /> What's in the Box
                </AccordionSummary>
                <AccordionDetails>
                  {product.whatsInBox.map((item) => (
                    <Typography key={item} sx={{ fontSize: 14, color: 'text.secondary' }}>• {item}</Typography>
                  ))}
                </AccordionDetails>
              </Accordion>
            )}
          </Box>
        </Box>
      </Box>

      <SoundEngineering data={product.engineeredPrecision} />
      <ClientImpressions
        rating={product.rating}
        reviewsCount={product.reviews}
        breakdown={product.ratingBreakdown}
      />
      <StudioPhotos photos={product.studioPhotos} count={42} />
      <ReviewsList reviews={product.reviewsList} />
    </Box>
  );
}

export default ProductDetails;