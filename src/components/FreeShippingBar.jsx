import { Box, Typography, LinearProgress, Fade, Slide } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

const EXPRESS_THRESHOLD = 100;

function FreeShippingBar({ subtotal }) {
  const remaining = Math.max(0, EXPRESS_THRESHOLD - subtotal);
  const percent = Math.min(100, (subtotal / EXPRESS_THRESHOLD) * 100);
  const qualified = remaining === 0;

  return (
    <Fade in={true} timeout={600}>
      <Box 
        sx={{ 
          bgcolor: '#f7f7ff', 
          borderRadius: 3, 
          p: 2.5, 
          mb: 3, 
          minWidth: 0,
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          transition: 'all 0.3s ease'
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'space-between', alignItems: 'center', fontSize: 14 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
            {/* أيقونة الشحن مع حركة نبض خفيفة تزيد من الحيوية */}
            <Box sx={{ display: 'flex', animation: qualified ? 'bounce 1s infinite' : 'none' }}>
              <LocalShippingOutlinedIcon fontSize="small" color="primary" sx={{ flexShrink: 0 }} />
            </Box>

            {qualified ? (
              <Typography sx={{ fontSize: 14 }}>
                You've unlocked <b style={{ color: '#065f46' }}>Free Express Next-Day Delivery!</b>
              </Typography>
            ) : (
              <Typography sx={{ fontSize: 14 }}>
                You are <Box component="span" sx={{ color: 'primary.main', fontWeight: 700 }}>${remaining.toFixed(2)}</Box> away from Free Express Next-Day Delivery!
              </Typography>
            )}
          </Box>
          
          <Typography sx={{ fontWeight: 700, fontSize: 13, flexShrink: 0, color: qualified ? '#065f46' : 'text.primary' }}>
            {percent.toFixed(0)}%
          </Typography>
        </Box>

        {/* شريط التقدم مع إضافة انتقال سلس للنسبة عند التغيير */}
        <LinearProgress
          variant="determinate" 
          value={percent}
          sx={{ 
            height: 8, 
            borderRadius: 99, 
            bgcolor: '#e2e8f0', 
            mt: 1.5, 
            mb: 1.5,
            overflow: 'hidden',
            '& .MuiLinearProgress-bar': { 
              bgcolor: qualified ? '#065f46' : 'primary.main', 
              borderRadius: 99,
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' // حركة سلسة جداً عند امتلاء الشريط
            } 
          }}
        />

        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
          Orders over $75 unlock carbon-neutral ground shipping automatically. Next tier unlocks priority morning dispatch.
        </Typography>
      </Box>
    </Fade>
  );
}

export default FreeShippingBar;
