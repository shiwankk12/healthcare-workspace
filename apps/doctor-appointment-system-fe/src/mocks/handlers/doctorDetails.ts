import { rest } from 'msw';
import { doctorDetailsResponse } from 'apps/doctor-appointment-system-fe/src/mocks/data/doctorDetails';
import { API_BASE_URL } from 'apps/doctor-appointment-system-fe/src/app/services/api';

export const defaultDoctorDetailsHandler = rest.get(
  `${API_BASE_URL}/api/doctor`,
  (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(doctorDetailsResponse));
  },
);
