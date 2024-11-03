import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PasswordSetup = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
    }
    
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
        setError('Password must contain uppercase, lowercase, and numbers');
        return;
    }

    if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
    }

    try {
      // Get token from URL params
      const token = new URLSearchParams(location.search).get('token');
      
      const response = await axios.post('/api/complete-registration', {
        token,
        password
      });

      // Redirect to login page after successful password setup
      navigate('/login');
    } catch (error) {
      setError('Failed to set password. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create Your Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Set Password</button>
      </form>
    </div>
  );
};

export default PasswordSetup; 