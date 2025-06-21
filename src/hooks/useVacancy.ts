
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { Vacancy } from '@/types/vacancy';

export const useVacancy = (vacancyId: number) => {
  return useQuery<Vacancy>({
    queryKey: ['vacancy', vacancyId],
    queryFn: () => api.getVacancyById(vacancyId),
    enabled: !!vacancyId,
  });
};
