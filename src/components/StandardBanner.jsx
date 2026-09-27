import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, Slide, Fade } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function StandardBanner() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // يتم التفعيل فور وصول منتصف البانر لمنتصف الشاشة
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0, 
        rootMargin: '0px 0px -50% 0px' // هذا الهامش يضمن أن التنفيذ يبدأ عند منتصف العنصر تماماً
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box 
      component="section" 
      ref={sectionRef} 
      sx={{ px: { xs: 2, md: 6 }, py: 5, bgcolor: '#f7f7ff', overflow: 'hidden' }}
    >
      <Fade in={isVisible} timeout={1000}>
        <Box
          sx={{
            display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.5fr 1fr' }, gap: 5, alignItems: 'center',
            bgcolor: 'secondary.main', color: '#fff', borderRadius: 3, p: { xs: 3, md: 5 },
            boxShadow: '0 20px 40px rgba(0,61,46,0.25)',
            transition: 'transform 0.5s ease-in-out',
            '&:hover': {
              transform: 'scale(1.01)',
            }
          }}
        >
          <Slide direction="right" in={isVisible} timeout={800}>
            <Box>
              <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#6ee7b7' }}>
                THE MINI STORE STANDARD
              </Typography>
              <Typography variant="h2" sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: { xs: 34, md: 48 }, lineHeight: 1.2, mt: 2 }}>
                Deliberate artifacts for an intentional life.
              </Typography>
              <Typography sx={{ mt: 3, fontSize: 18, lineHeight: 1.6, opacity: 0.85 }}>
                We reject excess and disposable design. Every piece in our limited catalog undergoes a
                rigorous 100-day evaluation for tactile weight, material durability, and silent utility
                before earning its place.
              </Typography>
            </Box>
          </Slide>

          <Slide direction="left" in={isVisible} timeout={800}>
            <Box 
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.06)', 
                borderRadius: 2, 
                p: 3,
                backdropFilter: 'blur(8px)',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, flexWrap: 'wrap' }}>
                <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 56, color: '#6ee7b7', lineHeight: 1 }}>
                  98.4%
                </Typography>
                <Typography sx={{ fontWeight: 600 }}>Customer Satisfaction</Typography>
              </Box>
              <Typography sx={{ mt: 2, fontSize: 14, opacity: 0.85 }}>
                Over 24,000 discerning workspaces worldwide trust Mini Store essentials for daily focus
                and aesthetic calm.
              </Typography>
              <Button 
                endIcon={<ArrowForwardIcon />} 
                sx={{ 
                  mt: 2, 
                  px: 0, 
                  color: '#6ee7b7',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    bgcolor: 'transparent',
                    transform: 'translateX(5px)',
                  }
                }}
              >
                Read our Design Manifesto
              </Button>
            </Box>
          </Slide>
        </Box>
      </Fade>
    </Box>
  );
}

export default StandardBanner;
