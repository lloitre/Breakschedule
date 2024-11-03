import React from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../context/ThemeContext';

const DarkModeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();

  const handleToggle = () => setIsDarkMode(prev => !prev);

  return (
    <IconButton
      onClick={handleToggle}
      sx={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        color: 'inherit',
        zIndex: 1000,
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.1)',
        }
      }}
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default DarkModeToggle; 