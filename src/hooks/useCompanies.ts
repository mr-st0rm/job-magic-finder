
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: api.getCompanies,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
};
