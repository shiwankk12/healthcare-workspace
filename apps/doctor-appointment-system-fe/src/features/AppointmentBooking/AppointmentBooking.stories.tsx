import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppointmentBooking } from './AppointmentBooking';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Meta } from '@storybook/react/*';

const queryClient = new QueryClient();

export default {
  title: 'Doctor Appointment/Appointment Booking',
  component: AppointmentBooking,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Story />
        </LocalizationProvider>
      </QueryClientProvider>
    ),
  ],
} as Meta<typeof AppointmentBooking>;

export const Default = {};
