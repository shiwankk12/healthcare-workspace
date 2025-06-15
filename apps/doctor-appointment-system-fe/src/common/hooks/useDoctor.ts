import { useQuery } from '@tanstack/react-query';
import { apiEndpoints } from 'apps/doctor-appointment-system-fe/src/common/services/api';

export const useDoctor = () => {
  return useQuery({
    queryKey: ['doctor'],
    queryFn: apiEndpoints.getDoctor,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
