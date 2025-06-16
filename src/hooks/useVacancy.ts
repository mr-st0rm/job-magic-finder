
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useVacancy = (vacancyId: number) => {
  return useQuery({
    queryKey: ['vacancy', vacancyId],
    queryFn: () => api.getVacancyById(vacancyId),
    enabled: !!vacancyId,
  });
};
