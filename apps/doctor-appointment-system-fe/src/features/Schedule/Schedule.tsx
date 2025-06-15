import { Box, Typography, Grid, Paper } from '@mui/material';
import { CalendarMonth, AccessTime } from '@mui/icons-material';
import type { DaySchedule } from 'apps/doctor-appointment-system-fe/src/common/types';
import { ScheduleDayItem } from './ScheduleDayItem';

type ScheduleProps = {
  schedule: DaySchedule[];
};

export const Schedule = ({ schedule }: ScheduleProps) => {
  if (schedule.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No schedule available
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mb: 3, display: 'flex', alignItems: 'center' }}
      >
        <CalendarMonth sx={{ mr: 2 }} />
        Doctor's Schedule
      </Typography>

      <Grid container spacing={3}>
        {schedule.map((daySchedule) => (
          <ScheduleDayItem key={daySchedule.date} daySchedule={daySchedule} />
        ))}
      </Grid>

      <Paper
        sx={{
          p: 3,
          mt: 4,
          bgcolor: 'primary.light',
          color: 'primary.contrastText',
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <AccessTime sx={{ mr: 2 }} />
          Schedule Information
        </Typography>
        <Typography variant="body2">
          • Green slots are available for booking
          <br />
          • Red slots are already booked
          <br />
          • Each appointment slot is 1 hour long
          <br />• Schedule shows the next 4 weeks of availability
        </Typography>
      </Paper>
    </Box>
  );
};
