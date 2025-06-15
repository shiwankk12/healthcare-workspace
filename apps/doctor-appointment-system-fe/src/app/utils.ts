import dayjs from 'dayjs';

export const formatTime = (hour: number, minute: number): string => {
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

export const formatDate = (dateString: string): string => {
  return dayjs(dateString).format('dddd, MMMM DD, YYYY');
};
