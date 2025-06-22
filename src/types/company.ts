
export interface Company {
  id: number;
  name: string;
  description: string | null;
  website: string | null;
  avatar: string | null;
  location: string | null;
  employees_count: number | null;
  founded_year: number | null;
}

export interface CompanyCreateSchema {
  name: string;
  description: string | null;
  website: string | null;
  avatar: string | null;
  location: string | null;
  employees_count: number | null;
  founded_year: number | null;
}

export interface CompanyUpdateSchema {
  name?: string | null;
  description?: string | null;
  website?: string | null;
  avatar?: string | null;
  location?: string | null;
  employees_count?: number | null;
  founded_year?: number | null;
}
