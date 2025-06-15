import { rest } from 'msw';
import { scheduleResponse } from 'apps/doctor-appointment-system-fe/src/mocks/data/schedule';
import { API_BASE_URL } from 'apps/doctor-appointment-system-fe/src/app/services/api';

export const defaultScheduleHandler = rest.get(
  `${API_BASE_URL}/api/schedule`,
  (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(scheduleResponse));
  },
);
