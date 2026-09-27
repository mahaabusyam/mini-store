import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Link, Button, TextField, Fade, Slide } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import ContactlessOutlinedIcon from '@mui/icons-material/ContactlessOutlined';
import { loadFromStorage, saveToStorage } from '../utils/localStorage';

const navigation = ['All Products', 'Audio & Tech', 'Leather & Cases', 'Wardrobe', 'Living & Objects'];
const clientCare = ['Shipping & Express', 'Track Your Package', '2-Year Guarantee', 'Contact Studio'];
const trust = [
  { icon: <VerifiedOutlinedIcon fontSize="small" color="primary" />, text: '30-Day Effortless Returns' },
  { icon: <VerifiedUserOutlinedIcon fontSize="small" color="primary" />, text: '256-Bit Encrypted Checkout' },
  { icon: <CheckCircleOutlineOutlinedIcon fontSize="small" color="primary" />, text: 'Carbon Neutral Fulfillment' },
];

function FooterColumn({ title, children, isVisible, delay }) {
  return (
    <Slide direction="up" in={isVisible} timeout={800} style={{ transitionDelay: `${delay}ms` }}>
      <Box>
        <Typography sx={{ fontSize: 14, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', mb: 1.5 }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>{children}</Box>
      </Box>
    </Slide>
  );
}

function Footer() {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState(() => loadFromStorage('newsletterEmail', ''));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 } // يبدأ الانيميشن عندما يصبح 20% من الفوتر مرئياً
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    saveToStorage('newsletterEmail', email);
    setSubscribedEmail(email);
    setEmail('');
    setError('');
  };

  const handleUnsubscribe = () => {
    saveToStorage('newsletterEmail', '');
    setSubscribedEmail('');
  };

  return (
    <Box 
      component="footer" 
      ref={footerRef}
      sx={{ 
        bgcolor: '#f2f3ff', 
        borderTop: '1px solid #e5e7f5', 
        px: { xs: 2, md: 6 }, 
        pt: 6, 
        pb: 3,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ display: 'grid', gap: 5, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1.6fr 1fr 1fr 1fr' } }}>
        
        {/* العمود الأول: نبذة والنشرة البريدية */}
        <Slide direction="up" in={isVisible} timeout={700}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <StorefrontIcon color="primary" />
              <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 20, color: 'secondary.main' }}>
                Mini Store
              </Typography>
            </Box>
            <Typography sx={{ mt: 2, fontSize: 14, color: 'text.secondary', maxWidth: 380, lineHeight: 1.6 }}>
              Curated essentials with architectural clarity and Scandinavian discipline. Designed for
              discerning taste and deliberate living.
            </Typography>

            <Typography sx={{ mt: 3, mb: 1, fontSize: 14, fontWeight: 600 }}>Join the Journal</Typography>

            {subscribedEmail ? (
              <Box>
                <Typography sx={{ fontSize: 14, color: 'primary.main', fontWeight: 600 }}>
                  ✓ Subscribed as {subscribedEmail}
                </Typography>
                <Button size="small" onClick={handleUnsubscribe} sx={{ px: 0, color: 'text.secondary' }}>
                  Unsubscribe
                </Button>
              </Box>
            ) : (
              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                <TextField
                  size="small" type="email" placeholder="Enter your email address"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(error)} helperText={error}
                  sx={{ 
                    flexGrow: 1, 
                    bgcolor: '#fff', 
                    borderRadius: 1,
                    '& fieldset': { border: 'none' },
                    transition: 'transform 0.2s',
                    '&:focus-within': { transform: 'scale(1.02)' }
                  }}
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  sx={{ 
                    height: 40,
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-2px)' }
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            )}
          </Box>
        </Slide>

        {/* أعمدة الروابط مع ظهور متتابع (Staggered Animation) */}
        <FooterColumn title="Navigation" isVisible={isVisible} delay={150}>
          {navigation.map((label) => (
            <Link 
              key={label} 
              href="#" 
              underline="hover" 
              color="text.primary" 
              sx={{ 
                fontSize: 14, 
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateX(4px)', color: 'primary.main' } 
              }}
            >
              {label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Client Care" isVisible={isVisible} delay={300}>
          {clientCare.map((label) => (
            <Link 
              key={label} 
              href="#" 
              underline="hover" 
              color="text.primary" 
              sx={{ 
                fontSize: 14, 
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateX(4px)', color: 'primary.main' } 
              }}
            >
              {label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Studio Trust" isVisible={isVisible} delay={450}>
          {trust.map((t) => (
            <Box 
              key={t.text} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                fontSize: 14,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateX(4px)' }
              }}
            >
              {t.icon} {t.text}
            </Box>
          ))}
        </FooterColumn>
      </Box>

      {/* الشريط السفلي مع تأثير تلاشي ناعم */}
      <Fade in={isVisible} timeout={1200}>
        <Box
          sx={{
            mt: 5, bgcolor: '#e8ebfb', borderRadius: 2, p: 2, display: 'flex',
            justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5,
            transition: 'box-shadow 0.3s',
            '&:hover': { boxShadow: '0 4px 15px rgba(99, 102, 241, 0.08)' }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: 13, color: 'text.secondary' }}>
            <LockOutlinedIcon fontSize="small" />
            Verified Payment Gateways:
            <CreditCardOutlinedIcon fontSize="small" />
            <AccountBalanceWalletOutlinedIcon fontSize="small" />
            <PaymentsOutlinedIcon fontSize="small" />
            <ContactlessOutlinedIcon fontSize="small" />
          </Box>
          <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
            © {new Date().getFullYear()} Mini Store Studio Inc. All rights reserved.
          </Typography>
        </Box>
      </Fade>
    </Box>
  );
}

export default Footer;

  