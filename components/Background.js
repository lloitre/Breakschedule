import { Box } from '@mui/material';
// Import any other necessary modules here
// import { SomeOtherComponent } from 'some-module'; // Example

export const Background = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #f5f7fa 0%, #ffffff 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '300px',
          background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 85%)',
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          padding: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}; 