import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Fade } from '@mui/material';
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import AssignmentReturnOutlinedIcon from '@mui/icons-material/AssignmentReturnOutlined';

const features = [
  { icon: <CheckCircleOutlineOutlinedIcon color="secondary" />, title: '100% Carbon Neutral', text: 'Every shipment offset completely.' },
  { icon: <VerifiedUserOutlinedIcon color="secondary" />, title: '2-Year Full Warranty', text: 'Repair or replacement guaranteed.' },
  { icon: <SupportAgentOutlinedIcon color="secondary" />, title: '24/7 Studio Concierge', text: 'Live support from actual design team.' },
  { icon: <AssignmentReturnOutlinedIcon color="secondary" />, title: '30-Day Hassle-Free', text: 'Pre-printed free return slips inside.' },
];

function TrustFeatures() {
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
      { 
        threshold: 0.3
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
      sx={{
        px: { xs: 2, md: 6 }, py: 3, bgcolor: '#f7f7ff', display: 'grid', gap: 3,
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
        overflow: 'hidden'
      }}
    >
      {features.map((f, index) => (
        // ظهور تدريجي لكل بطاقة بفرق زمني بسيط (index * 150ms) لإعطاء طابع احترافي
        <Fade in={isVisible} timeout={800} key={f.title} style={{ transitionDelay: `${index * 150}ms` }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5, 
              bgcolor: '#fff', 
              borderRadius: 2, 
              p: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)', // حركة رفع خفيفة عند تمرير الماوس
                boxShadow: '0 10px 25px rgba(99, 102, 241, 0.1)', // تعميق الظل بلمسة جمالية
              }
            }}
          >
            <Box 
              sx={{ 
                bgcolor: '#e8ebfb', 
                borderRadius: 2, 
                width: 48, 
                height: 48, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flexShrink: 0,
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.1) rotate(5deg)' } // حركة لطيفة للأيقونة عند الـ Hover
              }}
            >
              {f.icon}
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{f.title}</Typography>
              <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{f.text}</Typography>
            </Box>
          </Box>
        </Fade>
      ))}
    </Box>
  );
}

export default TrustFeatures;
