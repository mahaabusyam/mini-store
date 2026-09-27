import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, TextField, Checkbox, FormControlLabel, MenuItem,
  Radio, RadioGroup, FormControlLabel as RadioLabel, Switch, Button,
  Breadcrumbs, Link, Chip, Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import { selectCartTotal, clearCart } from '../features/cart/cartSlice';
import { placeOrder } from '../features/orders/ordersSlice';

const US_STATES = ['Oregon (OR)', 'California (CA)', 'Washington (WA)', 'New York (NY)', 'Texas (TX)'];
const VALID_COUPON = 'MINISUMMER';
const COUPON_PERCENT = 0.1; // خصم 10%
const TAX_RATE = 0.034; // 3.4%
const EXPRESS_SHIPPING = 12;
const FREE_SHIPPING_THRESHOLD = 75;

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);
  const subtotal = useSelector(selectCartTotal);

  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', street: '', apt: '',
    city: '', state: US_STATES[0], zip: '', phone: '',
  });
  const [updates, setUpdates] = useState(true);
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvc: '' });
  const [billingSame, setBillingSame] = useState(true);
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [errors, setErrors] = useState({});

  const handleField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const handleCardField = (field) => (e) => setCard((c) => ({ ...c, [field]: e.target.value }));

  const handleApplyCoupon = () => {
    if (couponInput.trim().toUpperCase() === VALID_COUPON) {
      setAppliedCoupon({ code: VALID_COUPON, amount: subtotal * COUPON_PERCENT });
      setCouponError('');
    } else {
      setAppliedCoupon(null);
      setCouponError('Invalid coupon code');
    }
  };

  const discount = appliedCoupon?.amount ?? 0;
  const shippingCost =
    deliveryMethod === 'express' ? EXPRESS_SHIPPING : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 5;
  const taxableAmount = subtotal - discount;
  const estimatedTax = Math.max(0, taxableAmount * TAX_RATE);
  const grandTotal = Math.max(0, taxableAmount + shippingCost + estimatedTax);

  const validate = () => {
    const newErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Valid email required';
    ['firstName', 'lastName', 'street', 'city', 'zip', 'phone'].forEach((field) => {
      if (!form[field].trim()) newErrors[field] = 'Required';
    });
    if (paymentMethod === 'card') {
      if (!/^\d{12,19}$/.test(card.number.replace(/\s/g, ''))) newErrors.cardNumber = 'Invalid card number';
      if (!card.name.trim()) newErrors.cardName = 'Required';
      if (!/^\d{2}\s*\/\s*\d{2}$/.test(card.expiry)) newErrors.cardExpiry = 'MM / YY';
      if (!/^\d{3,4}$/.test(card.cvc)) newErrors.cvc = 'Invalid CVC';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    if (!validate()) return;

    const order = {
      id: `ORD-${Date.now()}`,
      placedAt: new Date().toISOString(),
      items,
      contact: { ...form },
      deliveryMethod,
      paymentMethod: paymentMethod === 'card' ? `Card ending in ${card.number.slice(-4)}` : paymentMethod,
      subtotal,
      discount,
      shippingCost,
      estimatedTax,
      grandTotal,
      couponCode: appliedCoupon?.code ?? null,
    };

    dispatch(placeOrder(order));
    dispatch(clearCart());
    navigate('/order-confirmation');
  };

  if (items.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 12 }}>
        <Typography variant="h6">Your cart is empty</Typography>
        <Link component={RouterLink} to="/" sx={{ mt: 1, display: 'inline-block' }}>
          Continue shopping
        </Link>
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
      <Breadcrumbs sx={{ fontSize: 13, mb: 3 }}>
        <Link component={RouterLink} to="/" underline="hover" color="text.secondary">Bag</Link>
        <Typography sx={{ fontSize: 13, fontWeight: 700 }}>Secure Checkout</Typography>
        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>Confirmation</Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 4, alignItems: 'flex-start' }}>
        {/* العمود الأيسر: النموذج */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* القسم 1: التواصل والشحن */}
          <Box sx={{ bgcolor: '#fff', border: '1px solid #eee', borderRadius: 2, p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 24, height: 24, bgcolor: 'secondary.main', fontSize: 13 }}>1</Avatar>
                <Typography sx={{ fontWeight: 700 }}>Contact & Shipping Address</Typography>
              </Box>
              <Chip icon={<LockOutlinedIcon sx={{ fontSize: 14 }} />} label="Encrypted 256-bit" size="small"
                sx={{ bgcolor: '#e8ebfb', fontSize: 12 }} />
            </Box>

            <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>Email Address</Typography>
            <TextField
              fullWidth size="small" value={form.email} onChange={handleField('email')}
              error={!!errors.email} helperText={errors.email}
              sx={{ mb: 1 }}
            />
            <FormControlLabel
              control={<Checkbox checked={updates} onChange={(e) => setUpdates(e.target.checked)} size="small" />}
              label={<Typography sx={{ fontSize: 13 }}>Keep me updated on delivery status, logistics & quiet drops</Typography>}
              sx={{ mb: 2 }}
            />

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>First Name</Typography>
                <TextField fullWidth size="small" value={form.firstName} onChange={handleField('firstName')}
                  error={!!errors.firstName} helperText={errors.firstName} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>Last Name</Typography>
                <TextField fullWidth size="small" value={form.lastName} onChange={handleField('lastName')}
                  error={!!errors.lastName} helperText={errors.lastName} />
              </Box>
            </Box>

            <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>Street Address</Typography>
            <TextField fullWidth size="small" value={form.street} onChange={handleField('street')}
              error={!!errors.street} helperText={errors.street} sx={{ mb: 2 }} />

            <Box sx={{ display: 'grid', gridTemplateColumns: '0.8fr 1fr 1fr', gap: 2, mb: 2 }}>
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>Apt / Suite</Typography>
                <TextField fullWidth size="small" value={form.apt} onChange={handleField('apt')} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>City</Typography>
                <TextField fullWidth size="small" value={form.city} onChange={handleField('city')}
                  error={!!errors.city} helperText={errors.city} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>State / Province</Typography>
                <TextField fullWidth select size="small" value={form.state} onChange={handleField('state')}>
                  {US_STATES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </TextField>
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>Postal / ZIP Code</Typography>
                <TextField fullWidth size="small" value={form.zip} onChange={handleField('zip')}
                  error={!!errors.zip} helperText={errors.zip} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>Phone (SMS updates)</Typography>
                <TextField fullWidth size="small" value={form.phone} onChange={handleField('phone')}
                  error={!!errors.phone} helperText={errors.phone} />
              </Box>
            </Box>

            <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>Delivery Method</Typography>
            <RadioGroup value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
                <Box sx={{
                  border: '1px solid', borderColor: deliveryMethod === 'standard' ? 'secondary.main' : '#e2e8f0',
                  borderRadius: 1, p: 1.5, bgcolor: deliveryMethod === 'standard' ? '#e8ebfb' : 'transparent',
                }}>
                  <RadioLabel value="standard" control={<Radio size="small" />} sx={{ alignItems: 'flex-start', m: 0 }}
                    label={
                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                          Standard Carbon-Neutral <Box component="span" sx={{ color: 'primary.main' }}>FREE</Box>
                        </Typography>
                        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>3-5 business days via EcoPost</Typography>
                      </Box>
                    } />
                </Box>
                <Box sx={{
                  border: '1px solid', borderColor: deliveryMethod === 'express' ? 'secondary.main' : '#e2e8f0',
                  borderRadius: 1, p: 1.5, bgcolor: deliveryMethod === 'express' ? '#e8ebfb' : 'transparent',
                }}>
                  <RadioLabel value="express" control={<Radio size="small" />} sx={{ alignItems: 'flex-start', m: 0 }}
                    label={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: 14 }}>Express Air Courier</Typography>
                          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>1-2 business days with priority dispatch</Typography>
                        </Box>
                        <Typography sx={{ fontWeight: 700, fontSize: 14 }}>${EXPRESS_SHIPPING.toFixed(2)}</Typography>
                      </Box>
                    } />
                </Box>
              </Box>
            </RadioGroup>
          </Box>

          {/* القسم 2: الدفع */}
          <Box sx={{ bgcolor: '#fff', border: '1px solid #eee', borderRadius: 2, p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Avatar sx={{ width: 24, height: 24, bgcolor: 'secondary.main', fontSize: 13 }}>2</Avatar>
              <Typography sx={{ fontWeight: 700 }}>Payment Method</Typography>
            </Box>

            <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <Box sx={{
                border: '1px solid', borderColor: paymentMethod === 'card' ? 'secondary.main' : '#e2e8f0',
                borderRadius: 1, p: 1.5, mb: 1.5,
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <RadioLabel value="card" control={<Radio size="small" />} label={<Typography sx={{ fontWeight: 700, fontSize: 14 }}>Credit / Debit Card</Typography>} />
                  <Box sx={{ display: 'flex', gap: 1, fontSize: 12, color: 'text.secondary' }}>VISA &nbsp; MC &nbsp; AMEX</Box>
                </Box>
                {paymentMethod === 'card' && (
                  <Box sx={{ pl: 4, mt: 1 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5 }}>Card Number</Typography>
                    <TextField fullWidth size="small" placeholder="1234 1234 1234 1234"
                      value={card.number} onChange={handleCardField('number')}
                      error={!!errors.cardNumber} helperText={errors.cardNumber} sx={{ mb: 1.5 }} />
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 0.8fr', gap: 1.5 }}>
                      <Box>
                        <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5 }}>Name on Card</Typography>
                        <TextField fullWidth size="small" value={card.name} onChange={handleCardField('name')}
                          error={!!errors.cardName} helperText={errors.cardName} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5 }}>Expiration</Typography>
                        <TextField fullWidth size="small" placeholder="MM / YY" value={card.expiry} onChange={handleCardField('expiry')}
                          error={!!errors.cardExpiry} helperText={errors.cardExpiry} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 0.5 }}>CVC</Typography>
                        <TextField fullWidth size="small" value={card.cvc} onChange={handleCardField('cvc')}
                          error={!!errors.cvc} helperText={errors.cvc} />
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>

              <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 1, p: 1.5, mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <RadioLabel value="wallet" control={<Radio size="small" />}
                  label={
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 14 }}>Digital Wallet (Apple Pay / Google Pay)</Typography>
                      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Instant biometric authentication & zero card entry</Typography>
                    </Box>
                  } />
                <AccountBalanceWalletOutlinedIcon fontSize="small" />
              </Box>

              <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 1, p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <RadioLabel value="cod" control={<Radio size="small" />}
                  label={
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 14 }}>Pay on Delivery</Typography>
                      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Pay upon physical courier reception via mobile terminal</Typography>
                    </Box>
                  } />
                <PaymentsOutlinedIcon fontSize="small" />
              </Box>
            </RadioGroup>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, pt: 2, borderTop: '1px solid #eee' }}>
              <Typography sx={{ fontSize: 14 }}>Billing address same as shipping</Typography>
              <Switch checked={billingSame} onChange={(e) => setBillingSame(e.target.checked)} color="primary" />
            </Box>
          </Box>
        </Box>

        {/* العمود الأيمن: ملخص الطلب */}
        <Box sx={{ bgcolor: '#fff', border: '1px solid #eee', borderRadius: 2, p: 3, position: { md: 'sticky' }, top: { md: 90 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 18 }}>Order Summary</Typography>
            <Chip label={`${items.length} Item${items.length > 1 ? 's' : ''} in Bag`} size="small" sx={{ bgcolor: '#e8ebfb', fontSize: 12 }} />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
            {items.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                <Box sx={{ position: 'relative', flexShrink: 0 }}>
                  <Box component="img" src={item.image} alt={item.title}
                    sx={{ width: 52, height: 52, borderRadius: 1, objectFit: 'cover' }} />
                  <Chip label={`${item.quantity}x`} size="small"
                    sx={{ position: 'absolute', bottom: -6, right: -6, height: 18, fontSize: 10, bgcolor: 'secondary.main', color: '#fff' }} />
                </Box>
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography noWrap sx={{ fontWeight: 600, fontSize: 13 }}>{item.title}</Typography>
                  <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                    {item.selectedColor ?? item.label}
                    {item.selectedCushion ? ` • ${item.selectedCushion}` : ''}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: 13, fontWeight: 700 }}>${item.price.toFixed(2)}</Typography>
              </Box>
            ))}
          </Box>

               {/* الكوبون */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth size="small" placeholder="Coupon code"
              value={couponInput} onChange={(e) => setCouponInput(e.target.value)}
              error={!!couponError} helperText={couponError}
            />
            <Button variant="outlined" onClick={handleApplyCoupon} sx={{ flexShrink: 0 }}>Apply</Button>
          </Box>
          {appliedCoupon && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#d1fae5', borderRadius: 1, px: 1.5, py: 1, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: 13 }}>
                <LocalOfferOutlinedIcon sx={{ fontSize: 16, color: 'primary.dark' }} />
                {appliedCoupon.code} (-${appliedCoupon.amount.toFixed(2)})
              </Box>
              <Chip label="APPLIED" size="small" sx={{ bgcolor: 'primary.main', color: '#fff', fontSize: 11 }} />
            </Box>
          )}

          <Box sx={{ borderTop: '1px solid #eee', pt: 2, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <Typography sx={{ color: 'text.secondary' }}>Subtotal</Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>
            {appliedCoupon && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'primary.main' }}>
                <Typography color="inherit">Seasonal Studio Promotion</Typography>
                <Typography color="inherit">-${discount.toFixed(2)}</Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <Typography sx={{ color: 'text.secondary' }}>Eco-Certified Shipping</Typography>
              <Typography sx={{ color: shippingCost === 0 ? 'primary.main' : 'text.primary' }}>
                {shippingCost === 0 ? 'FREE ($0.00)' : `$${shippingCost.toFixed(2)}`}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <Typography sx={{ color: 'text.secondary' }}>
                Estimated Tax ({TAX_RATE * 100}%)
              </Typography>
              <Typography>${estimatedTax.toFixed(2)}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: 18 }}>Grand Total</Typography>
              <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>Includes all duties and environmental offsets</Typography>
            </Box>
            <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 24, color: 'primary.main' }}>
              ${grandTotal.toFixed(2)}
            </Typography>
          </Box>

          <Button
            fullWidth variant="contained" size="large"
            startIcon={<ShieldOutlinedIcon />}
            onClick={handlePlaceOrder}
            sx={{ mt: 2.5, py: 1.5 }}
          >
            Place Order & Pay ${grandTotal.toFixed(2)}
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2.5, mt: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: 12, color: 'text.secondary' }}>
              <VerifiedOutlinedIcon sx={{ fontSize: 15 }} /> 30-Day Returns
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: 12, color: 'text.secondary' }}>
              <GppGoodOutlinedIcon sx={{ fontSize: 15 }} /> Fraud Prevention
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: 12, color: 'text.secondary' }}>
              <SupportAgentOutlinedIcon sx={{ fontSize: 15 }} /> Studio Concierge
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Checkout;