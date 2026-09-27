import { Box, Typography, Button, Paper, Slide, Fade } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import EcoOutlinedIcon from "@mui/icons-material/Spa";
import HeadphonesIcon from '@mui/icons-material/Headphones';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';

const heroImg = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e";

const features = [
  { icon: <LocalShippingOutlinedIcon fontSize="small" color="primary" />, label: 'Free 2-Day Shipping' },
  { icon: <VerifiedOutlinedIcon fontSize="small" color="primary" />, label: '30-Day Risk-Free' },
  { icon: <EcoOutlinedIcon fontSize="small" color="primary" />, label: 'Ethically Sourced' },
];

function Hero() {
  return (
    <Box
      component="section"
      sx={{
        px: { xs: 2, md: 6 }, 
        py: { xs: 6, md: 8 },
        overflow: 'hidden',
        background:
          'radial-gradient(circle at 100% 0%, #d1fae5 0%, transparent 35%), linear-gradient(180deg, #fafaff, #eceeff)',
      }}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' }, gap: 6, alignItems: 'center' }}>
        
        {/* النص (مع انيميشن انزلاق من اليسار) */}
        <Slide direction="right" in={true} timeout={800}>
          <Box>
            <Box
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: '#fff',
                borderRadius: 99, px: 1.5, py: 0.5, mb: 3, fontSize: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
              <b>SS25 CAPSULE RELEASED</b> | <span>Archival Edition</span>
            </Box>

            <Typography variant="h1" sx={{ fontSize: { xs: 36, md: 52 }, lineHeight: 1.1, fontWeight: 700 }}>
              Essential Living,
              <Box component="span" sx={{ display: 'block', color: 'secondary.main' }}>
                Thoughtfully Crafted.
              </Box>
            </Typography>

            <Typography sx={{ mt: 2.5, maxWidth: 560, fontSize: 18, lineHeight: 1.6, color: 'text.secondary' }}>
              Discover curated everyday carry, minimal desk gear, and tactile lifestyle objects designed
              to harmonize and elevate your daily ritual.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mt: 4, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                size="large" 
                endIcon={<ArrowForwardIcon />}
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)' },
                  '&:active': { transform: 'scale(0.97)' }
                }}
              >
                Shop Collection
              </Button>
              <Button 
                variant="contained" 
                size="large" 
                startIcon={<MenuBookIcon />}
                sx={{ 
                  bgcolor: '#fff', 
                  color: 'text.primary', 
                  boxShadow: 'none', 
                  transition: 'all 0.3s ease',
                  '&:hover': { bgcolor: '#f3f3f3', transform: 'translateY(-3px)' },
                  '&:active': { transform: 'scale(0.97)' }
                }}
              >
                Explore Lookbook
              </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 1.5, mt: 4, flexWrap: 'wrap' }}>
              {features.map((f) => (
                <Box 
                  key={f.label}
                  sx={{ 
                    display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#fff', borderRadius: 1, px: 1.5, py: 1, fontSize: 13,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-2px)' }
                  }}
                >
                  {f.icon} {f.label}
                </Box>
              ))}
            </Box>
          </Box>
        </Slide>

        {/* بطاقة الصورة (مع انيميشن ظهور تدريجي Fade وتأثير طفو للبطاقة المصغرة) */}
        <Fade in={true} timeout={1200}>
          <Paper 
            elevation={0} 
            sx={{ 
              position: 'relative', 
              p: 2, 
              borderRadius: 2, 
              boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
              bgcolor: 'transparent'
            }}
          >
            <Box
              sx={{
                position: 'absolute', top: 0, right: 0, zIndex: 1, display: 'flex', alignItems: 'center', gap: 0.5,
                bgcolor: 'primary.main', color: '#fff', px: 1.5, py: 0.5, fontSize: 12, fontWeight: 700,
                borderRadius: '0 8px 0 12px',
              }}
            >
              <WorkspacePremiumOutlinedIcon sx={{ fontSize: 16 }} /> TOP RATED 2025
            </Box>

            <Box 
              component="img" 
              src={heroImg} 
              alt="Featured product"
              sx={{ 
                width: '100%', 
                aspectRatio: '1 / 1.25', 
                objectFit: 'cover', 
                borderRadius: 1, 
                display: 'block',
                transition: 'transform 0.5s ease-in-out',
                '&:hover': { transform: 'scale(1.02)' }
              }} 
            />

            <Box
              sx={{
                position: 'absolute', left: 32, right: 32, bottom: 32, display: 'flex', alignItems: 'center',
                gap: 1.5, bgcolor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderRadius: 1, p: 1,
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                animation: 'floatCard 4s ease-in-out infinite',
                '@keyframes floatCard': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-6px)' },
                }
              }}
            >
              <Box sx={{ bgcolor: '#e0e7ff', borderRadius: 1, p: 1, display: 'flex' }}>
                <HeadphonesIcon color="secondary" />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 13 }}>Featured Spotlight</Typography>
                <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Aura Studio ANC • Studio Edition</Typography>
              </Box>
              <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 22, color: 'secondary.main' }}>
                $249
              </Typography>
            </Box>
          </Paper>
        </Fade>

      </Box>
    </Box>
  );
}

export default Hero;
