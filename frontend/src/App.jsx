import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import theme from '../theme.js';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Feed from '../pages/Feed';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/"       element={<Feed />} />
      <Route path="/login"  element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </>
);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-center" toastOptions={{
        style: { background: '#1E1E2E', color: '#F0F0F5', border: '1px solid rgba(108,99,255,0.3)' }
      }} />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}