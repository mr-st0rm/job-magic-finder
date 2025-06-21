
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { CompaniesResponse } from '@/types/company';

export const useCompanies = () => {
  return useQuery<CompaniesResponse>({
    queryKey: ['companies'],
    queryFn: api.getCompanies,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
};
