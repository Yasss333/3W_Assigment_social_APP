import { AppBar, Toolbar, Typography, Avatar, Box, IconButton, Button } from '@mui/material';
import { Bolt, Logout } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <AppBar position="sticky" elevation={0}
      sx={{ background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(108,99,255,0.15)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>

        <Box display="flex" alignItems="center" gap={1}>
          <Bolt sx={{ color: 'primary.main', fontSize: 28 }} />
          <Typography variant="h6" sx={{ background: 'linear-gradient(135deg, #6C63FF, #FF6584)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800 }}>
            SocialSpark
          </Typography>
        </Box>

        {user ? (
          <Box display="flex" alignItems="center" gap={1.5}>
            <Avatar src={user.avatar} sx={{ width: 36, height: 36, border: '2px solid #6C63FF', fontSize: 14, bgcolor: 'primary.main' }}>
              {user.username?.[0]?.toUpperCase()}
            </Avatar>
            <Typography variant="body2" fontWeight={600}>{user.username}</Typography>
            <IconButton size="small" onClick={handleLogout} sx={{ color: 'text.secondary' }}>
              <Logout fontSize="small" />
            </IconButton>
          </Box>
        ) : (
          <Button variant="contained" size="small" onClick={() => navigate('/login')}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;