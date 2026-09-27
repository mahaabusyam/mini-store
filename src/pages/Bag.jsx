import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, Link, Chip, TextField, Button, Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import AssignmentReturnOutlinedIcon from '@mui/icons-material/AssignmentReturnOutlined';
import EmojiNatureOutlinedIcon from "@mui/icons-material/EmojiNatureOutlined";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AppleIcon from '@mui/icons-material/Apple';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import { selectCartTotal } from '../features/cart/cartSlice';
import BagItem from '../components/BagItem';
import SavedForLater from '../components/SavedForLater';
import FreeShippingBar from '../components/FreeShippingBar';
import CompanionProducts from '../components/CompanionProducts';

const RESERVATION_SECONDS = 15 * 60;
const VALID_COUPON = 'MINISUMMER';
const COUPON_PERCENT = 0.1;
const TAX_RATE = 0.034;

function Bag() {
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);
  const subtotal = useSelector(selectCartTotal);

  const [secondsLeft, setSecondsLeft] = useState(RESERVATION_SECONDS);
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // عدّاد تنازلي لحجز المخزون
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer); // cleanup: بيوقف العدّاد عند مغادرة الصفحة
  }, []);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  const handleApplyCoupon = () => {
    if (couponInput.trim().toUpperCase() === VALID_COUPON) {
      setAppliedCoupon({ code: VALID_COUPON, amount: subtotal * COUPON_PERCENT });
      setCouponError('');
    } else {
      setAppliedCoupon(null);
      setCouponError('Invalid code');
    }
  };

  const discount = appliedCoupon?.amount ?? 0;
  const taxable = subtotal - discount;
  const estimatedTax = Math.max(0, taxable * TAX_RATE);
  const total = Math.max(0, taxable + estimatedTax);

  if (items.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 12 }}>
        <Typography variant="h6">Your shopping bag is empty</Typography>
        <Link component={RouterLink} to="/" sx={{ mt: 1, display: 'inline-block' }}>
          Continue shopping
        </Link>
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 4, minWidth: 0 }}>
      {/* الرأس */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, fontSize: 13 }}>
          <Link component={RouterLink} to="/" underline="hover" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ArrowBackIcon sx={{ fontSize: 15 }} /> Continue Curating
          </Link>
          <Typography sx={{ fontSize: 13 }}> / Shopping Bag</Typography>
        </Box>
        <Chip
          icon={<VerifiedOutlinedIcon sx={{ fontSize: 15 }} />}
          label={`Studio Secure Reservation: ${minutes}:${seconds} min`}
          size="small" sx={{ bgcolor: '#d1fae5', color: 'primary.dark', fontWeight: 600 }}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.5fr 1fr' }, gap: { xs: 3, md: 4 }, alignItems: 'flex-start', minWidth: 0 }}>
        {/* العمود الأيسر */}
        <Box sx={{ minWidth: 0 }}>
          <Box sx={{ bgcolor: '#fff', border: '1px solid #eee', borderRadius: 2, p: { xs: 2, md: 3 }, minWidth: 0 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: 17, md: 20 } }}>
                Your Shopping Bag <Box component="span" sx={{ color: 'text.secondary', fontWeight: 400 }}>({items.length} items)</Box>
              </Typography>
              <Chip label="Standard Courier Included" size="small" sx={{ bgcolor: '#e8ebfb', fontSize: 12 }} />
            </Box>

            <FreeShippingBar subtotal={subtotal} />

            <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'space-between', fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: 'text.secondary', pb: 1, borderBottom: '1px solid #eee' }}>
              <Typography sx={{ fontSize: 11, fontWeight: 700 }}>ITEM DETAILS</Typography>
              <Typography sx={{ fontSize: 11, fontWeight: 700 }}>ITEM TOTAL</Typography>
            </Box>

            {items.map((item) => <BagItem key={item.id} item={item} />)}
          </Box>

          <CompanionProducts />
          <SavedForLater />

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 1.5, mt: 3 }}>
            {[
              { icon: <VerifiedOutlinedIcon color="primary" />, title: '2-Year Studio Warranty', text: 'Complimentary hardware repair' },
              { icon: <AssignmentReturnOutlinedIcon color="primary" />, title: '30-Day Hassle-Free', text: 'Pre-printed prepaid returns label' },
              { icon: <EmojiNatureOutlinedIcon color="primary" />, title: 'Carbon Neutral', text: '100% certified offset transit' },
            ].map((f) => (
              <Box key={f.title} sx={{ bgcolor: '#f7f7ff', borderRadius: 1, p: 1.5, display: 'flex', gap: 1, minWidth: 0 }}>
                {f.icon}
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 13 }}>{f.title}</Typography>
                  <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{f.text}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* العمود الأيمن: ملخص الطلب */}
        <Box sx={{ bgcolor: '#fff', border: '1px solid #eee', borderRadius: 2, p: { xs: 2, md: 3 }, position: { md: 'sticky' }, top: { md: 90 }, minWidth: 0, overflow: 'hidden' }}>
          <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 2 }}>Order Summary</Typography>

          <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>Promotion or Gift Card</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
            <TextField
              fullWidth size="small" placeholder="MINISUMMER"
              value={couponInput} onChange={(e) => setCouponInput(e.target.value)}
              error={!!couponError} helperText={couponError}
              sx={{ minWidth: 0, flexGrow: 1, flexBasis: 140 }}
              InputProps={{ startAdornment: <LocalOfferOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} /> }}
            />
            <Button variant="outlined" onClick={handleApplyCoupon} sx={{ flexShrink: 0 }}>Apply</Button>
          </Box>

          {appliedCoupon && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'space-between', bgcolor: '#d1fae5', borderRadius: 1, px: 1.5, py: 0.75, mb: 2, fontSize: 13 }}>
              <Typography sx={{ fontSize: 13 }}>{appliedCoupon.code} (-10% Studio Promo)</Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 700 }}>-${appliedCoupon.amount.toFixed(2)}</Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, pt: 1, borderTop: '1px solid #eee' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <Typography sx={{ color: 'text.secondary' }}>Bag Subtotal</Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>
            {appliedCoupon && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'primary.main' }}>
                <Typography color="inherit">Discount</Typography>
                <Typography color="inherit">-${discount.toFixed(2)}</Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <Typography sx={{ color: 'text.secondary' }}>Estimated Standard Shipping</Typography>
              <Typography sx={{ color: 'primary.main' }}>FREE</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <Typography sx={{ color: 'text.secondary' }}>Estimated Sales Tax</Typography>
              <Typography>${estimatedTax.toFixed(2)}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: 18 }}>Total Price</Typography>
              <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>Including all local duties and VAT</Typography>
            </Box>
            <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: { xs: 22, md: 26 }, color: 'primary.main' }}>
              ${total.toFixed(2)}
            </Typography>
          </Box>

          <Accordion elevation={0} sx={{ border: '1px solid #eee', mt: 2, '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <CardGiftcardIcon sx={{ mr: 1, fontSize: 18, flexShrink: 0 }} />
              <Typography sx={{ fontSize: 14 }}>Add a complimentary gift message or bespoke packaging</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField fullWidth multiline rows={2} size="small" placeholder="Write your gift message..." />
            </AccordionDetails>
          </Accordion>

          <Button
            fullWidth variant="contained" size="large" startIcon={<LockOutlinedIcon />}
            onClick={() => navigate('/checkout')}
            sx={{ mt: 2, py: 1.5 }}
          >
            Proceed to Checkout
          </Button>
          <Typography sx={{ fontSize: 11, color: 'text.secondary', textAlign: 'center', mt: 1 }}>
            Next step: Select delivery address and schedule delivery window.
          </Typography>

          <Typography sx={{ fontSize: 11, color: 'text.secondary', textAlign: 'center', mt: 2, mb: 1 }}>
            OR EXPRESS CHECKOUT WITH
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
            <Button startIcon={<AppleIcon sx={{ fontSize: 16 }} />} sx={{ bgcolor: '#000', color: '#fff', fontSize: { xs: 10, sm: 12 }, px: { xs: 0.5, sm: 1 }, minWidth: 0, '&:hover': { bgcolor: '#111' } }}>Pay</Button>
            <Button sx={{ bgcolor: '#e8ebfb', color: 'text.primary', fontSize: { xs: 10, sm: 12 }, px: { xs: 0.5, sm: 1 }, minWidth: 0 }}>G Pay</Button>
            <Button sx={{ bgcolor: '#fde9c8', color: '#7c4a03', fontSize: { xs: 10, sm: 12 }, px: { xs: 0.5, sm: 1 }, minWidth: 0, fontStyle: 'italic', fontWeight: 700 }}>PayPal</Button>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mt: 2, fontSize: 12, color: 'text.secondary' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><GppGoodOutlinedIcon sx={{ fontSize: 14 }} /> 256-Bit SSL Encrypted</Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><ShieldOutlinedIcon sx={{ fontSize: 14 }} /> Fraud Guarantee</Box>
          </Box>
        </Box>
      </Box>

      {/* مساعدة */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center', justifyContent: 'space-between', bgcolor: '#f7f7ff', borderRadius: 2, p: 2.5, mt: 3, maxWidth: { md: '50%' } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
          <SupportAgentOutlinedIcon color="primary" sx={{ flexShrink: 0 }} />
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 14 }}>Need Studio Assistance?</Typography>
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Available for sizing, pairing and inquiries</Typography>
          </Box>
        </Box>
        <Button variant="outlined" size="small" sx={{ flexShrink: 0 }}>Chat Now</Button>
      </Box>
    </Box>
  );
}

export default Bag;