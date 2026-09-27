import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Fade, Slide } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function SoundEngineering({ data }) {
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

  if (!data) return null;

  return (
    <Box
      component="section"
      ref={sectionRef}
      sx={{
        display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.3fr' }, gap: 4,
        bgcolor: '#f7f7ff', borderRadius: 3, p: { xs: 3, md: 5 }, mt: 6,
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
        overflow: 'hidden'
      }}
    >
      {/* العمود الأيسر: النص والإحصائيات */}
      <Slide direction="right" in={isVisible} timeout={800}>
        <Box>
          <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: 'primary.main' }}>
            {data.eyebrow}
          </Typography>
          <Typography variant="h4" sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: { xs: 28, md: 34 }, mt: 1, lineHeight: 1.2 }}>
            {data.title}
          </Typography>
          <Typography sx={{ mt: 2, fontSize: 15, color: 'text.secondary', lineHeight: 1.7 }}>
            {data.text}
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, mt: 3, flexWrap: 'wrap' }}>
            {data.stats?.map((s, i) => (
              <Box key={s.label} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                {i > 0 && <Box sx={{ width: '1px', height: 40, bgcolor: '#e2e8f0' }} />}
                <Box>
                  <Typography sx={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 32, color: 'primary.main' }}>
                    {s.value}
                  </Typography>
                  <Typography sx={{ fontSize: 11, fontWeight: 600, color: 'text.secondary', letterSpacing: 0.5 }}>
                    {s.label}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Slide>

      {/* العمود الأيمن: الرسم البياني */}
      <Slide direction="left" in={isVisible} timeout={800}>
        <Box 
          sx={{ 
            bgcolor: '#fff', 
            borderRadius: 2.5, 
            p: 3,
            boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-3px)'
            }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 15 }}>Frequency Response vs. Studio Target</Typography>
            <Box sx={{ display: 'flex', gap: 2, fontSize: 12 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 14, height: 2, bgcolor: '#065f46' }} /> Aura Curve
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 14, height: 2, bgcolor: '#94a3b8' }} /> Harman Target
              </Box>
            </Box>
          </Box>

          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.frequencyResponse} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="freq" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
              <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12, boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}
                labelStyle={{ fontWeight: 600 }}
              />
              <Line type="monotone" dataKey="harman" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              {/* تفعيل ظهور الخط البياني بشكل تدريجي عن طريق الـ isVisible */}
              <Line 
                type="monotone" 
                dataKey="aura" 
                stroke="#065f46" 
                strokeWidth={3} 
                dot={false} 
                isAnimationActive={isVisible} 
                animationDuration={1500} 
              />
            </LineChart>
          </ResponsiveContainer>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5, fontSize: 12, color: 'text.secondary' }}>
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{data.chartNoteLeft}</Typography>
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{data.chartNoteRight}</Typography>
          </Box>
        </Box>
      </Slide>
    </Box>
  );
}

export default SoundEngineering;
