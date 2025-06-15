import { ScheduleDayItem } from './ScheduleDayItem';
import { Meta } from '@storybook/react/*';
import { scheduleResponse } from 'apps/doctor-appointment-system-fe/src/mocks/data/schedule';

export default {
  title: 'Doctor Appointment/Schedule Day Item',
  component: ScheduleDayItem,
  args: {
    daySchedule: scheduleResponse[0],
  },
} as Meta<typeof ScheduleDayItem>;

export const Default = {};
