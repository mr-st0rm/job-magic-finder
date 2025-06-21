
export interface Company {
  id: string;
  name: string;
  description?: string;
  website?: string;
  avatar?: string;
  location?: string;
  employees_count?: number;
  founded_year?: number;
  vacancies_count?: number;
  created_at: string;
  updated_at: string;
}

export interface CompaniesResponse {
  companies: Company[];
  total: number;
}
