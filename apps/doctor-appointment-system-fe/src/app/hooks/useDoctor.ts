import { useQuery } from '@tanstack/react-query';
import { apiEndpoints } from 'apps/doctor-appointment-system-fe/src/app/services/api';

export const useDoctor = () => {
  return useQuery({
    queryKey: ['doctor'],
    queryFn: apiEndpoints.getDoctor,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
