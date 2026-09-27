import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Fade, Slide } from '@mui/material';

function StudioPhotos({ photos, count }) {
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

  if (!photos?.length) return null;

  return (
    <Box component="section" ref={sectionRef} sx={{ mt: 6, overflow: 'hidden' }}>
      {/* ظهور العنوان بانزلاق خفيف من الأعلى */}
      <Slide direction="down" in={isVisible} timeout={600}>
        <Typography sx={{ fontWeight: 700, fontSize: 17, mb: 2.5 }}>
          Customer Studio Photos ({count ?? photos.length})
        </Typography>
      </Slide>

      <Box
        sx={{
          display: 'grid', gap: 2.5,
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
        }}
      >
        {photos.map((p, index) => (
          // ظهور تدريجي لكل صورة بفرق زمني بسيط (Staggered Animation)
          <Fade in={isVisible} timeout={800} key={p.handle} style={{ transitionDelay: `${index * 120}ms` }}>
            <Box 
              sx={{ 
                position: 'relative', 
                borderRadius: 2.5, 
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                '&:hover img': {
                  transform: 'scale(1.08)', // تكبير الصورة بانسيابية عند الـ Hover
                },
                '&:hover .handle-overlay': {
                  bgcolor: 'rgba(0,0,0,0.4)', // تعميق التدرج اللوني خلف الاسم عند تمرير الماوس
                }
              }}
            >
              <Box 
                component="img" 
                src={p.image} 
                alt={p.handle}
                sx={{ 
                  width: '100%', 
                  aspectRatio: '1 / 1', 
                  objectFit: 'cover', 
                  display: 'block',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }} 
              />
              
              {/* طبقة تدرج لوني خلف اسم المستخدم لضمان وضوحه تماماً فوق الصور */}
              <Box 
                className="handle-overlay"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '50%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                  transition: 'background-color 0.3s ease',
                  display: 'flex',
                  alignItems: 'flex-end',
                  p: 1.5
                }}
              >
                <Typography
                  sx={{
                    color: '#fff', 
                    fontSize: 12, 
                    fontWeight: 600,
                    textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                  }}
                >
                  {p.handle}
                </Typography>
              </Box>
            </Box>
          </Fade>
        ))}
      </Box>
    </Box>
  );
}

export default StudioPhotos;
