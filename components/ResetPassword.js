import { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setStatus('error');
        return;
    }

    try {
        await axios.post('/api/request-password-reset', { email });
        setStatus('success');
    } catch (error) {
        setStatus('error');
        console.error('Password reset request failed:', error);
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <p>Enter your email address to receive a password reset link.</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send Reset Link</button>
        
        {status === 'success' && (
          <div className="success-message">
            Check your email for password reset instructions.
          </div>
        )}
        {status === 'error' && (
          <div className="error-message">
            Failed to send reset link. Please try again.
          </div>
        )}
      </form>
    </div>
  );
};

export default ResetPassword; 