
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { VacancyFilterSchema, VacanciesPage } from '@/types/vacancy';

export const useVacancies = (
  filters: VacancyFilterSchema = {},
  page: number = 1,
  size: number = 50
) => {
  return useQuery<VacanciesPage>({
    queryKey: ['vacancies', filters, page, size],
    queryFn: () => api.getVacanciesList(filters, page, size),
    staleTime: 2 * 60 * 1000, // 2 минуты
  });
};
