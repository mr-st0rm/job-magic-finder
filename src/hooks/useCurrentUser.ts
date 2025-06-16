
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: api.getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1,
  });
};
