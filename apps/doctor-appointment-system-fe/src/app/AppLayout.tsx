import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  AppBar,
  Toolbar,
  Tab,
  Tabs,
  Alert,
  Snackbar,
  AlertColor,
  CircularProgress,
} from '@mui/material';
import { LocalHospital } from '@mui/icons-material';
import { useDoctor, useSchedule } from '../common/hooks';
import { AppRoutes } from './AppRoutes';

export const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: '',
    severity: 'info',
  });

  const {
    data: doctor,
    isLoading: doctorLoading,
    error: doctorError,
  } = useDoctor();

  const {
    data: schedule = [],
    isLoading: scheduleLoading,
    error: scheduleError,
  } = useSchedule();

  // Determine current tab based on route
  const getCurrentTab = () => {
    switch (location.pathname) {
      case '/book-appointment':
        return 0;
      case '/schedule':
        return 1;
      default:
        return 0;
    }
  };

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        navigate('/book-appointment');
        break;
      case 1:
        navigate('/schedule');
        break;
      default:
        navigate('/book-appointment');
    }
  };

  // Show loading state
  if (doctorLoading || scheduleLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Show error state
  if (doctorError || scheduleError) {
    showSnackbar('Failed to load data', 'error');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <LocalHospital sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Doctor Appointment System
          </Typography>
          {doctor && (
            <Typography variant="body1">
              {doctor.name} - {doctor.workingDays} days/week,{' '}
              {doctor.slotsPerDay} slots/day
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ width: '100%' }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Tabs
              value={getCurrentTab()}
              onChange={handleTabChange}
              aria-label="appointment tabs"
            >
              <Tab label="Book Appointment" />
              <Tab label="View Schedule" />
            </Tabs>
          </Box>

          <AppRoutes schedule={schedule} />
        </Paper>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
