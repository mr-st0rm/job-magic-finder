
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { SkillsResponse } from '@/types/skill';

export const useSkills = () => {
  return useQuery<SkillsResponse>({
    queryKey: ['skills'],
    queryFn: api.getSkills,
    staleTime: 10 * 60 * 1000, // 10 минут
  });
};
