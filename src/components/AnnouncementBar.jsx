import { Box, Typography } from '@mui/material';

function AnnouncementBar() {
  return (
    <Box sx={{ bgcolor: 'secondary.main', color: '#fff', py: 0.75, textAlign: 'center' }}>
      <Typography variant="caption" sx={{ fontWeight: 600 }}>
        Free express shipping on all orders over $75 &nbsp;•&nbsp; Use code{' '}
        <Box component="span" sx={{ color: '#6ee7b7', fontWeight: 700 }}>
          MINISUMMER
        </Box>
      </Typography>
    </Box>
  );
}

export default AnnouncementBar;