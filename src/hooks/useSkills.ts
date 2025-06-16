
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: api.getSkills,
    staleTime: 10 * 60 * 1000, // 10 минут
  });
};
