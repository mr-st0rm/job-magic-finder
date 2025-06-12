
import { createApiClient } from './baseApi';

const api = createApiClient();

export interface CompanyCreateSchema {
  name: string;
  description?: string;
  website?: string;
  avatar?: string;
  location?: string;
  employees_count?: number;
  founded_year?: number;
}

export interface Company extends CompanyCreateSchema {
  id: string;
  created_at: string;
  updated_at: string;
}

export const companiesApi = {
  // Получить список компаний пользователя
  getMyCompanies: () => api.get<Company[]>('/companies/my'),
  
  // Создать компанию
  createCompany: (data: CompanyCreateSchema) => api.post<Company>('/companies', data),
  
  // Обновить компанию
  updateCompany: (id: string, data: Partial<CompanyCreateSchema>) => 
    api.patch<Company>(`/companies/${id}`, data),
  
  // Удалить компанию
  deleteCompany: (id: string) => api.delete(`/companies/${id}`),
  
  // Получить компанию по ID
  getCompany: (id: string) => api.get<Company>(`/companies/${id}`)
};
