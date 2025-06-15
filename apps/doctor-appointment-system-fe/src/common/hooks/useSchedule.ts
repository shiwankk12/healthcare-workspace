import { useQuery } from '@tanstack/react-query';
import { apiEndpoints } from 'apps/doctor-appointment-system-fe/src/common/services/api';

export const useSchedule = () => {
  return useQuery({
    queryKey: ['schedule'],
    queryFn: apiEndpoints.getSchedule,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
