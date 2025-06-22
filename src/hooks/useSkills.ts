
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { Skill } from '@/types/skill';

export const useSkills = () => {
  return useQuery<Skill[]>({
    queryKey: ['skills'],
    queryFn: api.getSkills,
    staleTime: 10 * 60 * 1000, // 10 минут
  });
};
