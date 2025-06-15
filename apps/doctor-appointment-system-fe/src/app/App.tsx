import React, { lazy, Suspense, useState } from 'react';
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
import { TabPanel } from './components';
import { useDoctor, useSchedule } from './hooks';

const AppointmentBooking = lazy(() =>
  import(
    /* webpackChunkName: "appointmentBooking" */ 'apps/doctor-appointment-system-fe/src/app/features/AppointmentBooking/AppointmentBooking'
  ).then((module) => ({
    default: module.AppointmentBooking,
  })),
);
const Schedule = lazy(() =>
  import(
    /* webpackChunkName: "schedule" */ 'apps/doctor-appointment-system-fe/src/app/features/Schedule/Schedule'
  ).then((module) => ({
    default: module.Schedule,
  })),
);

const TabLoading = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
    <CircularProgress />
  </Box>
);

const App = () => {
  const [tabValue, setTabValue] = useState(0);
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

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSuccess = (message: string) => {
    showSnackbar(message, 'success');
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
              value={tabValue}
              onChange={handleTabChange}
              aria-label="appointment tabs"
            >
              <Tab label="Book Appointment" />
              <Tab label="View Schedule" />
            </Tabs>
          </Box>
          <Suspense fallback={<TabLoading />}>
            <TabPanel value={tabValue} index={0}>
              <AppointmentBooking
                schedule={schedule}
                onError={(message) => showSnackbar(message, 'error')}
                onSuccess={() =>
                  handleSuccess('Appointment booked successfully!')
                }
              />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Schedule schedule={schedule} />
            </TabPanel>
          </Suspense>
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

export default App;
