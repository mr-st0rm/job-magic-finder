
export interface Skill {
  id: number;
  name: string;
}

export interface VacancySkill {
  id: number;
  skill: Skill;
}
