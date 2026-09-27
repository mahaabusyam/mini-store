import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Rating, Button, LinearProgress, Fade, Slide } from '@mui/material';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

function ClientImpressions({ rating, reviewsCount, breakdown }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 } // يبدأ الانيميشن عندما يصبح 30% من القسم مرئياً
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!breakdown) return null;

  const stars = [5, 4, 3, 2, 1];

  return (
    <Box
      component="section"
      ref={sectionRef}
      sx={{
        display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.6fr 1fr' }, gap: 4,
        alignItems: 'center', mt: 6, px: { xs: 0, md: 1 },
        overflow: 'hidden'
      }}
    >
      {/* العمود الأيسر: التقييم العام */}
      <Slide direction="right" in={isVisible} timeout={700}>
        <Box>
          <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: 'text.secondary' }}>
            CLIENT IMPRESSIONS
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 1 }}>
            <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 48, color: 'secondary.main' }}>
              {rating}
            </Typography>
            <Typography sx={{ fontSize: 15, color: 'text.secondary' }}>out of 5.0</Typography>
          </Box>
          <Rating value={rating} precision={0.1} readOnly sx={{ mt: 0.5 }} />
          <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: 1.5, lineHeight: 1.6 }}>
            Based on {reviewsCount} independently verified buyer reviews across North America & Europe.
          </Typography>
        </Box>
      </Slide>

      {/* العمود الأوسط: توزيع النجوم مع ظهور متتابع */}
      <Fade in={isVisible} timeout={1000}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          {stars.map((s, index) => (
            <Box 
              key={s} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5,
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateX(4px)' }
              }}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Typography sx={{ fontSize: 13, width: 32, flexShrink: 0, fontWeight: 600 }}>{s} ★</Typography>
              <LinearProgress
                variant="determinate"
                value={isVisible ? (breakdown[s] ?? 0) : 0} // يملأ الشريط بانسيابية عند الظهور
                sx={{
                  flexGrow: 1, 
                  height: 8, 
                  borderRadius: 99, 
                  bgcolor: '#e8ebfb',
                  overflow: 'hidden',
                  '& .MuiLinearProgress-bar': { 
                    bgcolor: 'primary.main', 
                    borderRadius: 99,
                    transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)' 
                  },
                }}
              />
              <Typography sx={{ fontSize: 12, color: 'text.secondary', width: 40, textAlign: 'right', flexShrink: 0, fontWeight: 600 }}>
                {breakdown[s] < 1 && breakdown[s] > 0 ? `<1%` : `${breakdown[s]}%`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Fade>

      {/* العمود الأيمن: دعوة لكتابة تقييم */}
      <Slide direction="left" in={isVisible} timeout={700}>
        <Box 
          sx={{ 
            bgcolor: '#e8ebfb', 
            borderRadius: 3, 
            p: 3, 
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 8px 25px rgba(99, 102, 241, 0.08)'
            }
          }}
        >
          <Box sx={{ display: 'inline-block', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1) rotate(5deg)' } }}>
            <ChatBubbleOutlineIcon color="primary" sx={{ fontSize: 28 }} />
          </Box>
          <Typography sx={{ fontWeight: 700, fontSize: 16, mt: 1 }}>Own the Aura Wireless?</Typography>
          <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: 1, lineHeight: 1.5 }}>
            Share your acoustic journey with our discerning audio community.
          </Typography>
          <Button 
            fullWidth 
            variant="contained" 
            sx={{ 
              mt: 2.5, 
              bgcolor: '#fff', 
              color: 'text.primary', 
              boxShadow: 'none', 
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              '&:hover': { 
                bgcolor: 'primary.main', 
                color: '#fff',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)'
              },
              '&:active': { transform: 'scale(0.97)' }
            }}
          >
            Write a Review
          </Button>
        </Box>
      </Slide>
    </Box>
  );
}

export default ClientImpressions;
