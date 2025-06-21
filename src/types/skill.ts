
export interface Skill {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface SkillsResponse {
  skills: Skill[];
  total: number;
}
