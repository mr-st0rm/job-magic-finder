
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { Category } from '@/types/category';

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: api.getCategories,
    staleTime: 10 * 60 * 1000, // 10 минут
  });
};
