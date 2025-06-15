import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import type { DaySchedule } from 'apps/doctor-appointment-system-fe/src/common/types';

const AppointmentBooking = lazy(() =>
  import(
    /* webpackChunkName: "appointmentBooking" */ 'apps/doctor-appointment-system-fe/src/features/AppointmentBooking/AppointmentBooking'
  ).then((module) => ({
    default: module.AppointmentBooking,
  })),
);

const Schedule = lazy(() =>
  import(
    /* webpackChunkName: "schedule" */ 'apps/doctor-appointment-system-fe/src/features/Schedule/Schedule'
  ).then((module) => ({
    default: module.Schedule,
  })),
);

const TabLoading = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
    <CircularProgress />
  </Box>
);

type AppRoutesProps = {
  schedule: DaySchedule[];
};

export const AppRoutes = ({ schedule }: AppRoutesProps) => {
  return (
    <Suspense fallback={<TabLoading />}>
      <Routes>
        <Route
          path="/book-appointment"
          element={
            <Box sx={{ p: 3 }}>
              <AppointmentBooking schedule={schedule} />
            </Box>
          }
        />
        <Route
          path="/schedule"
          element={
            <Box sx={{ p: 3 }}>
              <Schedule schedule={schedule} />
            </Box>
          }
        />
        <Route path="/" element={<Navigate to="/book-appointment" replace />} />
        <Route path="*" element={<Navigate to="/book-appointment" replace />} />
      </Routes>
    </Suspense>
  );
};
