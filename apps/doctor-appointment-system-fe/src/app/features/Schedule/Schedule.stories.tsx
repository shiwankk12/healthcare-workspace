import { Schedule } from './Schedule';
import { Meta } from '@storybook/react/*';
import { scheduleResponse } from 'apps/doctor-appointment-system-fe/src/mocks/data/schedule';

export default {
  title: 'Doctor Appointment/Schedule',
  component: Schedule,
  args: {
    schedule: [...scheduleResponse],
  },
} as Meta<typeof Schedule>;

export const Default = {};
