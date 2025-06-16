
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { User } from '@/types/user';

export const useCurrentUser = () => {
  return useQuery<User>({
    queryKey: ['currentUser'],
    queryFn: api.getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1,
  });
};
