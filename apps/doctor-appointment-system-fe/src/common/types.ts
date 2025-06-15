export type Doctor = {
  id: number;
  name: string;
  workingDays: number;
  slotsPerDay: number;
};

export type TimeSlot = {
  hour: number;
  minute: number;
  available: boolean;
};

export type DaySchedule = {
  date: string;
  slots: TimeSlot[];
};

export type Appointment = {
  id: number;
  patientName: string;
  date: string;
  time: string;
  description: string;
  doctorId: number;
};

export type AppointmentRequest = {
  patientName: string;
  date: string;
  time: string;
  description: string;
};
