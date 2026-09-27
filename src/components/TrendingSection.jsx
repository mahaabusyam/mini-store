import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, IconButton, Button, CircularProgress, Alert, Slide, Fade } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { fetchTrending } from '../features/trending/trendingSlice';

function TrendingSection() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.trending);
  const scrollRef = useRef(null);
  
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const request = dispatch(fetchTrending());
    return () => request.abort();
  }, [dispatch]);

  // التعديل الصحيح لمراقبة ظهور 30% من القسم
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.3 // يبدأ الانيميشن عندما يصبح 30% من القسم مرئياً على الشاشة
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateArrows = () => {
      setCanPrev(el.scrollLeft > 0);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    updateArrows();
    el.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [items]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (el) el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <Box 
      component="section" 
      ref={sectionRef} 
      sx={{ px: { xs: 2, md: 6 }, py: 5, bgcolor: '#eff1ff', overflow: 'hidden' }}
    >
      <Slide direction="down" in={isVisible} timeout={700}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: 'primary.main' }}>
              WEEKLY HIGHLIGHTS
            </Typography>
            <Typography variant="h2" sx={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: { xs: 28, md: 36 } }}>
              Trending This Week
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <IconButton 
              disabled={!canPrev} 
              onClick={() => scroll(-1)} 
              sx={{ 
                bgcolor: '#fff', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease',
                '&:hover': { bgcolor: '#f3f3f3', transform: 'scale(1.05)' }, 
                '&.Mui-disabled': { bgcolor: '#fff', opacity: 0.5 } 
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton 
              disabled={!canNext} 
              onClick={() => scroll(1)} 
              sx={{ 
                bgcolor: '#fff', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease',
                '&:hover': { bgcolor: '#f3f3f3', transform: 'scale(1.05)' }, 
                '&.Mui-disabled': { bgcolor: '#fff', opacity: 0.5 } 
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
      </Slide>

      {status === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {status === 'failed' && (
        <Alert severity="error" action={<Button color="inherit" size="small" onClick={() => dispatch(fetchTrending())}>Retry</Button>}>
          {error}
        </Alert>
      )}

      {status === 'succeeded' && (
        <Box
          ref={scrollRef}
          sx={{
            display: 'flex', gap: 3, overflowX: 'auto', scrollSnapType: 'x mandatory',
            py: 2,
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {items.map((item, index) => (
            <Fade in={isVisible} timeout={800} key={item.id} style={{ transitionDelay: `${index * 100}ms` }}>
              <Box
                sx={{
                  flex: '0 0 auto', 
                  scrollSnapAlign: 'start', 
                  bgcolor: '#fff', 
                  borderRadius: 3, 
                  p: 2,
                  width: { xs: '85%', sm: 'calc(50% - 12px)', md: 'calc((100% - 48px) / 3)' },
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 12px 30px rgba(99, 102, 241, 0.12)',
                  }
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
                  <Box 
                    component="img" 
                    src={item.image} 
                    alt={item.title}
                    sx={{ 
                      width: '100%', 
                      height: 220, 
                      objectFit: 'cover', 
                      borderRadius: 2, 
                      display: 'block',
                      transition: 'transform 0.5s ease',
                      '&:hover': { transform: 'scale(1.05)' }
                    }} 
                  />
                  <Box sx={{ position: 'absolute', top: 12, left: 12, bgcolor: 'rgba(30,41,59,0.85)', color: '#fff', fontSize: 12, px: 1.25, py: 0.5, borderRadius: 99, backdropFilter: 'blur(4px)' }}>
                    {item.tag}
                  </Box>
                </Box>

                <Typography sx={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 20, mt: 2 }}>
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14, color: 'text.secondary', mt: 0.5, minHeight: 42,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}
                >
                  {item.description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 24, color: 'secondary.main' }}>
                    ${item.price.toFixed(2)}
                  </Typography>
                  <Button 
                    size="small" 
                    endIcon={<NorthEastIcon sx={{ fontSize: 14 }} />} 
                    sx={{ 
                      color: 'secondary.main',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'translateX(3px)', bgcolor: 'transparent' }
                    }}
                  >
                    View Story
                  </Button>
                </Box>
              </Box>
            </Fade>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default TrendingSection;
