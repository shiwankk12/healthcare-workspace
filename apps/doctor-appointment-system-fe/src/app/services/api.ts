import axios from 'axios';
import type {
  Doctor,
  DaySchedule,
  Appointment,
  AppointmentRequest,
} from '../types';

export const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://your-api-url.com'
    : 'http://localhost:3000';

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiEndpoints = {
  getDoctor: () => api.get<Doctor>('/doctor').then((res) => res.data),
  getSchedule: () =>
    api.get<DaySchedule[]>('/schedule').then((res) => res.data),
  getAppointments: () =>
    api.get<Appointment[]>('/appointments').then((res) => res.data),
  bookAppointment: (data: AppointmentRequest) =>
    api
      .post<{
        message: string;
        appointment: Appointment;
      }>('/appointments', data)
      .then((res) => res.data),
  cancelAppointment: (id: number) =>
    api
      .delete<{ message: string }>(`/appointments/${id}`)
      .then((res) => res.data),
};
