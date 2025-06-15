import express from 'express';
import cors from 'cors';
import path from 'path';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// Types
type Doctor = {
  id: number;
  name: string;
  workingDays: number;
  slotsPerDay: number;
};

type TimeSlot = {
  hour: number;
  minute: number;
  available: boolean;
};

type DaySchedule = {
  date: string;
  slots: TimeSlot[];
};

type Appointment = {
  id: number;
  patientName: string;
  date: string;
  time: string;
  description: string;
  doctorId: number;
};

// In-memory data store
let appointments: Appointment[] = [];
let appointmentIdCounter = 1;

// Sample doctor data
const doctor: Doctor = {
  id: 1,
  name: 'Dr. Smith',
  workingDays: 5, // Monday to Friday
  slotsPerDay: 8, // 8 slots per day
};

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'assets')));

// Helper functions
const generateTimeSlots = (slotsPerDay: number): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9; // Start at 9 AM

  for (let i = 0; i < slotsPerDay; i++) {
    const totalMinutes = startHour * 60 + i * 60; // 1-hour slots
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;

    slots.push({
      hour,
      minute,
      available: true,
    });
  }

  return slots;
};

const getWorkingDates = (
  workingDays: number,
  weeksAhead: number = 4,
): string[] => {
  const dates: string[] = [];
  const today = new Date();
  const endDate = new Date(
    today.getTime() + weeksAhead * 7 * 24 * 60 * 60 * 1000,
  );

  for (let d = new Date(today); d <= endDate; d.setDate(d.getDate() + 1)) {
    // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    // If workingDays = 5, work Monday (1) to Friday (5)
    if (d.getDay() >= 1 && d.getDay() <= workingDays) {
      dates.push(d.toISOString().split('T')[0]);
    }
  }

  return dates;
};

const isSlotBooked = (date: string, hour: number, minute: number): boolean => {
  return appointments.some(
    (apt) =>
      apt.date === date &&
      apt.time ===
        `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
  );
};

// API Routes

// Root route - serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});

// Get doctor information
app.get('/api/doctor', (req, res) => {
  res.json(doctor);
});

// Get doctor's schedule
app.get('/api/schedule', (req, res) => {
  try {
    const workingDates = getWorkingDates(doctor.workingDays);
    const schedule: DaySchedule[] = [];

    workingDates.forEach((date) => {
      const slots = generateTimeSlots(doctor.slotsPerDay).map((slot) => ({
        ...slot,
        available: !isSlotBooked(date, slot.hour, slot.minute),
      }));

      schedule.push({
        date,
        slots,
      });
    });

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get schedule' });
  }
});

// Book an appointment
app.post('/api/appointments', (req, res) => {
  try {
    const { patientName, date, time, description } = req.body;

    // Validation
    if (!patientName || !date || !time || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Parse time
    const [hourStr, minuteStr] = time.split(':');
    const hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);

    // Check if slot is already booked
    if (isSlotBooked(date, hour, minute)) {
      return res
        .status(409)
        .json({ error: 'This time slot is already booked' });
    }

    // Check if the date is a working day
    const appointmentDate = new Date(date);
    const dayOfWeek = appointmentDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek > doctor.workingDays) {
      return res
        .status(400)
        .json({ error: 'Selected date is not a working day' });
    }

    // Create appointment
    const appointment: Appointment = {
      id: appointmentIdCounter++,
      patientName,
      date,
      time,
      description,
      doctorId: doctor.id,
    };

    appointments.push(appointment);

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to book appointment' });
  }
});

app.listen(port, () => {
  console.log(`🏥 Doctor Appointment API is running on port ${port}`);
  console.log(`📅 Doctor: ${doctor.name}`);
  console.log(
    `📊 Working ${doctor.workingDays} days a week with ${doctor.slotsPerDay} slots per day`,
  );
});
