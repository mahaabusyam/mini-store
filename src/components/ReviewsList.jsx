import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Avatar, Rating, Fade, Slide } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';

const avatarColors = ['#a7f3d0', '#bfdbfe', '#fde68a', '#fbcfe8', '#ddd6fe'];

function ReviewsList({ reviews }) {
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
      { threshold: 0.2 } // يبدأ الانيميشن عندما يصبح 20% من القسم مرئياً
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!reviews?.length) return null;

  const initials = (name) =>
    name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <Box
      component="section"
      ref={sectionRef}
      sx={{
        display: 'grid', gap: 2.5, mt: 6,
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        overflow: 'hidden'
      }}
    >
      {reviews.map((r, i) => (
        // ظهور متتابع لكل بطاقة تقييم بفارق زمني بسيط
        <Fade in={isVisible} timeout={800} key={r.id} style={{ transitionDelay: `${i * 150}ms` }}>
          <Box 
            sx={{ 
              bgcolor: '#f5f5fb', 
              borderRadius: 3, 
              p: 3, 
              display: 'flex', 
              flexDirection: 'column',
              boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-4px)',
                bgcolor: '#efeff8',
                boxShadow: '0 10px 25px rgba(99, 102, 241, 0.08)'
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Rating value={r.rating} readOnly size="small" />
              <Typography sx={{ fontSize: 12, color: 'text.secondary', fontWeight: 500 }}>{r.date}</Typography>
            </Box>

            <Typography sx={{ fontWeight: 700, fontSize: 15, mt: 1.5 }}>{r.title}</Typography>

            <Typography sx={{ fontSize: 14, color: 'text.secondary', mt: 1.25, lineHeight: 1.6, flexGrow: 1 }}>
              "{r.text}"
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 2.5 }}>
              <Avatar 
                sx={{ 
                  bgcolor: avatarColors[i % avatarColors.length], 
                  color: '#1e293b', 
                  fontSize: 13, 
                  fontWeight: 700,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
              >
                {initials(r.author)}
              </Avatar>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{r.author}</Typography>
                  {r.verified && (
                    <Box component="span" sx={{ display: 'inline-flex', animation: 'pulse 2s infinite' }}>
                      <VerifiedIcon sx={{ fontSize: 15, color: 'primary.main' }} />
                    </Box>
                  )}
                </Box>
                <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{r.meta}</Typography>
              </Box>
            </Box>
          </Box>
        </Fade>
      ))}
    </Box>
  );
}

export default ReviewsList;
