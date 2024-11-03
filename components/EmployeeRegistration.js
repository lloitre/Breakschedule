import { useState } from 'react';
import axios from 'axios';

const EmployeeRegistration = () => {
  const [email, setEmail] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRegisterClick = async () => {
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setRegistrationStatus('error');
      console.error('Invalid email format');
      return;
    }

    try {
      // Send registration request to your backend
      const response = await axios.post('/api/register', {
        email,
      });

      setRegistrationStatus('success');
      console.log('Registration email sent!', response.data);
      setEmail(''); // Clear email input after successful registration
    } catch (error) {
      setRegistrationStatus('error');
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h2>Employee Registration</h2>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your work email"
      />
      <button onClick={handleRegisterClick}>Register</button>
      
      {registrationStatus === 'success' && (
        <div className="success-message">
          Please check your email to complete registration and set your password.
        </div>
      )}
      {registrationStatus === 'error' && (
        <div className="error-message">
          Registration failed. Please try again.
        </div>
      )}
    </div>
  );
};

export default EmployeeRegistration; 