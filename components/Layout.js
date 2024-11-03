import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const LayoutRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280, // Space for sidebar on large screens
  },
}));

const LayoutContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const Layout = ({ children }) => {
  return (
    <LayoutRoot>
      <LayoutContainer maxWidth="xl">
        {children}
      </LayoutContainer>
    </LayoutRoot>
  );
}; 