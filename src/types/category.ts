
export interface Category {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CategoriesResponse {
  categories: Category[];
  total: number;
}
