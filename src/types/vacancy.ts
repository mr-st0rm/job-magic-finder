
import { Category } from './category';
import { VacancySkill } from './skill';

export type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'REMOTE' | 'FREELANCE';
export type JobStatus = 'ACTIVE' | 'DRAFT' | 'PENDING' | 'DELETED';

export interface Vacancy {
  id: number;
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  work_type: JobType;
  location: string | null;
  is_recommended: boolean;
  is_featured: boolean;
  status: JobStatus;
  category: Category;
  skills: VacancySkill[];
  job_views_count: number;
  job_contact_views_count: number;
}

export interface VacancyCreateSchema {
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  work_type: JobType;
  location: string | null;
  is_recommended: boolean;
  is_featured: boolean;
  category_id: number;
  company_id: number;
  skills: number[] | null;
}

export interface VacancyUpdateSchema {
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  work_type: JobType;
  location: string | null;
  is_recommended: boolean;
  is_featured: boolean;
  category_id: number;
  skills: number[] | null;
}

export interface VacancyFilterSchema {
  title?: string | null;
  work_type?: JobType[] | null;
  category_ids?: number[] | null;
  is_featured?: boolean | null;
  is_recommended?: boolean | null;
}

export interface VacanciesPage {
  items: Vacancy[];
  total?: number | null;
  page?: number | null;
  size?: number | null;
  pages?: number | null;
}
