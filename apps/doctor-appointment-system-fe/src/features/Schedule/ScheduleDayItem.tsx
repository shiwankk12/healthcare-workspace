import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Paper,
  Divider,
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { useMemo } from 'react';
import type { DaySchedule } from 'apps/doctor-appointment-system-fe/src/common/types';
import {
  formatDate,
  formatTime,
} from 'apps/doctor-appointment-system-fe/src/common/utils';

export const ScheduleDayItem = ({
  daySchedule,
}: {
  daySchedule: DaySchedule;
}) => {
  const { availableCount, bookedCount, formattedDate } = useMemo(() => {
    const available = daySchedule.slots.filter((slot) => slot.available).length;
    const booked = daySchedule.slots.filter((slot) => !slot.available).length;
    const formatted = formatDate(daySchedule.date);

    return {
      availableCount: available,
      bookedCount: booked,
      formattedDate: formatted,
    };
  }, [daySchedule]);

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {formattedDate}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Schedule Overview:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip
                icon={<CheckCircle />}
                label={`${availableCount} Available`}
                color="success"
                size="small"
              />
              <Chip
                icon={<Cancel />}
                label={`${bookedCount} Booked`}
                color="error"
                size="small"
              />
            </Box>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Time Slots:
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {daySchedule.slots.map((slot, index) => {
              const timeString = formatTime(slot.hour, slot.minute);
              return (
                <Chip
                  key={`${daySchedule.date}-${index}`}
                  label={timeString}
                  variant={slot.available ? 'outlined' : 'filled'}
                  color={slot.available ? 'success' : 'error'}
                  size="small"
                  icon={slot.available ? <CheckCircle /> : <Cancel />}
                />
              );
            })}
          </Box>

          {availableCount === 0 && (
            <Paper
              sx={{
                p: 2,
                mt: 2,
                bgcolor: 'error.light',
                color: 'error.contrastText',
              }}
            >
              <Typography
                variant="body2"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Cancel sx={{ mr: 1 }} />
                Fully Booked
              </Typography>
            </Paper>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};
