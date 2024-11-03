import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Card, 
  CardContent 
} from '@mui/material';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import Greeting from './Greeting';

const Login = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/login', { email, password });
      console.log('Login successful:', response);
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Greeting />
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <Box textAlign="center">
            <Link 
              to="/reset-password"
              style={{ 
                color: theme.palette.primary.main,
                textDecoration: 'none'
              }}
            >
              Forgot Password?
            </Link>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Login; 