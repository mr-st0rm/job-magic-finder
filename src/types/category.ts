
export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  vacancies_count?: number;
  created_at: string;
  updated_at: string;
}

export interface CategoriesResponse {
  categories: Category[];
  total: number;
}
