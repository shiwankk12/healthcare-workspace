import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import { API_BASE_URL } from 'apps/doctor-appointment-system-fe/src/app/services/api';

export const defaultUpdateAppointmentsHandler = rest.post(
  `${API_BASE_URL}/api/appointments`,
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Appointment booked successfully',
        appointment: {
          ...req.json(),
          doctorId: 1,
          id: uuidv4(),
        },
      }),
    );
  },
);
