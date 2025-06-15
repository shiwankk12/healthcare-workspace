import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiEndpoints } from 'apps/doctor-appointment-system-fe/src/app/services/api';

export const useBookAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiEndpoints.bookAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['schedule'] });
    },
  });
};
