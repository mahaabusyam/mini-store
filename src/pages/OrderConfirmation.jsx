import { Link as RouterLink, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box, Typography, Button, Divider, Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function OrderConfirmation() {
  const order = useSelector((state) => state.orders.lastOrder);

  // ما في طلب محفوظ (مثلاً حد فتح الرابط مباشرة بدون ما يشتري شي)
  if (!order) {
    return <Navigate to="/" replace />;
  }

  const placedDate = new Date(order.placedAt).toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const estimatedDelivery = new Date(order.placedAt);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + (order.deliveryMethod === 'express' ? 2 : 5));
  const estimatedDeliveryText = estimatedDelivery.toLocaleDateString(undefined, {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 640 }}>
        {/* رأس التأكيد */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <CheckCircleIcon sx={{ fontSize: 56, color: 'primary.main' }} />
          <Typography variant="h4" sx={{ fontFamily: 'Outfit', fontWeight: 700, mt: 1.5 }}>
            Order Confirmed
          </Typography>
          <Typography sx={{ color: 'text.secondary', mt: 1 }}>
            Thank you{order.contact?.firstName ? `, ${order.contact.firstName}` : ''}! A confirmation email is on its way.
          </Typography>
        </Box>

        {/* بطاقة معلومات الطلب */}
        <Box sx={{ bgcolor: '#fff', border: '1px solid #eee', borderRadius: 2, p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
            <Box>
              <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Order Number</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 16 }}>{order.id}</Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Placed On</Typography>
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{placedDate}</Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <LocalShippingOutlinedIcon color="primary" />
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                Estimated delivery: {estimatedDeliveryText}
              </Typography>
              <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                {order.deliveryMethod === 'express' ? 'Express Air Courier' : 'Standard Carbon-Neutral'} to{' '}
                {order.contact?.street}, {order.contact?.city}
              </Typography>
            </Box>
          </Box>

          {/* المنتجات */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {order.items.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                <Box component="img" src={item.image} alt={item.title}
                  sx={{ width: 48, height: 48, borderRadius: 1, objectFit: 'cover', flexShrink: 0 }} />
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography noWrap sx={{ fontWeight: 600, fontSize: 13 }}>{item.title}</Typography>
                  <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Qty {item.quantity}</Typography>
                </Box>
                <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <Typography sx={{ color: 'text.secondary' }}>Subtotal</Typography>
              <Typography>${order.subtotal.toFixed(2)}</Typography>
            </Box>
            {order.discount > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'primary.main' }}>
                <Typography color="inherit">Discount {order.couponCode && `(${order.couponCode})`}</Typography>
                <Typography color="inherit">-${order.discount.toFixed(2)}</Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <Typography sx={{ color: 'text.secondary' }}>Shipping</Typography>
              <Typography>{order.shippingCost === 0 ? 'FREE' : `$${order.shippingCost.toFixed(2)}`}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <Typography sx={{ color: 'text.secondary' }}>Tax</Typography>
              <Typography>${order.estimatedTax.toFixed(2)}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, pt: 2, borderTop: '1px solid #eee' }}>
            <Typography sx={{ fontWeight: 700, fontSize: 16 }}>Total Paid</Typography>
            <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 22, color: 'primary.main' }}>
              ${order.grandTotal.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        {/* معلومات الدفع والتواصل */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
          <Box sx={{ bgcolor: '#f7f7ff', borderRadius: 2, p: 2 }}>
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Payment Method</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: 14, mt: 0.5 }}>{order.paymentMethod}</Typography>
          </Box>
          <Box sx={{ bgcolor: '#f7f7ff', borderRadius: 2, p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailOutlinedIcon fontSize="small" color="primary" />
            <Box>
              <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Sent to</Typography>
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{order.contact?.email}</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            component={RouterLink} to="/" fullWidth variant="contained" size="large"
            endIcon={<ArrowForwardIcon />}
          >
            Continue Shopping
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Chip label="30-Day Effortless Returns • 256-Bit Encrypted Checkout" size="small"
            sx={{ bgcolor: '#e8ebfb', fontSize: 12 }} />
        </Box>
      </Box>
    </Box>
  );
}

export default OrderConfirmation;