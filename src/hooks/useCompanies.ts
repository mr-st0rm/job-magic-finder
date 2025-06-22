
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { Company } from '@/types/company';

export const useCompanies = () => {
  return useQuery<Company[]>({
    queryKey: ['companies'],
    queryFn: api.getCompanies,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
};
