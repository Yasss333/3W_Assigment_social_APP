import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary:    { main: '#6C63FF' },
    secondary:  { main: '#FF6584' },
    background: { default: '#0A0A0F', paper: '#13131A' },
    text:       { primary: '#F0F0F5', secondary: '#8888AA' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h6: { fontWeight: 700 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#13131A',
          border: '1px solid rgba(108,99,255,0.15)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          '&:hover': {
            borderColor: 'rgba(108,99,255,0.4)',
            boxShadow: '0 4px 32px rgba(108,99,255,0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            background: 'rgba(255,255,255,0.03)',
          },
        },
      },
    },
  },
});

export default theme;