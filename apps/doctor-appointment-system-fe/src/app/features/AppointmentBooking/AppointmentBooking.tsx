import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  AccessTime,
  Person,
  Description,
  CalendarToday,
} from '@mui/icons-material';
import { Dayjs } from 'dayjs';
import type {
  DaySchedule,
  TimeSlot,
} from 'apps/doctor-appointment-system-fe/src/app/types';
import {
  useBookAppointment,
  useAppointmentForm,
} from 'apps/doctor-appointment-system-fe/src/app/hooks';

type AppointmentBookingProps = {
  schedule: DaySchedule[];
  onError: (message: string) => void;
  onSuccess: () => void;
};

export const AppointmentBooking = ({
  schedule,
  onError,
  onSuccess,
}: AppointmentBookingProps) => {
  const {
    formState,
    updatePatientName,
    updateSelectedDate,
    updateSelectedTime,
    updateDescription,
    resetForm,
    isFormValid,
  } = useAppointmentForm();

  const bookMutation = useBookAppointment();

  const { patientName, selectedDate, selectedTime, description } = formState;

  const formatTime = (hour: number, minute: number): string => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  const getAvailableSlots = (): TimeSlot[] => {
    if (!selectedDate) return [];

    const dateString = selectedDate.format('YYYY-MM-DD');
    const daySchedule = schedule.find((day) => day.date === dateString);

    return daySchedule?.slots.filter((slot) => slot.available) || [];
  };

  const getAvailableDates = (): string[] => {
    return schedule
      .filter((day) => day.slots.some((slot) => slot.available))
      .map((day) => day.date);
  };

  const isDateAvailable = (date: Dayjs): boolean => {
    const dateString = date.format('YYYY-MM-DD');
    return getAvailableDates().includes(dateString);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      onError('Please fill in all fields');
      return;
    }

    try {
      const appointmentData = {
        patientName,
        date: selectedDate!.format('YYYY-MM-DD'),
        time: selectedTime,
        description,
      };

      await bookMutation.mutateAsync(appointmentData);
      resetForm();
      onSuccess();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || 'Failed to book appointment';
      onError(errorMessage);
    }
  };

  const availableSlots = getAvailableSlots();

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mb: 3, display: 'flex', alignItems: 'center' }}
      >
        <CalendarToday sx={{ mr: 2 }} />
        Book New Appointment
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Appointment Details
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Patient Name"
                  value={patientName}
                  onChange={(e) => updatePatientName(e.target.value)}
                  required
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <Person sx={{ mr: 1, color: 'action.active' }} />
                    ),
                  }}
                />

                <DatePicker
                  label="Appointment Date"
                  value={selectedDate}
                  onChange={(date) => updateSelectedDate(date)}
                  shouldDisableDate={(date) => !isDateAvailable(date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      margin: 'normal',
                    },
                  }}
                />

                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Available Time Slots</InputLabel>
                  <Select
                    value={selectedTime}
                    onChange={(e) => updateSelectedTime(e.target.value)}
                    label="Available Time Slots"
                    disabled={!selectedDate || availableSlots.length === 0}
                    startAdornment={
                      <AccessTime sx={{ mr: 1, color: 'action.active' }} />
                    }
                  >
                    {availableSlots.map((slot) => {
                      const timeString = formatTime(slot.hour, slot.minute);
                      return (
                        <MenuItem key={timeString} value={timeString}>
                          {timeString}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Description of Health Issue"
                  value={description}
                  onChange={(e) => updateDescription(e.target.value)}
                  required
                  multiline
                  rows={4}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <Description
                        sx={{
                          mr: 1,
                          color: 'action.active',
                          alignSelf: 'flex-start',
                          mt: 1,
                        }}
                      />
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={bookMutation.isPending || !isFormValid()}
                  sx={{ mt: 3 }}
                >
                  {bookMutation.isPending ? 'Booking...' : 'Book Appointment'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Available Time Slots
              </Typography>

              {!selectedDate ? (
                <Typography color="text.secondary">
                  Please select a date to view available time slots.
                </Typography>
              ) : availableSlots.length === 0 ? (
                <Typography color="error">
                  No available slots for the selected date.
                </Typography>
              ) : (
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Available slots for {selectedDate.format('MMMM DD, YYYY')}:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {availableSlots.map((slot) => {
                      const timeString = formatTime(slot.hour, slot.minute);
                      return (
                        <Chip
                          key={timeString}
                          label={timeString}
                          variant={
                            selectedTime === timeString ? 'filled' : 'outlined'
                          }
                          color={
                            selectedTime === timeString ? 'primary' : 'default'
                          }
                          clickable
                          onClick={() => updateSelectedTime(timeString)}
                        />
                      );
                    })}
                  </Box>
                </Box>
              )}

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" color="text.secondary">
                <strong>Instructions:</strong>
                <br />
                1. Select an available date from the date picker
                <br />
                2. Choose a time slot from the available options
                <br />
                3. Fill in your details and health issue description
                <br />
                4. Click "Book Appointment" to confirm
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
