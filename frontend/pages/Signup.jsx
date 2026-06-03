import { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, LinearProgress, Link } from '@mui/material';
import { Bolt } from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form,    setForm]    = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/signup', form);
      login(data.user, data.token);
      toast.success(`Welcome, ${data.user.username}! 🎉`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center"
      sx={{ background: 'radial-gradient(ellipse at 40% 80%, rgba(255,101,132,0.1) 0%, transparent 60%)' }}>
      <Card sx={{ width: '100%', maxWidth: 420, mx: 2 }}>
        {loading && <LinearProgress sx={{ borderRadius: '16px 16px 0 0' }} />}
        <CardContent sx={{ p: 4 }}>
          <Box textAlign="center" mb={4}>
            <Bolt sx={{ color: 'primary.main', fontSize: 40 }} />
            <Typography variant="h5" fontWeight={800} sx={{ background: 'linear-gradient(135deg, #6C63FF, #FF6584)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              SocialSpark
            </Typography>
            <Typography color="text.secondary" fontSize={14} mt={0.5}>Create your account</Typography>
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField fullWidth label="Username" name="username" value={form.username} onChange={handleChange} />
            <TextField fullWidth label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
            <TextField fullWidth label="Password" name="password" type="password" value={form.password} onChange={handleChange}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
            <Button fullWidth variant="contained" size="large" onClick={handleSubmit} disabled={loading} sx={{ mt: 1, py: 1.4, fontSize: 16, fontWeight: 700 }}>
              Create Account
            </Button>
          </Box>

          <Typography textAlign="center" mt={3} fontSize={14} color="text.secondary">
            Already have an account?{' '}
            <Link component={RouterLink} to="/login" sx={{ color: 'primary.main', fontWeight: 600 }}>Sign In</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;